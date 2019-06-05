DROP TABLE IF EXISTS pets;
CREATE TABLE pets(imagelink VARCHAR(100), id VARCHAR(100), animal VARCHAR(100), hobbies VARCHAR(1000), location VARCHAR(100), bio VARCHAR(100));
INSERT INTO pets(imagelink, id, animal, hobbies, location, bio) VALUE ('https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559__340.jpg','skip', 'dog', 'running', 'a', 'hi');

-- DROP PROCEDURE IF EXISTS find_match;
-- DELIMITER $$

-- CREATE PROCEDURE find_match(IN hobbies VARCHAR(100), IN aniPref VARCHAR(100))