-- O==============================================================O --
/*
#
|   O===========================O    
|   |    Procedures - Writes    |    
|   O===========================O    
#
#    Procedures:
|    - Campus:
|     - [x] CreateCampus
|    - Users:
|     - [x] CreateUser
|    - Lab:
|     - [x] CreateLab
|     - [x] DeleteLab
|     - [x] RelateUserLab
|     - [x] UnrelateUserLab
|    - Inventory:
|     - [x] CreateElement
|     - [x] DeleteElement
|     - [x] CreateEquipment
|     - [x] DeleteEquipment
|    - Session:
|     - [x] CreateSession
|     - [x] ReserveElement
|     - [x] ReserveEquipment
|     - [x] DeleteSession
|     - [x] UnreserveElement
|     - [x] UnreserveEquipment
#    
 */
-- O==============================================================O --
-- O===============================O
/* 
#
|   O======================O
|   |    Write - Campus    |
|   O======================O
#
#    Procedures:
|    - [x] CreateCampus
#    
 */
-- O===============================O
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
-- O===============================O
/*
#
|   O=====================O
|   |    Write - Users    |
|   O=====================O
#
#    Procedures:
|    - [x] CreateUser
#    
 */
-- O===============================O
-- Criar usuário
DROP PROCEDURE IF EXISTS CreateUser;

DELIMITER $$
CREATE PROCEDURE CreateUser (
    IN p_Nome VARCHAR(128),
    IN p_Email VARCHAR(256),
    IN p_Senha VARCHAR(60),
    IN p_Salt VARCHAR(60),
    IN p_Tipo INT,
    IN p_ID_campus INT,
    IN p_CampusAdminLevel INT
) BEGIN
INSERT INTO
    usuarios (
        Nome,
        Email,
        Senha,
        Salt,
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
        p_Tipo,
        p_CampusAdminLevel,
        p_ID_campus
    );

END $$ DELIMITER;

-- O==============================================================O --
-- O===============================O
/*
#
|   O====================O
|   |    Write - Lab    |
|   O====================O
#
#    Procedures:
|    - [x] CreateLab
|    - [x] RelateUserLab
|    - [x] UnrelateUserLab
#    
 */
-- O===============================O
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
-- Deletar laboratório
DROP PROCEDURE IF EXISTS DeleteLab;

DELIMITER $$
CREATE PROCEDURE DeleteLab (IN p_ID_lab INT) BEGIN
-- Deleta tudo relacionado ao laboratório (elemento, equipamento, reserva (horário), etc.)
DELETE FROM reserva_elemento
WHERE
    ID_elem IN (
        SELECT
            ID_elem
        FROM
            elementos
        WHERE
            ID_lab = p_ID_lab
    );

DELETE FROM reserva_equipamento
WHERE
    ID_equip IN (
        SELECT
            ID_equip
        FROM
            equipamentos
        WHERE
            ID_lab = p_ID_lab
    );

DELETE FROM elementos
WHERE
    ID_lab = p_ID_lab;

DELETE FROM equipamentos
WHERE
    ID_lab = p_ID_lab;

DELETE FROM horarios
WHERE
    ID_lab = p_ID_lab;

DELETE FROM userlab
WHERE
    ID_lab = p_ID_lab;

DELETE FROM laboratorios
WHERE
    ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- Relacionar usuário com laboratório
DROP PROCEDURE IF EXISTS RelateUserLab;

DELIMITER $$
CREATE PROCEDURE RelateUserLab (
    IN p_ID_usuario INT,
    IN p_ID_lab INT,
    IN p_AdminLevel INT
) BEGIN
INSERT INTO
    userlab (AdminLevel, ID_usuario, ID_lab)
VALUES
    (p_AdminLevel, p_ID_usuario, p_ID_lab);

END $$ DELIMITER;

-- O==============================================================O --
-- Desrelacionar usuário com laboratório
DROP PROCEDURE IF EXISTS UnrelateUserLab;

DELIMITER $$
CREATE PROCEDURE UnrelateUserLab (IN p_ID_usuario INT, IN p_ID_lab INT) BEGIN
DELETE FROM userlab
WHERE
    ID_usuario = p_ID_usuario
    AND ID_lab = p_ID_lab;

END $$ DELIMITER;

-- O==============================================================O --
-- O===============================O
/*
#
|   O=========================O
|   |    Write - Inventory    |
|   O=========================O
#
#    Procedures:
|    - [x] CreateElement
|    - [x] DeleteElement
|    - [x] CreateEquipment
|    - [x] DeleteEquipment
#    
 */
