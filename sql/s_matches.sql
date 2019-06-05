DROP TABLE IF EXISTS pets;
CREATE TABLE pets(name VARCHAR(100), animal VARCHAR(100), hobbies VARCHAR(1000), aniPref VARCHAR(100));
INSERT INTO pets(name, animal, hobbies, aniPref) VALUE ('a', 'a', 'a', 'a');

-- DROP PROCEDURE IF EXISTS find_match;
-- DELIMITER $$

-- CREATE PROCEDURE find_match(IN hobbies VARCHAR(100), IN aniPref VARCHAR(100))
