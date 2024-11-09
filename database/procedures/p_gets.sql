-- O==============================================================O --
/*
#
|   O============================O    
|   |    Procedures - Leitura    |    
|   O============================O    
#
#    Procedures:
|    - Campus:
|    - [x] GetAllCampus
|    - [x] GetCampusByID
|    - [x] GetCampusByName
|    - Labs:
|    - [x] GetLabsByUser
|    - [x] GetLabByID
|    - [x] GetLabByName
|    - [x] GetAllLabUsers
|    - [x] GetLabUsersByLevel
|    - Schedule:
|    - [x] GetSchedulesByLab
|    - [x] GetScheduleByID
|    - Inventory:
|    - [x] GetElementsByLab
|    - [x] GetElementByID
|    - [x] GetEquipmentsByLab
|    - [x] GetEquipmentByID
|    - Users:
|    - [x] GetUsersByLab
|    - [x] GetUsersByCampus
|    - [x] GetUserByID
|    - [x] GetUserByEmail
|    - [x] GetUserByName
|    - [x] Login
#    
 */
-- O==============================================================O --
/*
#
|   O==============O
|   |    Campus    |
|   O==============O
#
|   - GetAllCampus
|   - GetCampusByID
|   - GetCampusByName
#
 */
-- O==============================================================O --
-- Ler todos os campus:
DROP PROCEDURE IF EXISTS GetAllCampus;

DELIMITER $$
CREATE PROCEDURE GetAllCampus () BEGIN
SELECT
    *
FROM
    campus;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler campus por ID:
DROP PROCEDURE IF EXISTS GetCampusByID;

DELIMITER $$
CREATE PROCEDURE GetCampusByID (IN p_ID_campus INT) BEGIN
SELECT
    *
FROM
    campus
WHERE
    campus.ID_campus = p_ID_campus;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler campus por nome:
DROP PROCEDURE IF EXISTS GetCampusByName;

DELIMITER $$
CREATE PROCEDURE GetCampusByName (IN p_campusName VARCHAR(128)) BEGIN
SELECT
    *
FROM
    campus
WHERE
    campus.Nome = p_campusName;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O===========O
|   |    Lab    |
|   O===========O
#
|   - GetLabsByUser
|   - GetLabByID
|   - GetLabByName
|   - GetAllLabUsers
|   - GetLabUsersByLevel
#
 */
-- O==============================================================O --
-- Ler todos os laboratórios em que um usuário tenha relação:
DROP PROCEDURE IF EXISTS GetLabsByUser;

DELIMITER $$
CREATE PROCEDURE GetLabsByUser (IN p_ID_usuario INT) BEGIN
SELECT DISTINCT
    laboratorios.ID_lab AS labID,
    laboratorios.Sala AS labName,
    usuario.nome AS atualUser,
    horarios.Inicio AS sessionStartsAt,
    horarios.Fim AS sessionEndsAt,
    horarios.Started AS sessionStarted,
    horarios.Finished AS sessionFinished
FROM
    laboratorios
    JOIN userlab ON laboratorios.ID_lab = userlab.ID_lab
    JOIN usuarios usuario ON userlab.ID_usuario = usuario.ID_usuario
    JOIN horarios ON laboratorios.ID_lab = horarios.ID_lab
WHERE
    usuario.ID_usuario = p_ID_usuario;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler laboratório por ID:
DROP PROCEDURE IF EXISTS GetLabByID;

DELIMITER $$
CREATE PROCEDURE GetLabByID (IN p_ID_lab INT) BEGIN
SELECT
    laboratorios.ID_lab AS labID,
    laboratorios.Sala AS labName,
    laboratorios.Capacidade AS capacity,
    laboratorios.ID_campus AS campusID
FROM
    laboratorios
WHERE
    laboratorios.ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler laboratório por nome:
DROP PROCEDURE IF EXISTS GetLabByName;

DELIMITER $$
CREATE PROCEDURE GetLabByName (IN p_labName VARCHAR(256)) BEGIN
SELECT
    laboratorios.ID_lab AS labID,
    laboratorios.Sala AS labName,
    laboratorios.Capacidade AS capacity,
    laboratorios.ID_campus AS campusID
