

-- Team 11 Scott Dispensa and Tyler Grzymalski
-- Library project Data Definition Queries
-- Produced with the help of MySQL forward engineering 



DROP PROCEDURE IF EXISTS sp_ResetSite;

DELIMITER // 

CREATE PROCEDURE sp_ResetSite()


BEGIN

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Table Customers

DROP TABLE IF EXISTS Customers;

CREATE TABLE IF NOT EXISTS `Customers` (
  `id_customer` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(75) NOT NULL,
  `last_name` VARCHAR(75) NOT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `fine_total` DECIMAL(19,2) DEFAULT NULL,
  `phone_number` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id_customer`),
  UNIQUE INDEX `id_customer_UNIQUE` (`id_customer` ASC) VISIBLE)
ENGINE = InnoDB;



-- Table Check_Outs

DROP TABLE IF EXISTS Check_Outs;

CREATE TABLE IF NOT EXISTS `Check_Outs` (
  `id_check_out` INT(11) NOT NULL AUTO_INCREMENT,
  `date_checked_out` DATE NULL DEFAULT NULL,
  `due_date` DATE NULL DEFAULT NULL,
  `id_customer` INT(11),
  `id_media` INT(10) UNSIGNED,
  PRIMARY KEY (`id_check_out`),
  UNIQUE INDEX `id_check_out_UNIQUE` (`id_check_out` ASC) VISIBLE,
  INDEX `fk_Check_Outs_Customers_idx` (`id_customer` ASC) VISIBLE,
  INDEX `fk_Check_Outs_Media1_idx` (`id_media` ASC) VISIBLE,
  CONSTRAINT `fk_Check_Outs_Customers`
    FOREIGN KEY (`id_customer`)
    REFERENCES `Customers` (`id_customer`)
    ON DELETE SET NULL,
  CONSTRAINT `fk_Check_Outs_Media1`
    FOREIGN KEY (`id_media`)
    REFERENCES `Media` (`id_media`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;




-- Table Genres

DROP TABLE IF EXISTS Genres;

CREATE TABLE IF NOT EXISTS `Genres` (
  `id_genre` INT(11) NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_genre`),
  UNIQUE INDEX `id_genre_UNIQUE` (`id_genre` ASC) VISIBLE)
ENGINE = InnoDB;


-- Table Media

DROP TABLE IF EXISTS Media;

CREATE TABLE IF NOT EXISTS `Media` (
  `id_media` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(75) NOT NULL,
  `author_director_artist` VARCHAR(75) NOT NULL,
  `is_electronic` TINYINT(4) NOT NULL DEFAULT 0,
  `checked_out` TINYINT(4) NULL DEFAULT NULL,
  `media_type` ENUM('book', 'music', 'movie') NULL DEFAULT NULL,
  PRIMARY KEY (`id_media`),
  UNIQUE INDEX `id_book_UNIQUE` (`id_media` ASC) VISIBLE)
ENGINE = InnoDB;



-- Table Media_Has_Genres

DROP TABLE IF EXISTS Media_Has_Genres;

