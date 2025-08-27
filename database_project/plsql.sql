-- Project created by Scott Dispensa and Tyler Grzymalski, Team 11. We utilized the exploration in week 7, specifically
-- https://canvas.oregonstate.edu/courses/1999601/pages/exploration-pl-slash-sql-part-2-stored-procedures-for-cud?module_item_id=25352959

-- AI (copilot.cloud.microsoft.com) was used both for debugging and error-repair and generating code for enhancements. We will cite
-- those uses before each procedure that used them, but almost all procedures went through a "sanity check" using AI to ensure
-- we hadn't broken anything or when trying to find a bug between the html, app.js, and SPs.

-- #############################
-- CREATE Customer
-- #############################

DROP PROCEDURE IF EXISTS sp_CreateCustomer;

DELIMITER //

CREATE PROCEDURE sp_CreateCustomer(
    IN p_first_name VARCHAR(255), 
    IN p_last_name VARCHAR(255), 
    IN p_email VARCHAR(255), 
    IN p_phone_number VARCHAR(100),
    IN p_fine_total DECIMAL(19,2),
    OUT p_id_customer INT )
BEGIN
    INSERT INTO Customers (first_name, last_name, email, phone_number, fine_total) 
    VALUES (p_first_name, p_last_name, p_email, p_phone_number, p_fine_total);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id_customer;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //

DELIMITER ;

-- #############################
-- UPDATE Customers
-- #############################
-- Copilot used to help generate IF statements for protecting against null or blank values to allow only one 
-- field to be updated. 

DROP PROCEDURE IF EXISTS sp_UpdateCustomer;

DELIMITER //

CREATE PROCEDURE sp_UpdateCustomer(
    IN p_id INT, 
    IN p_email VARCHAR(255), 
    IN p_phone_number VARCHAR(100), 
    IN p_update_fine DECIMAL(19,2))

BEGIN
    UPDATE Customers 
    SET 
    email = IF(p_email IS NOT NULL AND p_email != '', p_email, email), 
    phone_number = IF(p_phone_number IS NOT NULL AND p_phone_number != '', p_phone_number, phone_number), 
    fine_total = IF(p_update_fine IS NOT NULL, p_update_fine, fine_total) 
    WHERE id_customer = p_id; 

END //

DELIMITER ;

-- #############################
-- DELETE Customers
-- #############################

DROP PROCEDURE IF EXISTS sp_DeleteCustomer;

DELIMITER //