FROM
    laboratorios
WHERE
    laboratorios.Sala = p_labName;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler todos os usuários de um laboratório:
DROP PROCEDURE IF EXISTS GetAllLabUsers;

DELIMITER $$
CREATE PROCEDURE GetAllLabUsers (IN p_ID_lab INT) BEGIN
SELECT DISTINCT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel,
    userlab.AdminLevel AS userLevel
FROM
    usuarios
    JOIN userlab ON usuarios.ID_usuario = userlab.ID_usuario
WHERE
    userlab.ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler usuários de um laboratório por nível:
DROP PROCEDURE IF EXISTS GetLabUsersByLevel;

DELIMITER $$
CREATE PROCEDURE GetLabUsersByLevel (IN p_ID_lab INT, IN p_level INT) BEGIN
SELECT DISTINCT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel
FROM
    usuarios
    JOIN userlab ON usuarios.ID_usuario = userlab.ID_usuario
WHERE
    userlab.ID_lab = p_ID_lab
    AND userlab.AdminLevel = p_level;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O================O
|   |    Schedule    |
|   O================O
#
|   - GetSchedulesByLab
|   - GetScheduleByID
#
 */
-- O==============================================================O --
-- Ler todas os horários de um laboratório:
DROP PROCEDURE IF EXISTS GetSchedulesByLab;

DELIMITER $$
CREATE PROCEDURE GetSchedulesByLab (IN p_ID_lab INT) BEGIN
SELECT
    horarios.ID_hor AS scheduleID,
    horarios.Inicio AS sessionStartsAt,
    horarios.Fim AS sessionEndsAt,
    horarios.Started AS sessionStarted,
    horarios.Finished AS sessionFinished
FROM
    horarios
WHERE
    horarios.ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler horário por ID:
DROP PROCEDURE IF EXISTS GetScheduleByID;

DELIMITER $$
CREATE PROCEDURE GetScheduleByID (IN p_ID_hor INT) BEGIN
SELECT
    horarios.ID_hor AS scheduleID,
    horarios.Inicio AS sessionStartsAt,
    horarios.Fim AS sessionEndsAt,
    horarios.Started AS sessionStarted,
    horarios.Finished AS sessionFinished
FROM
    horarios
WHERE
    horarios.ID_hor = p_ID_hor;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O=================O
|   |    Inventory    |
|   O=================O
#
|   - GetElementsByLab
|   - GetElementByID
|   - GetEquipmentsByLab
|   - GetEquipmentByID
#
 */
-- O==============================================================O --
-- Ler todos os elementos de um laboratório:
DROP PROCEDURE IF EXISTS GetElementsByLab;

DELIMITER $$
CREATE PROCEDURE GetElementsByLab (IN p_ID_lab INT) BEGIN
SELECT
    elementos.ID_elem AS elementID,
    elementos.Nome AS elementName,
    elementos.Quantidade AS Quantity,
    elementos.Descricao AS description,
    elementos.Peso_molecular AS molecularWeight,
    elementos.Num_cas AS CASNumber,
    elementos.Num_ec AS ECNumber,
    elementos.EstadoFisico AS physicalState,
    elementos.Imagem AS image,
    elementos.Validade AS expirationDate,
    elementos.SupervisorLevel AS supervisorLevel
FROM
    elementos
WHERE
    elementos.ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler elemento por ID:
DROP PROCEDURE IF EXISTS GetElementByID;

DELIMITER $$
CREATE PROCEDURE GetElementByID (IN p_ID_elem INT) BEGIN
SELECT
    elementos.ID_elem AS elementID,
    elementos.Nome AS elementName,
    elementos.Quantidade AS Quantity,
    elementos.Descricao AS description,
    elementos.Peso_molecular AS molecularWeight,
    elementos.Num_cas AS CASNumber,
    elementos.Num_ec AS ECNumber,
    elementos.EstadoFisico AS physicalState,
    elementos.Imagem AS image,
    elementos.Validade AS expirationDate,
    elementos.SupervisorLevel AS supervisorLevel
FROM
    elementos
WHERE
    elementos.ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler todos os equipamentos de um laboratório:
