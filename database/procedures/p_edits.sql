-- O==============================================================O --
/*
#
|   O===========================O    
|   |    Procedures - Edição    |    
|   O===========================O    
#
#    Procedures:
|    - Campus:
|    - [x] EditCampusName
|    - [x] EditCampusState
|    - User:
|    - [x] EditUserName
|    - [x] EditUserEmail
|    - [x] EditUserPassword
|    - [x] EditUserPic
|    - [x] EditUserType
|    - [x] EditUserCampusAdminLevel
|    - Lab:
|    - [x] EditUserLabLevel
|    - [x] EditLabName
|    - [x] EditLabCapacity
|    - Inventory:
|    - - Element:
|    - [x] EditElementName
|    - [x] EditElementQuantity
|    - [x] EditElementDescription
|    - [x] EditElementMolWeight
|    - [x] EditElementCAS
|    - [x] EditElementEC
|    - [x] EditElementPhysicalState
|    - [x] EditElementImage
|    - [x] EditElementExpiration
|    - [x] EditElementSupervisorLevel
|    - - Equipment:
|    - [x] EditEquipmentName
|    - [x] EditEquipmentDescription
|    - [x] EditEquipmentTotalQuantity
|    - [x] EditEquipmentQuality
|    - [x] EditEquipmentImage
|    - [x] EditEquipmentSupervisorLevel
|    - Schedule:
|    - [x] StartSchedule
|    - [x] FinishSchedule
#    
 */
-- O==============================================================O --
/*
#
|   O==============O
|   |    Campus    |
|   O==============O
#
|   - EditCampusName
|   - EditCampusState
#
 */
-- O==============================================================O --
-- Editar nome do campus
DROP PROCEDURE IF EXISTS EditCampusName;

DELIMITER $$
CREATE PROCEDURE EditCampusName (IN p_ID_campus INT, IN p_Nome VARCHAR(128)) BEGIN
UPDATE campus
SET
    Nome = p_Nome
WHERE
    ID_campus = p_ID_campus;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar estado do campus
DROP PROCEDURE IF EXISTS EditCampusState;

DELIMITER $$
CREATE PROCEDURE EditCampusState (IN p_ID_campus INT, IN p_Estado VARCHAR(2)) BEGIN
UPDATE campus
SET
    Estado = p_Estado
WHERE
    ID_campus = p_ID_campus;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O===============O
|   |    Usuário    |
|   O===============O
#
|   - EditUserName
|   - EditUserEmail
|   - EditUserPassword
|   - EditUserPic
|   - EditUserType
|   - EditUserCampusAdminLevel
#
 */
-- O==============================================================O --
-- Editar nome do usuário
DROP PROCEDURE IF EXISTS EditUserName;

DELIMITER $$
CREATE PROCEDURE EditUserName (IN p_ID_user INT, IN p_Nome VARCHAR(128)) BEGIN
UPDATE usuarios
SET
    Nome = p_Nome
WHERE
    ID_usuario = p_ID_user;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar email do usuário
DROP PROCEDURE IF EXISTS EditUserEmail;

DELIMITER $$
CREATE PROCEDURE EditUserEmail (IN p_ID_user INT, IN p_Email VARCHAR(256)) BEGIN
UPDATE usuarios
SET
    Email = p_Email
WHERE
    ID_usuario = p_ID_user;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar senha do usuário
DROP PROCEDURE IF EXISTS EditUserPassword;

DELIMITER $$
CREATE PROCEDURE EditUserPassword (IN p_ID_user INT, IN p_Senha VARCHAR(60), p_Salt VARCHAR(60)) BEGIN
UPDATE usuarios
SET
    Senha = p_Senha,
    Salt = p_Salt
WHERE
    ID_usuario = p_ID_user;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar foto do usuário
DROP PROCEDURE IF EXISTS EditUserPic;

DELIMITER $$
CREATE PROCEDURE EditUserPic (IN p_ID_user INT, IN p_profilePic LONGTEXT) BEGIN
UPDATE usuarios
SET
    profilePic = p_profilePic
WHERE
    ID_usuario = p_ID_user;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar tipo do usuário
DROP PROCEDURE IF EXISTS EditUserType;

DELIMITER $$
CREATE PROCEDURE EditUserType (IN p_ID_user INT, IN p_Tipo INT) BEGIN
UPDATE usuarios
SET
    Tipo = p_Tipo
