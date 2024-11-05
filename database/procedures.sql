-- O==============================================================O --
/*
#
|   O============================O    
|   |    Procedures - Criação    |    
|   O============================O    
#
#    Procedures:
|    - [x] CreateCampus
|    - [x] CreateUser
|    - [x] CreateLab
|    - [x] CreateElement
|    - [x] CreateEquipment
|    - [x] CreateSchedule
|    - [x] ReserveElement
|    - [x] ReserveEquipment
#    
 */
-- O==============================================================O --
-- Criar campus
DROP PROCEDURE IF EXISTS CreateCampus;

DELIMITER $$
CREATE PROCEDURE CreateCampus (IN p_Nome VARCHAR(128), IN p_Estado VARCHAR(2)) BEGIN
INSERT INTO
    campus (Nome, Estado)
VALUES
    (p_Nome, p_Estado);

END $$ DELIMITER;

-- O==============================================================O --
-- Criar usuário
DROP PROCEDURE IF EXISTS CreateUser;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS CreateUser (
    IN p_Nome VARCHAR(128),
    IN p_Email VARCHAR(256),
    IN p_Senha VARCHAR(60),
    IN p_Salt VARCHAR(60),
    IN p_profilePic LONGTEXT,
    IN p_Tipo INT,
    IN p_CampusAdminLevel INT,
    IN p_ID_campus INT
) BEGIN
INSERT INTO
    usuarios (
        Nome,
        Email,
        Senha,
        Salt,
        profilePic,
        Tipo,
        CampusAdminLevel,
        ID_campus
    )
VALUES
    (
        p_Nome,
        p_Email,
        p_Senha,
        p_Salt,
        p_profilePic,
        p_Tipo,
        p_CampusAdminLevel,
        p_ID_campus
    );

END $$ DELIMITER;

-- O==============================================================O --
-- Criar laboratório
DROP PROCEDURE IF EXISTS CreateLab;

DELIMITER $$
CREATE PROCEDURE CreateLab (
    IN p_Sala VARCHAR(16),
    IN p_Capacidade INT,
    IN p_ID_campus INT,
    IN p_ID_usuario INT
) BEGIN
INSERT INTO
    laboratorios (Sala, Capacidade, ID_campus)
VALUES
    (p_Sala, p_Capacidade, p_ID_campus);

INSERT INTO
    userlab (AdminLevel, ID_usuario, ID_lab)
VALUES
    (3, p_ID_usuario, LAST_INSERT_ID());

END $$ DELIMITER;

-- O==============================================================O --
-- Criar elemento
DROP PROCEDURE IF EXISTS CreateElement;