-- O===============================O
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
    IN p_Validade BIGINT,
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
        FROM_UNIXTIME(p_Validade),
        p_SupervisorLevel,
        p_ID_lab
    );

END $$ DELIMITER;

-- O==============================================================O --
-- Deletar elemento
DROP PROCEDURE IF EXISTS DeleteElement;

DELIMITER $$
CREATE PROCEDURE DeleteElement (IN p_ID_elem INT) BEGIN
DELETE FROM reserva_elemento
WHERE
    ID_elem = p_ID_elem;

DELETE FROM elementos
WHERE
    ID_elem = p_ID_elem;

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
-- Deletar equipamento
DROP PROCEDURE IF EXISTS DeleteEquipment;

DELIMITER $$
CREATE PROCEDURE DeleteEquipment (IN p_ID_equip INT) BEGIN
DELETE FROM reserva_equipamento
WHERE
    ID_equip = p_ID_equip;

DELETE FROM equipamentos
WHERE
    ID_equip = p_ID_equip;

END $$ DELIMITER;

-- O==============================================================O --
-- O===============================O
/*
#
|   O=======================O
|   |    Write - Session    |
|   O=======================O
#
#    Procedures:
|    - [x] CreateSession
|    - [x] ReserveElement
|    - [x] ReserveEquipment
|    - [x] DeleteSession
|    - [x] UnreserveElement
|    - [x] UnreserveEquipment
#    
 */
-- O===============================O
-- Criar horário
DROP PROCEDURE IF EXISTS CreateSession;

DELIMITER $$
CREATE PROCEDURE CreateSession (
    IN p_Inicio BIGINT,
    IN p_Fim BIGINT,
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
    (
        FROM_UNIXTIME(p_Inicio),
        FROM_UNIXTIME(p_Fim),
        FALSE,
        FALSE,
        p_ID_lab,
        p_ID_usuario
    );

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
-- Deletar Horário
DROP PROCEDURE IF EXISTS DeleteSession;

DELIMITER $$
CREATE PROCEDURE DeleteSession (IN p_ID_hor INT) BEGIN
-- Atualizar quantidade disponível:
-- Elementos
UPDATE elementos e
JOIN reserva_elemento re ON e.ID_elem = re.ID_elem
SET
    e.Quantidade = e.Quantidade + re.Quantidade
WHERE
    re.ID_hor = p_ID_hor;

-- Equipamentos
UPDATE equipamentos eq
JOIN reserva_equipamento rq ON eq.ID_equip = rq.ID_equip
SET
    eq.QuantidadeDisponivel = eq.QuantidadeDisponivel + rq.Quantidade
WHERE
    rq.ID_hor = p_ID_hor;

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
-- Desreservar elemento
DROP PROCEDURE IF EXISTS UnreserveElement;

DELIMITER $$
CREATE PROCEDURE UnreserveElement (IN p_ID_elem INT, IN p_ID_hor INT) BEGIN
-- Atualizar quantidade disponível
UPDATE elementos
SET
    Quantidade = Quantidade + (
        SELECT
            Quantidade
        FROM
            reserva_elemento
        WHERE
            ID_elem = p_ID_elem
            AND ID_hor = p_ID_hor
    )
WHERE
    ID_elem = p_ID_elem;

DELETE FROM reserva_elemento
WHERE
    ID_elem = p_ID_elem
    AND ID_hor = p_ID_hor;

END $$ DELIMITER;

-- O==============================================================O --
-- Desreservar equipamento
DROP PROCEDURE IF EXISTS UnreserveEquipment;

DELIMITER $$
CREATE PROCEDURE UnreserveEquipment (IN p_ID_equip INT, IN p_ID_hor INT) BEGIN
-- Atualizar quantidade disponível
UPDATE equipamentos
SET
    QuantidadeDisponivel = QuantidadeDisponivel + (
        SELECT
            Quantidade
        FROM
            reserva_equipamento
        WHERE
            ID_equip = p_ID_equip
            AND ID_hor = p_ID_hor
    )
WHERE
    ID_equip = p_ID_equip;

DELETE FROM reserva_equipamento
WHERE
    ID_equip = p_ID_equip
    AND ID_hor = p_ID_hor;

END $$ DELIMITER;

-- O==============================================================O --