WHERE
    ID_usuario = p_ID_user;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar nível de administração do campus do usuário
DROP PROCEDURE IF EXISTS EditUserCampusAdminLevel;

DELIMITER $$
CREATE PROCEDURE EditUserCampusAdminLevel (IN p_ID_user INT, IN p_Nivel INT) BEGIN
UPDATE usuarios
SET
    CampusAdminLevel = p_Nivel
WHERE
    ID_usuario = p_ID_user;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O===========O
|   |    Lab    |
|   O===========O
#
|   - EditUserLabLevel
|   - EditLabName
|   - EditLabCapacity
#
 */
-- O==============================================================O --
-- Editar nível do usuário
DROP PROCEDURE IF EXISTS EditUserLabLevel;

DELIMITER $$
CREATE PROCEDURE EditUserLabLevel (IN p_ID_user INT, IN p_ID_lab INT, IN p_AdminLevel INT) BEGIN
UPDATE userlab
SET
    AdminLevel = p_AdminLevel
WHERE
    ID_usuario = p_ID_user
    AND ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar nome do laboratório
DROP PROCEDURE IF EXISTS EditLabName;

DELIMITER $$
CREATE PROCEDURE EditLabName (IN p_ID_lab INT, IN p_Nome VARCHAR(128)) BEGIN
UPDATE laboratorios
SET
    Sala = p_Nome
WHERE
    ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar capacidade do laboratório
DROP PROCEDURE IF EXISTS EditLabCapacity;

DELIMITER $$
CREATE PROCEDURE EditLabCapacity (IN p_ID_lab INT, IN p_Capacidade INT) BEGIN
UPDATE laboratorios
SET
    Capacidade = p_Capacidade
WHERE
    ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O===============O
|   |    Element    |
|   O===============O
#
|   - EditElementName
|   - EditElementQuantity
|   - EditElementDescription
|   - EditElementMolWeight
|   - EditElementCAS
|   - EditElementEC
|   - EditElementPhysicalState
|   - EditElementImage
|   - EditElementExpiration
|   - EditElementSupervisorLevel
#
 */
-- O==============================================================O --
-- Editar nome do elemento
DROP PROCEDURE IF EXISTS EditElementName;

DELIMITER $$
CREATE PROCEDURE EditElementName (IN p_ID_elem INT, IN p_Nome VARCHAR(128)) BEGIN
UPDATE elementos
SET
    Nome = p_Nome
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar quantidade do elemento
DROP PROCEDURE IF EXISTS EditElementQuantity;

DELIMITER $$
CREATE PROCEDURE EditElementQuantity (IN p_ID_elem INT, IN p_Quantidade DECIMAL(10, 3)) BEGIN
UPDATE elementos
SET
    Quantidade = p_Quantidade
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar descrição do elemento
DROP PROCEDURE IF EXISTS EditElementDescription;

DELIMITER $$
CREATE PROCEDURE EditElementDescription (IN p_ID_elem INT, IN p_Descricao TEXT) BEGIN
UPDATE elementos
SET
    Descricao = p_Descricao
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar peso molecular do elemento
DROP PROCEDURE IF EXISTS EditElementMolWeight;

DELIMITER $$
CREATE PROCEDURE EditElementMolWeight (IN p_ID_elem INT, IN p_Peso_molecular DECIMAL(10, 3)) BEGIN
UPDATE elementos
SET
    Peso_molecular = p_Peso_molecular
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar CAS do elemento
DROP PROCEDURE IF EXISTS EditElementCAS;

DELIMITER $$
CREATE PROCEDURE EditElementCAS (IN p_ID_elem INT, IN p_Num_cas VARCHAR(32)) BEGIN
UPDATE elementos
SET
    Num_cas = p_Num_cas
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar EC do elemento
DROP PROCEDURE IF EXISTS EditElementEC;

DELIMITER $$
CREATE PROCEDURE EditElementEC (IN p_ID_elem INT, IN p_Num_ec VARCHAR(32)) BEGIN
UPDATE elementos
SET
    Num_ec = p_Num_ec
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar estado físico do elemento
DROP PROCEDURE IF EXISTS EditElementPhysicalState;

DELIMITER $$
CREATE PROCEDURE EditElementPhysicalState (IN p_ID_elem INT, IN p_EstadoFisico INT) BEGIN
UPDATE elementos
SET
    EstadoFisico = p_EstadoFisico
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar imagem do elemento
DROP PROCEDURE IF EXISTS EditElementImage;