DELIMITER $$
CREATE PROCEDURE CreateElement (
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
INSERT INTO
    elementos (
        Nome,
        Quantidade,
        Descricao,
        Peso_molecular,
        Num_cas,
        Num_ec,
        EstadoFisico,
        Imagem,
        Validade,
        SupervisorLevel,
        ID_lab
    )
VALUES
    (
        p_Nome,
        p_Quantidade,
        p_Descricao,
        p_Peso_molecular,
        p_Num_cas,
        p_Num_ec,
        p_EstadoFisico,
        p_Imagem,
        p_Validade,
        p_SupervisorLevel,
        p_ID_lab
    );

END $$ DELIMITER;

-- O==============================================================O --
-- Criar equipamento
DROP PROCEDURE IF EXISTS CreateEquipment;

DELIMITER $$
CREATE PROCEDURE CreateEquipment (
    IN p_Nome VARCHAR(128),
    IN p_Descricao TEXT,
    IN p_QuantidadeTotal INT,
    IN p_QuantidadeDisponivel INT,
    IN p_Qualidade INT,
    IN p_Imagem LONGTEXT,
    IN p_SupervisorLevel INT,
    IN p_ID_lab INT
) BEGIN
INSERT INTO
    equipamentos (
        Nome,
        Descricao,
        QuantidadeTotal,
        QuantidadeDisponivel,
        Qualidade,
        Imagem,
        SupervisorLevel,
        ID_lab
    )
VALUES
    (
        p_Nome,
        p_Descricao,
        p_QuantidadeTotal,
        p_QuantidadeDisponivel,
        p_Qualidade,
        p_Imagem,
        p_SupervisorLevel,
        p_ID_lab
    );

END $$ DELIMITER;

-- O==============================================================O --
-- Criar horário
DROP PROCEDURE IF EXISTS CreateSchedule;

DELIMITER $$
CREATE PROCEDURE CreateSchedule (
    IN p_Inicio TIMESTAMP,
    IN p_Fim TIMESTAMP,
    IN p_ID_lab INT,
    IN p_ID_usuario INT
) BEGIN
INSERT INTO
    horarios (
        Inicio,
        Fim,
        Finished,
        Started,
        ID_lab,
        ID_usuario
    )
VALUES
    (p_Inicio, p_Fim, 0, 0, p_ID_lab, p_ID_usuario);

END $$ DELIMITER;

-- O==============================================================O --
-- Reservar elemento
DROP PROCEDURE IF EXISTS ReserveElement;

DELIMITER $$
CREATE PROCEDURE ReserveElement (
    IN p_Quantidade DECIMAL(10, 3),
    IN p_ID_elem INT,
    IN p_ID_hor INT
) BEGIN
INSERT INTO
    reserva_elemento (Quantidade, ID_elem, ID_hor)
VALUES
    (p_Quantidade, p_ID_elem, p_ID_hor);

-- Atualizar quantidade disponível
UPDATE elementos
SET
    Quantidade = Quantidade - p_Quantidade
WHERE
    ID_elem = p_ID_elem;

END $$ DELIMITER;

-- O==============================================================O --
-- Reservar equipamento
DROP PROCEDURE IF EXISTS ReserveEquipment;

DELIMITER $$
CREATE PROCEDURE ReserveEquipment (
    IN p_Quantidade INT,
    IN p_ID_equip INT,
    IN p_ID_hor INT
) BEGIN
INSERT INTO
    reserva_equipamento (Quantidade, ID_equip, ID_hor)
VALUES
    (p_Quantidade, p_ID_equip, p_ID_hor);

-- Atualizar quantidade disponível
UPDATE equipamentos
SET
    QuantidadeDisponivel = QuantidadeDisponivel - p_Quantidade
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

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
|    - [x] EditLab
|    - [x] EditElement
|    - [x] EditEquipment
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
    IN p_CampusAdminLevel INT,
    IN p_ID_campus INT
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
/*
#
|   O============================O    
|   |    Procedures - Deleção    |    
|   O============================O    
#
#    Procedures:
|    - [x] DeleteSchedule
#    
 */
-- O==============================================================O --
-- Deletar Horário
DROP PROCEDURE IF EXISTS DeleteSchedule;

DELIMITER $$
CREATE PROCEDURE DeleteSchedule (IN p_ID_hor INT) BEGIN
DELETE FROM reserva_elemento
WHERE
    ID_hor = p_ID_hor;

DELETE FROM reserva_equipamento
WHERE
    ID_hor = p_ID_hor;

DELETE FROM horarios
WHERE
    ID_hor = p_ID_hor;

END $$ DELIMITER;

-- O==============================================================O --
/*
#
|   O============================O    
|   |    Procedures - Leitura    |    
|   O============================O    
#
#    Procedures:
|    - [x] GetLabsByUser
|    - [x] GetSchedulesByLab
|    - [x] GetElementsByLab
|    - [x] GetEquipmentsByLab
|    - [x] GetUsersByLab
|    - [x] GetUserByID
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
-- Ler elementos de um laboratório:
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
-- Ler equipamentos de um laboratório:
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
-- Ler informações de um determinado usuário:
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

-- =========================================== Triggers =========================================== --