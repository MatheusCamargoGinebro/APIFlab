-- O==============================================================O --
/*
#
|   O===========================O    
|   |    Procedures - Edição    |    
|   O===========================O    
#
#    Procedures:
|    - [x] EditCampus
|    - [x] EditUser
|    - Lab:
|    - [x] EditLab
|    - [x] EditUserLevel
|    - Inventory:
|    - [x] EditElement
|    - [x] EditEquipment
|    - Schedule:
|    - [x] StartSchedule
|    - [x] FinishSchedule
#    
 */
-- O==============================================================O --
-- Editar campus
DROP PROCEDURE IF EXISTS EditCampus;

DELIMITER $$
CREATE PROCEDURE EditCampus (
    IN p_ID_campus INT,
    IN p_Nome VARCHAR(128),
    IN p_Estado VARCHAR(2)
) BEGIN
UPDATE campus
SET
    Nome = p_Nome,
    Estado = p_Estado
WHERE
    ID_campus = p_ID_campus;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar usuário
DROP PROCEDURE IF EXISTS EditUser;

DELIMITER $$
CREATE PROCEDURE EditUser (
    IN p_ID_usuario INT,
    IN p_Nome VARCHAR(128),
    IN p_Email VARCHAR(256),
    IN p_Senha VARCHAR(60),
    IN p_Salt VARCHAR(60),
    IN p_profilePic LONGTEXT,
    IN p_Tipo INT,
    IN p_CampusAdminLevel INT
) BEGIN
UPDATE usuarios
SET
    Nome = p_Nome,
    Email = p_Email,
    Senha = p_Senha,
    Salt = p_Salt,
    profilePic = p_profilePic,
    Tipo = p_Tipo,
    CampusAdminLevel = p_CampusAdminLevel
WHERE
    ID_usuario = p_ID_usuario;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar laboratório
DROP PROCEDURE IF EXISTS EditLab;

DELIMITER $$
CREATE PROCEDURE EditLab (
    IN p_ID_lab INT,
    IN p_Sala VARCHAR(16),
    IN p_Capacidade INT,
    IN p_ID_campus INT
) BEGIN
UPDATE laboratorios
SET
    Sala = p_Sala,
    Capacidade = p_Capacidade
WHERE
    ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar nível de usuário em um laboratório:
DROP PROCEDURE IF EXISTS EditUserLevel;

DELIMITER $$
CREATE PROCEDURE EditUserLevel (
    IN p_ID_usuario INT,
    IN p_ID_lab INT,
    IN p_AdminLevel INT
) BEGIN
UPDATE userlab
SET
    AdminLevel = p_AdminLevel
WHERE
    ID_usuario = p_ID_usuario
    AND ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar elemento
DROP PROCEDURE IF EXISTS EditElement;

DELIMITER $$
CREATE PROCEDURE EditElement (
    IN p_ID_elem INT,
    IN p_Nome VARCHAR(128),
    IN p_Quantidade DECIMAL(10, 3),
    IN p_Descricao TEXT,
    IN p_Peso_molecular DECIMAL(10, 3),
    IN p_Num_cas VARCHAR(32),
    IN p_Num_ec VARCHAR(32),
    IN p_EstadoFisico INT,
    IN p_Imagem LONGTEXT,
    IN p_Validade DATE,
    IN p_SupervisorLevel INT,
    IN p_ID_lab INT
) BEGIN
UPDATE elementos
SET
    Nome = p_Nome,
    Quantidade = p_Quantidade,
    Descricao = p_Descricao,
    Peso_molecular = p_Peso_molecular,
    Num_cas = p_Num_cas,
    Num_ec = p_Num_ec,
    EstadoFisico = p_EstadoFisico,
    Imagem = p_Imagem,
    Validade = p_Validade,
    SupervisorLevel = p_SupervisorLevel
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Editar equipamento
DROP PROCEDURE IF EXISTS EditEquipment;

DELIMITER $$
CREATE PROCEDURE EditEquipment (
    IN p_ID_equip INT,
    IN p_Nome VARCHAR(128),
    IN p_Descricao TEXT,
    IN p_QuantidadeTotal INT,
    IN p_QuantidadeDisponivel INT,
    IN p_Qualidade INT,
    IN p_Imagem LONGTEXT,
    IN p_SupervisorLevel INT,
    IN p_ID_lab INT
) BEGIN
UPDATE equipamentos
SET
    Nome = p_Nome,
    Descricao = p_Descricao,
    QuantidadeTotal = p_QuantidadeTotal,
    QuantidadeDisponivel = p_QuantidadeDisponivel,
    Qualidade = p_Qualidade,
    Imagem = p_Imagem,
    SupervisorLevel = p_SupervisorLevel
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

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