CREATE TABLE IF NOT EXISTS `Media_Has_Genres` (
  `id_media` INT(10) UNSIGNED NOT NULL,
  `id_genre` INT(11) NOT NULL,
  PRIMARY KEY (`id_media`, `id_genre`),
  INDEX `fk_Media_Has_Genres_Genres1_idx` (`id_genre` ASC) VISIBLE,
  INDEX `fk_Media_Has_Genres_Media1_idx` (`id_media` ASC) VISIBLE,
  CONSTRAINT `fk_Media_Has_Genres_Genres1`
    FOREIGN KEY (`id_genre`)
    REFERENCES `Genres` (`id_genre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Media_Has_Genres_Media1`
    FOREIGN KEY (`id_media`)
    REFERENCES `Media` (`id_media`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Insert Queries



-- Customer Inserts

INSERT INTO `Customers` (`first_name`,`last_name`,`email`,`fine_total`,`phone_number`)
 VALUES ('Scott','Dispensa','dispenss@oregonstate.edu',0.00,'917-555-1212');
INSERT INTO `Customers` (`first_name`,`last_name`,`email`,`fine_total`,`phone_number`) 
VALUES ('Tyler','Grzymalski','grzymalt@oregonstate.edu',0.00,'555-100-1000');
INSERT INTO `Customers` (`first_name`,`last_name`,`email`,`fine_total`,`phone_number`)
 VALUES ('Williams','Wallace','imadog@oregonstate.edu',2.50,NULL);
INSERT INTO `Customers` (`first_name`,`last_name`,`email`,`fine_total`,`phone_number`) 
VALUES ('Finnegan','McCloud','alsoadog@oregonstate.edu',0.00,NULL);
INSERT INTO `Customers` (`first_name`,`last_name`,`email`,`fine_total`,`phone_number`) 
VALUES ('Hubert','Perry','imacat@oregonstate.edu',1.00,NULL);

-- Genres Inserts

INSERT INTO `Genres` (`description`) VALUES ('Thriller');
INSERT INTO `Genres` (`description`) VALUES ('Fantasy');
INSERT INTO `Genres` (`description`) VALUES ('Sci-Fi');
INSERT INTO `Genres` (`description`) VALUES ('Romance');
INSERT INTO `Genres` (`description`) VALUES ('Comedy');
INSERT INTO `Genres` (`description`) VALUES ('Drama');
INSERT INTO `Genres` (`description`) VALUES ('Non-fiction');
INSERT INTO `Genres` (`description`) VALUES ('Fiction');
INSERT INTO `Genres` (`description`) VALUES ('Classics');


-- Media Inserts

INSERT INTO `Media` (`title`,`author_director_artist`,`is_electronic`,`checked_out`,`media_type`)
 VALUES ('Hopscotch','Cortazar', 0, NULL, 'book');
INSERT INTO `Media` (`title`,`author_director_artist`,`is_electronic`,`checked_out`,`media_type`)
 VALUES ('The Office', 'Carell', 1, NULL, 'movie');
INSERT INTO `Media` (`title`,`author_director_artist`,`is_electronic`,`checked_out`,`media_type`)
 VALUES ('Firebird', 'Stravinski', 0, NULL, 'music');


-- Media_Has_Genres Inserts
INSERT INTO `Media_Has_Genres` (`id_media`, `id_genre`)
VALUES (
    (SELECT id_media FROM Media WHERE title = 'Hopscotch' LIMIT 1),
    (SELECT id_genre FROM Genres WHERE description = 'Fiction')
);

INSERT INTO `Media_Has_Genres` (`id_media`, `id_genre`)
VALUES (
    (SELECT id_media FROM Media WHERE title = 'Hopscotch' LIMIT 1),
    (SELECT id_genre FROM Genres WHERE description = 'Fantasy')
);

INSERT INTO `Media_Has_Genres` (`id_media`, `id_genre`)
VALUES (
    (SELECT id_media FROM Media WHERE title = 'The Office' LIMIT 1),
    (SELECT id_genre FROM Genres WHERE description = 'Comedy')
);

INSERT INTO `Media_Has_Genres` (`id_media`, `id_genre`)
VALUES (
    (SELECT id_media FROM Media WHERE title = 'The Office' LIMIT 1),
    (SELECT id_genre FROM Genres WHERE description = 'Classics')
);

INSERT INTO `Media_Has_Genres` (`id_media`, `id_genre`)
VALUES (
    (SELECT id_media FROM Media WHERE title = 'Firebird' LIMIT 1),
    (SELECT id_genre FROM Genres WHERE description = 'Classics')
);

-- Check_Outs Inserts

INSERT INTO `Check_Outs` (`date_checked_out`, `due_date`, `id_customer`, `id_media`)
	SELECT '2025-12-24', '2026-01-24', c.id_customer, m.id_media FROM Customers c 
	JOIN Media m ON 1=1
    WHERE c.last_name = 'Dispensa' and m.title = 'Hopscotch' LIMIT 1;

INSERT INTO `Check_Outs` (`date_checked_out`, `due_date`, `id_customer`, `id_media`)
    SELECT '2025-11-01', '2025-12-01', c.id_customer, m.id_media FROM Customers c, Media m
    WHERE c.last_name = 'Grzymalski' and m.title = 'Firebird' LIMIT 1;


INSERT INTO `Check_Outs` (`date_checked_out`, `due_date`, `id_customer`, `id_media`)
	SELECT '2025-11-01', '2025-12-01', c.id_customer, m.id_media FROM Customers c, Media m 
	WHERE c.last_name = 'Grzymalski' AND m.title = 'The Office' LIMIT 1;

SET FOREIGN_KEY_CHECKS=1;

COMMIT;

END //

DELIMITER ; 