-- O===============================O --
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
|    - [x] ClearMailCodes
#    
 */
-- O===============================O --
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
-- Limpar tabela de códigos de e-mail:
DROP PROCEDURE IF EXISTS ClearMailCodes;

DELIMITER $$
CREATE PROCEDURE ClearMailCodes () BEGIN
DELETE FROM email_codes;

END $$ DELIMITER;

-- O==============================================================O --
-- O===============================O --
/*
#
|   O==============================O    
|   |    Procedures - Blacklist    |    
|   O==============================O    
#
#    Procedures:
|   - [x] AddToBlacklist
|   - [x] GetFromBlacklist
|   - [x] GetAllBlacklist
|   - [x] RemoveFromBlacklist
|   - [x] RemoveAllBlacklist
#    
 */
-- O===============================O --
-- Adicionar token à lista negra:
DROP PROCEDURE IF EXISTS AddToBlacklist;

DELIMITER $$
CREATE PROCEDURE AddToBlacklist (IN p_token VARCHAR(256)) BEGIN
INSERT INTO
    blacklist (Token)
VALUES
    (p_token);

END $$ DELIMITER;

-- O==============================================================O --
-- Ler token da lista negra:
DROP PROCEDURE IF EXISTS GetFromBlacklist;

DELIMITER $$
CREATE PROCEDURE GetFromBlacklist (IN p_token VARCHAR(256)) BEGIN
SELECT
    Token
FROM
    blacklist
WHERE
    Token = p_token;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler todos os tokens da lista negra:
DROP PROCEDURE IF EXISTS GetAllBlacklist;

DELIMITER $$
CREATE PROCEDURE GetAllBlacklist () BEGIN
SELECT
    Token
FROM
    blacklist;

END $$ DELIMITER;

-- O==============================================================O --
-- Remover token da lista negra:
DROP PROCEDURE IF EXISTS RemoveFromBlacklist;

DELIMITER $$
CREATE PROCEDURE RemoveFromBlacklist (IN p_token VARCHAR(256)) BEGIN
DELETE FROM blacklist
WHERE
    Token = p_token;

END $$ DELIMITER;

-- O==============================================================O --
-- Remover todos os tokens da lista negra:
DROP PROCEDURE IF EXISTS RemoveAllBlacklist;

DELIMITER $$
CREATE PROCEDURE RemoveAllBlacklist () BEGIN
DELETE FROM blacklist;

END $$ DELIMITER;

-- O==============================================================O --