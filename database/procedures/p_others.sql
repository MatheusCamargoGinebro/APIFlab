-- O==============================================================O --
/*
#
|   O==============================O    
|   |    Procedures - MailCodes    |    
|   O==============================O    
#
#    Procedures:
|    - [x] CreateMailCode
|    - [x] GetMailCode
|    - [x] DeleteMailCode
#    
 */
-- O==============================================================O --
-- Criar código de e-mail
DROP PROCEDURE IF EXISTS CreateMailCode;

DELIMITER $$
CREATE PROCEDURE CreateMailCode (IN p_Email VARCHAR(256), IN p_Checkcode CHAR(5)) BEGIN
INSERT INTO
    email_codes (Email, Checkcode)
VALUES
    (p_Email, p_Checkcode);

END $$ DELIMITER;

-- O==============================================================O --
-- Ler código de e-mail
DROP PROCEDURE IF EXISTS GetMailCode;

DELIMITER $$
CREATE PROCEDURE GetMailCode (IN p_Email VARCHAR(256)) BEGIN
SELECT
    Checkcode
FROM
    email_codes
WHERE
    Email = p_Email;

END $$ DELIMITER;

-- O==============================================================O --
-- Deletar código de e-mail
DROP PROCEDURE IF EXISTS DeleteMailCode;

DELIMITER $$
CREATE PROCEDURE DeleteMailCode (IN p_Email VARCHAR(256)) BEGIN
DELETE FROM email_codes
WHERE
    Email = p_Email;

END $$ DELIMITER;

-- O==============================================================O --