DROP PROCEDURE IF EXISTS GetEquipmentsByLab;

DELIMITER $$
CREATE PROCEDURE GetEquipmentsByLab (IN p_ID_lab INT) BEGIN
SELECT
    equipamentos.ID_equip AS equipmentID,
    equipamentos.Nome AS equipmentName,
    equipamentos.Descricao AS description,
    equipamentos.QuantidadeTotal AS totalQuantity,
    equipamentos.QuantidadeDisponivel AS availableQuantity,
    equipamentos.Qualidade AS quality,
    equipamentos.Imagem AS image,
    equipamentos.SupervisorLevel AS supervisorLevel
FROM
    equipamentos
WHERE
    equipamentos.ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler equipamento por ID:
DROP PROCEDURE IF EXISTS GetEquipmentByID;

DELIMITER $$
CREATE PROCEDURE GetEquipmentByID (IN p_ID_equip INT) BEGIN
SELECT
    equipamentos.ID_equip AS equipmentID,
    equipamentos.Nome AS equipmentName,
    equipamentos.Descricao AS description,
    equipamentos.QuantidadeTotal AS totalQuantity,
    equipamentos.QuantidadeDisponivel AS availableQuantity,
    equipamentos.Qualidade AS quality,
    equipamentos.Imagem AS image,
    equipamentos.SupervisorLevel AS supervisorLevel
FROM
    equipamentos
WHERE
    equipamentos.ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O=============O
|   |    Users    |
|   O=============O
#
|   - GetUsersByLab
|   - GetUsersByCampus
|   - GetUserByID
|   - GetUserByEmail
|   - GetUserByName
|   - Login
#
 */
-- O==============================================================O --
-- Ler todos os usuários de um laboratório:
DROP PROCEDURE IF EXISTS GetUsersByLab;

DELIMITER $$
CREATE PROCEDURE GetUsersByLab (IN p_ID_lab INT) BEGIN
SELECT DISTINCT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel
FROM
    usuarios
    JOIN userlab ON usuarios.ID_usuario = userlab.ID_usuario
WHERE
    userlab.ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler todos os usuários de um campus:
DROP PROCEDURE IF EXISTS GetUsersByCampus;

DELIMITER $$
CREATE PROCEDURE GetUsersByCampus (IN p_ID_campus INT) BEGIN
SELECT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel
FROM
    usuarios
WHERE
    usuarios.ID_campus = p_ID_campus;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler usuário por ID:
DROP PROCEDURE IF EXISTS GetUserByID;

DELIMITER $$
CREATE PROCEDURE GetUserByID (IN p_ID_usuario INT) BEGIN
SELECT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel
FROM
    usuarios
WHERE
    usuarios.ID_usuario = p_ID_usuario;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler usuário por email:
DROP PROCEDURE IF EXISTS GetUserByEmail;

DELIMITER $$
CREATE PROCEDURE GetUserByEmail (IN p_Email VARCHAR(256)) BEGIN
SELECT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel
FROM
    usuarios
WHERE
    usuarios.Email = p_Email;

END $$ DELIMITER;

-- O==============================================================O --
-- Ler usuário por nome:
DROP PROCEDURE IF EXISTS GetUserByName;

DELIMITER $$
CREATE PROCEDURE GetUserByName (IN p_Name VARCHAR(256)) BEGIN
SELECT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel
FROM
    usuarios
WHERE
    usuarios.Nome = p_Name;

END $$ DELIMITER;

-- O==============================================================O --
-- Verificar se login é válido:
DROP PROCEDURE IF EXISTS Login;

DELIMITER $$
CREATE PROCEDURE Login (IN p_Email VARCHAR(256), IN p_Senha VARCHAR(256)) BEGIN
SELECT
    usuarios.ID_usuario AS userID,
    usuarios.Nome AS userName,
    usuarios.Email AS userEmail,
    usuarios.profilePic AS userImage,
    usuarios.Tipo AS userType,
    usuarios.CampusAdminLevel AS campusAdminLevel
FROM
    usuarios
WHERE
    usuarios.Email = p_Email
    AND usuarios.Senha = p_Senha;

END $$ DELIMITER;

-- O==============================================================O --