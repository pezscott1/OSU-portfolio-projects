-- Team 11 Scott Dispensa and Tyler Grzymalski Library project
-- These are some Database Manipulation queries for Team 11 Library project
-- With extensive help from the given bsg queries and Copilot as noted extensively in the PL/SQL file


-- get a list of all the Customers with all attributes
SELECT * FROM Customers;


-- get a list of all the Check_Outs with customer name and media title instead of their respective FKs.
SELECT 
        Check_Outs.id_check_out, 
        Check_Outs.date_checked_out, 
        Check_Outs.due_date,
        CONCAT(Customers.first_name, ' ', Customers.last_name) AS customer_name, 
        Media.title AS media_name 
    FROM Check_Outs
    LEFT JOIN Customers ON Check_Outs.id_customer = Customers.id_customer
    LEFT JOIN Media ON Check_Outs.id_media = Media.id_media;

-- get a list of all the current Media
SELECT * FROM Media;

-- get a list of all the Genres
SELECT * FROM Genres;

-- get a list of all the items in Media_Has_Genres
SELECT 
        Media_Has_Genres.id_media,
        Media_Has_Genres.id_genre,
        Media.title,
        Genres.description AS genre
    FROM Media_Has_Genres
    JOIN Media ON Media.id_media = Media_Has_Genres.id_media
    JOIN Genres ON Genres.id_genre = Media_Has_Genres.id_genre;

-- get a single Customer's data for the update Customer form
SELECT id_customer, first_name, last_name, email, fine_total, phone_number FROM Customers WHERE
id_customer = p_id;


-- get a single Media's data for the update Media form
SELECT id_media, title, author_director_artist, is_electronic, checked_out, media_type FROM Media WHERE
id_media = media_id;


-- get all customers with their current associated media to list
SELECT id_customer, id_media, CONCAT(first_name,' ',last_name) AS name, title AS media_title
FROM Check_Outs
INNER JOIN Customers ON Check_Outs.id_customer = Customers.id_customer 
INNER JOIN Media ON Check_Outs.id_media = Media.id_media
ORDER BY name, media_title;


-- add a new media
  INSERT INTO Media (title, author_director_artist, is_electronic, checked_out, media_type) 
    VALUES
(p_title, p_author_director_artist, p_is_electronic, p_checked_out, p_media_type);

-- update a media's data based on submission of the Update Media form
    UPDATE Media
    SET 
        is_electronic = IF(p_is_electronic IS NOT NULL, p_is_electronic, is_electronic),
        checked_out = IF(p_checked_out IS NOT NULL, p_checked_out, checked_out),
        media_type = IF(p_media_type != 'UNCHANGED', p_media_type, media_type)
    WHERE id_media = p_id_media;

-- delete media
    DELETE FROM Media WHERE id_media = p_id;

-- associate a customer with media (M-to-M relationship addition)
    INSERT INTO Check_Outs (id_customer, id_media, date_checked_out, due_date)
    VALUES
    (p_id_customer, p_id_media,p_date_checked_out, p_due_date);

-- disassociate media from a customer (M-to-M relationship deletion)
    DELETE FROM Check_Outs WHERE id_customer = p_id_customer AND id_media = p_id_media;

-- add a new customer
  INSERT INTO Customers (first_name, last_name, email, phone_number, fine_total) 
    VALUES (p_first_name, p_last_name, p_email, p_phone_number, p_fine_total);

-- update a customer's data based on submission of the Update Customer form
 UPDATE Customers 
    SET 
    email = IF(p_email IS NOT NULL AND p_email != '', p_email, email), 
    phone_number = IF(p_phone_number IS NOT NULL AND p_phone_number != '', p_phone_number, phone_number), 
    fine_total = IF(p_update_fine IS NOT NULL, p_update_fine, fine_total) 
    WHERE id_customer = p_id; 

-- delete a customer
    DELETE FROM Customers WHERE id_customer = p_id;

-- associate media with a genre (M-to-M relationship addition)
    INSERT INTO Media_Has_Genres (id_media, id_genre) VALUES
    (p_id_media, p_id_genre);

-- disassociate a genre from media (M-to-M relationship deletion)
   DELETE FROM Media_Has_Genres 
    WHERE id_media = p_id_media AND id_genre = p_id_genre;

-- update a MediaGenre
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

-- add a Genre
 INSERT INTO Genres (description) 
    VALUES (p_description);