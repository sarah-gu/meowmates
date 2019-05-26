# drop existing procedure
DROP PROCEDURE IF EXISTS add_owner; 
 
# change delimiter to $$ --> i.e. the statement terminator is changed to $$
DELIMITER $$ 
 
# name the procedure; this one will have no arguments
CREATE PROCEDURE add_owner(IN idCur VARCHAR(100), IN passwordCur VARCHAR(100), IN emailCur VARCHAR(100), IN fullnameCur VARCHAR(100))
BEGIN
    IF NOT EXISTS (SELECT 1 FROM owners WHERE id=idCur) THEN
        INSERT INTO owners(id, password, email, fullname) VALUE (idCur, passwordCur , emailCur, fullnameCur);
    END IF;
    # statement (therefore, procedure) is over
END$$ 

# change the delimiter back to normal
DELIMITER ; 

DROP PROCEDURE IF EXISTS check_pass; 
# change delimiter to $$ --> i.e. the statement terminator is changed to $$
DELIMITER $$ 
 
# name the procedure; this one will have no arguments
CREATE PROCEDURE check_pass(IN idCur VARCHAR(100), IN passwordCur VARCHAR(100))
BEGIN
    IF EXISTS (SELECT 1 FROM owners WHERE id=idCur AND password = passwordCur) THEN
        SELECT id FROM owners WHERE id=idCur; 
    END IF;
    # statement (therefore, procedure) is over
END$$ 

# change the delimiter back to normal
DELIMITER ;