CREATE PROCEDURE sp_DeleteCustomer(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Customers WHERE id_customer = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Customers for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;

-- #############################
-- CREATE Media
-- #############################

DROP PROCEDURE IF EXISTS sp_CreateMedia;

DELIMITER //

CREATE PROCEDURE sp_CreateMedia(
    IN p_title VARCHAR(75), 
    IN p_author_director_artist VARCHAR(75), 
    IN p_media_type ENUM('book','music','movie'), 
    IN p_is_electronic TINYINT(4),
    IN p_checked_out TINYINT(4),
    OUT p_id_media INT)
BEGIN
    INSERT INTO Media (title, author_director_artist, is_electronic, checked_out, media_type) 
    VALUES
(p_title, p_author_director_artist, p_is_electronic, p_checked_out, p_media_type);


    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id_media;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //

DELIMITER ;

-- #############################
-- UPDATE Media
-- #############################


DROP PROCEDURE IF EXISTS sp_UpdateMedia;

DELIMITER //
-- Copilot used to debug use case where dropdown of type ENUM is a required field even when not listed as required
CREATE PROCEDURE sp_UpdateMedia(
    IN p_id_media INT,
    IN p_is_electronic TINYINT(4), 
    IN p_checked_out TINYINT(4), 
    IN p_media_type VARCHAR(10) 
)
BEGIN
-- Copilot used to generate correct syntax for allowing partial update
    UPDATE Media
    SET 
        is_electronic = IF(p_is_electronic IS NOT NULL, p_is_electronic, is_electronic),
        checked_out = IF(p_checked_out IS NOT NULL, p_checked_out, checked_out),
        media_type = IF(p_media_type != 'UNCHANGED', p_media_type, media_type)
    WHERE id_media = p_id_media;
END //

DELIMITER ;


-- #############################
-- DELETE Media
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteMedia;

DELIMITER //

CREATE PROCEDURE sp_DeleteMedia(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
    
    -- delete media
        DELETE FROM Media WHERE id_media = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Media for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;

-- #############################
-- CREATE Check_Outs
-- #############################

DROP PROCEDURE IF EXISTS sp_CreateCheck_Out;

DELIMITER //

CREATE PROCEDURE sp_CreateCheck_Out(
    IN p_id_customer INT, 
    IN p_id_media INT,
    IN p_date_checked_out DATE, 
    IN p_due_date DATE, 
    OUT p_id_check_out INT )
BEGIN


-- create a check_out (M-to-M relationship addition)
INSERT INTO Check_Outs (id_customer, id_media, date_checked_out, due_date)
 VALUES
(p_id_customer, p_id_media, p_date_checked_out, p_due_date);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id_check_out;

END //

DELIMITER ;


-- #############################
-- CREATE MediaGenre
-- #############################

DROP PROCEDURE IF EXISTS sp_Create_MediaGenre;

DELIMITER //

CREATE PROCEDURE sp_Create_MediaGenre(
    IN p_id_media INT,
    IN p_id_genre INT
    )
BEGIN


-- associate media with a genre (M-to-M relationship addition)
INSERT INTO Media_Has_Genres (id_media, id_genre) VALUES
(p_id_media, p_id_genre);

END //

DELIMITER ;



-- #############################
-- CREATE Genre
-- #############################

DROP PROCEDURE IF EXISTS sp_CreateGenre;

DELIMITER //

CREATE PROCEDURE sp_CreateGenre(
    IN p_description VARCHAR(75), 
    OUT p_id_genre INT)
BEGIN
    INSERT INTO Genres (description) 
    VALUES (p_description);


    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id_genre;

END //

DELIMITER ;

-- #############################
-- DELETE MediaGenre
-- #############################

DROP PROCEDURE IF EXISTS sp_Delete_MediaGenre;

DELIMITER //

CREATE PROCEDURE sp_Delete_MediaGenre (IN p_id_media INT, IN p_id_genre INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
    
-- disassociate a genre from media (M-to-M relationship deletion)
    DELETE FROM Media_Has_Genres 
    WHERE id_media = p_id_media AND id_genre = p_id_genre;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Media_Has_Genres for id: ', p_id_media);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //

DELIMITER ;

-- #############################
-- UPDATE MediaGenre
-- #############################

DROP PROCEDURE IF EXISTS sp_Update_MediaGenre;

DELIMITER //
-- Copilot used to fix update errors when the combination of id's is already in the table
CREATE PROCEDURE sp_Update_MediaGenre(IN p_id_media INT, IN p_id_genre INT)
BEGIN
    -- Only update if the new combination doesn't already exist
    IF NOT EXISTS (
        SELECT 1 FROM Media_Has_Genres
        WHERE id_media = p_id_media AND id_genre = p_id_genre
    ) THEN
        -- Perform the update only if the current row exists
        UPDATE Media_Has_Genres
        SET id_genre = p_id_genre
        WHERE id_media = p_id_media
        LIMIT 1;
    END IF;
END //

DELIMITER ;

-- GETTERS

DROP PROCEDURE IF EXISTS sp_Get_Customers;

DELIMITER //

CREATE PROCEDURE sp_Get_Customers()
BEGIN
    -- Get a list of all customers with all attributes
    SELECT 
        id_customer AS customerId,
        first_name AS firstName,
        last_name AS lastName,
        email,
        fine_total AS fineTotal,    
        phone_number AS phoneNumber
    FROM Customers;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS sp_Get_Media;

DELIMITER //

CREATE PROCEDURE sp_Get_Media()

BEGIN
-- get a list of all current Media
SELECT id_media, title, author_director_artist AS creator,
 is_electronic AS isElectronic,
checked_out AS checkedOut,
 media_type AS mediaType 
FROM Media;


END //

DELIMITER ; 


DROP PROCEDURE IF EXISTS sp_Get_Check_Outs;

DELIMITER //

CREATE PROCEDURE sp_Get_Check_Outs()
BEGIN
    -- Get a list of all the Check_Outs with customer name and media title instead of their respective FKs.
    SELECT 
        Check_Outs.id_check_out, 
        Check_Outs.date_checked_out AS dateCheckedOut, 
        Check_Outs.due_date AS dueDate,
        CONCAT(Customers.first_name, ' ', Customers.last_name) AS customerName, 
        Media.title AS mediaTitle 
    FROM Check_Outs
    LEFT JOIN Customers ON Check_Outs.id_customer = Customers.id_customer
    LEFT JOIN Media ON Check_Outs.id_media = Media.id_media;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS sp_Get_Genres;

DELIMITER //

CREATE PROCEDURE sp_Get_Genres()

BEGIN

-- get a list of all the Genres
SELECT * FROM Genres;

END //

DELIMITER ; 


DROP PROCEDURE IF EXISTS sp_Get_Media_Has_Genres;

DELIMITER //

CREATE PROCEDURE sp_Get_Media_Has_Genres()
BEGIN
    SELECT 
        Media_Has_Genres.id_media,
        Media_Has_Genres.id_genre,
        Media.title,
        Genres.description AS genre
    FROM Media_Has_Genres
    JOIN Media ON Media.id_media = Media_Has_Genres.id_media
    JOIN Genres ON Genres.id_genre = Media_Has_Genres.id_genre;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS sp_Get_Single_Customer;

DELIMITER //

CREATE PROCEDURE sp_Get_Single_Customer(IN p_id INT)

BEGIN

-- get a single Customer's data for the update Customer form
SELECT id_customer, first_name, last_name, email, fine_total, phone_number FROM Customers WHERE
id_customer = p_id;

END //

DELIMITER ; 


DROP PROCEDURE IF EXISTS sp_Get_Single_Media;

DELIMITER // 

CREATE PROCEDURE sp_Get_Single_Media(IN media_id INT )

BEGIN

-- get a single Media's data for the update Media form
SELECT id_media, 
title, author_director_artist AS creator, 
is_electronic AS isElectronic, 
checked_out AS checkedOut, 
media_type AS mediaType 
FROM Media WHERE id_media = media_id;

END //

DELIMITER ;


DROP PROCEDURE IF EXISTS sp_Get_Customer_Media;

DELIMITER //

CREATE PROCEDURE sp_Get_Customer_Media()

BEGIN

-- get all customers with their current associated media to list
SELECT id_customer, id_media, CONCAT(first_name,' ',last_name) AS `Customer Name`, title AS `Media Title`
FROM Check_Outs
INNER JOIN Customers ON Check_Outs.id_customer = Customers.id_customer 
INNER JOIN Media ON Check_Outs.id_media = Media.id_media
ORDER BY name, media_title;


END //

DELIMITER ; 