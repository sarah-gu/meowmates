DROP PROCEDURE IF EXISTS new_pet;

DELIMITER $$

CREATE PROCEDURE new_pet(IN name VARCHAR(100))

BEGIN
    IF NOT EXISTS (SELECT 1 FROM pets WHERE p_name = name) THEN
        INSERT INTO pets(p_name, p_type, p_x, p_y, p_time) VALUES (name, 0, 0, 0, 0);
        INSERT INTO pet_requests(pet_name, pet_name1, pet_name2, pet_name3, 
            pet_name4, pet_name5) VALUES (name, '', '', '', '', '');
    END IF;
END$$

DELIMITER ;