DELIMITER $$
CREATE PROCEDURE EditElementImage (IN p_ID_elem INT, IN p_Imagem LONGTEXT) BEGIN
UPDATE elementos
SET
    Imagem = p_Imagem
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar validade do elemento
DROP PROCEDURE IF EXISTS EditElementExpiration;

DELIMITER $$
CREATE PROCEDURE EditElementExpiration (IN p_ID_elem INT, IN p_Validade DATE) BEGIN
UPDATE elementos
SET
    Validade = p_Validade
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar nível de supervisão do elemento
DROP PROCEDURE IF EXISTS EditElementSupervisorLevel;

DELIMITER $$
CREATE PROCEDURE EditElementSupervisorLevel (IN p_ID_elem INT, IN p_SupervisorLevel INT) BEGIN
UPDATE elementos
SET
    SupervisorLevel = p_SupervisorLevel
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O=================O
|   |    Equipment    |
|   O=================O
#
|   - EditEquipmentName
|   - EditEquipmentDescription
|   - EditEquipmentTotalQuantity
|   - EditEquipmentAvailableQuantity
|   - EditEquipmentQuality
|   - EditEquipmentImage
|   - EditEquipmentSupervisorLevel
#
 */
-- O==============================================================O --
-- Editar nome do equipamento
DROP PROCEDURE IF EXISTS EditEquipmentName;

DELIMITER $$
CREATE PROCEDURE EditEquipmentName (IN p_ID_equip INT, IN p_Nome VARCHAR(128)) BEGIN
UPDATE equipamentos
SET
    Nome = p_Nome
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar descrição do equipamento
DROP PROCEDURE IF EXISTS EditEquipmentDescription;

DELIMITER $$
CREATE PROCEDURE EditEquipmentDescription (IN p_ID_equip INT, IN p_Descricao TEXT) BEGIN
UPDATE equipamentos
SET
    Descricao = p_Descricao
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar quantidade total do equipamento
DROP PROCEDURE IF EXISTS EditEquipmentTotalQuantity;

DELIMITER $$
CREATE PROCEDURE EditEquipmentTotalQuantity (IN p_ID_equip INT, IN p_QuantidadeTotal INT) BEGIN
UPDATE equipamentos
SET
    QuantidadeTotal = p_QuantidadeTotal
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar qualidade do equipamento
DROP PROCEDURE IF EXISTS EditEquipmentQuality;

DELIMITER $$
CREATE PROCEDURE EditEquipmentQuality (IN p_ID_equip INT, IN p_Qualidade INT) BEGIN
UPDATE equipamentos
SET
    Qualidade = p_Qualidade
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar imagem do equipamento
DROP PROCEDURE IF EXISTS EditEquipmentImage;

DELIMITER $$
CREATE PROCEDURE EditEquipmentImage (IN p_ID_equip INT, IN p_Imagem LONGTEXT) BEGIN
UPDATE equipamentos
SET
    Imagem = p_Imagem
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar nível de supervisão do equipamento
DROP PROCEDURE IF EXISTS EditEquipmentSupervisorLevel;

DELIMITER $$
CREATE PROCEDURE EditEquipmentSupervisorLevel (IN p_ID_equip INT, IN p_SupervisorLevel INT) BEGIN
UPDATE equipamentos
SET
    SupervisorLevel = p_SupervisorLevel
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O================O
|   |    Schedule    |
|   O================O
#
|   - StartSchedule
|   - FinishSchedule
#
 */
-- O==============================================================O --
-- Iniciar horário
DROP PROCEDURE IF EXISTS StartSchedule;

DELIMITER $$
CREATE PROCEDURE StartSchedule (IN p_ID_hor INT) BEGIN
UPDATE horarios
SET
    Started = 1
WHERE
    ID_hor = p_ID_hor;

END $$ DELIMITER;

-- O==============================================================O --
-- Finalizar horário
DROP PROCEDURE IF EXISTS FinishSchedule;

DELIMITER $$
CREATE PROCEDURE FinishSchedule (IN p_ID_hor INT) BEGIN
UPDATE horarios
SET
    Finished = 1
WHERE
    ID_hor = p_ID_hor;

END $$ DELIMITER;

-- O==============================================================O --