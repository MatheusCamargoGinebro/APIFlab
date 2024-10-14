DROP DATABASE IF EXISTS iflab;

CREATE DATABASE IF NOT EXISTS iflab;

USE iflab;

-- =========================================== Informações do instituto ===========================================
CREATE TABLE
    IF NOT EXISTS campus (
        -- PK
        ID_campus INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_campus),
        -- values
        -- Informações de contato:
        Nome VARCHAR(128) NOT NULL,
        Estado VARCHAR(2) NOT NULL
    );

-- =========================================== Informações do usuário ===========================================
CREATE TABLE
    IF NOT EXISTS usuarios (
        -- PK
        ID_usuario INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_usuario),
        -- values
        Nome VARCHAR(128) NOT NULL,
        Email VARCHAR(256) NOT NULL,
        Senha VARCHAR(60) NOT NULL,
        Salt VARCHAR(60) NOT NULL,
        profilePic LONGTEXT,
        Tipo INT CHECK (Tipo IN (1, 2, 3)),
        -- 1 = Aluno
        -- 2 = Professor
        -- 3 = Outro
        CampusAdminLevel INT CHECK (CampusAdminLevel IN (1, 2, 3)) NOT NULL,
        -- 1 = Membro
        -- 2 = Pode adicionar labs
        -- 3 = Responsável (pode editar, adicionar e remover admins)
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
    );

-- =========================================== Informações do laboratório ===========================================
CREATE TABLE
    IF NOT EXISTS laboratorios (
        -- PK
        ID_lab INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_lab),
        -- Values
        Sala varchar(16),
        Capacidade INT NOT NULL,
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
    );

CREATE TABLE
    IF NOT EXISTS userlab (
        -- PK
        ID_relation INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_relation),
        -- values
        AdminLevel INT CHECK (AdminLevel IN (1, 2, 3)) NOT NULL,
        -- 1 = Membro
        -- 2 = Pode adicionar elementos, equipamentos e reservas
        -- 3 = Responsável (pode editar)
        -- FK
        ID_usuario INT NOT NULL,
        FOREIGN KEY (ID_usuario) REFERENCES usuarios (ID_usuario),
        ID_lab INT NOT NULL,
        FOREIGN KEY (ID_lab) REFERENCES laboratorios (ID_lab)
    );

-- =========================================== Informações dos horários ===========================================
CREATE TABLE
    IF NOT EXISTS Horarios (
        -- PK
        ID_hor INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_hor),
        -- values
        Tipo INT CHECK (Tipo IN (1, 2)),
        -- 1 = Prioritário
        -- 2 = Pode ser dividido com outra reserva
        Inicio TIMESTAMP NOT NULL,
        Fim TIMESTAMP NOT NULL,
        -- Valor default: false
        Finished BOOLEAN NOT NULL DEFAULT FALSE,
        Status BOOLEAN NOT NULL,
        -- FK
        ID_lab INT NOT NULL,
        FOREIGN KEY (ID_lab) REFERENCES laboratorios (ID_lab),
        ID_usuario INT NOT NULL,
        FOREIGN KEY (ID_usuario) REFERENCES usuarios (ID_usuario)
    );

-- =========================================== Informações dos elementos ===========================================
CREATE TABLE
    IF NOT EXISTS Elementos (
        -- PK
        ID_elem INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_elem),
        -- values
        Nome VARCHAR(128) NOT NULL,
        Quantidade DECIMAL(10, 3) NOT NULL,
        Descricao TEXT NOT NULL,
        Peso_molecular DECIMAL(10, 3) NOT NULL,
        numero_cas VARCHAR(32) NOT NULL,
        numero_ec VARCHAR(32) NOT NULL,
        estado_fisico INT CHECK (estado_fisico IN (1, 2, 3)),
        imagem LONGTEXT,
        -- FK
        ID_lab INT NOT NULL,
        FOREIGN KEY (ID_lab) REFERENCES laboratorios (ID_lab)
    );

CREATE TABLE
    IF NOT EXISTS Reserva_elemento (
        -- PK
        ID_reslem INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_reslem),
        -- values
        Quantidade DECIMAL(10, 3) NOT NULL,
        -- FK
        ID_elem INT NOT NULL,
        FOREIGN KEY (ID_elem) REFERENCES Elementos (ID_elem),
        ID_hor INT NOT NULL,
        FOREIGN KEY (ID_hor) REFERENCES Horarios (ID_hor)
    );

-- =========================================== Informações dos equipamentos ===========================================
CREATE TABLE
    IF NOT EXISTS Equipamentos (
        -- PK
        ID_equip INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_equip),
        -- values
        Nome VARCHAR(128) NOT NULL,
        Descricao TEXT NOT NULL,
        QuantidadeTotal INT,
        QuantidadeDisponivel INT,
        Qualidade INT CHECK (Qualidade IN (0, 1, 2, 3, 4, 5)),
        Imagem LONGTEXT,
        -- FK
        ID_lab INT NOT NULL,
        FOREIGN KEY (ID_lab) REFERENCES laboratorios (ID_lab)
    );

CREATE TABLE
    IF NOT EXISTS Reserva_equipamento (
        -- PK
        ID_resequip INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_resequip),
        -- values
        Quantidade INT NOT NULL,
        -- FK
        ID_equip INT NOT NULL,
        FOREIGN KEY (ID_equip) REFERENCES Equipamentos (ID_equip),
        ID_hor INT NOT NULL,
        FOREIGN KEY (ID_hor) REFERENCES Horarios (ID_hor)
    );

-- ========================================= Codigos de inserção de dados com triggers ========================================= --
/*
DELIMITER $$
CREATE TRIGGER decrementa_elemento AFTER INSERT ON Reserva_elemento FOR EACH ROW BEGIN
UPDATE Elementos
SET
Quantidade = Quantidade - NEW.Quantidade
WHERE
ID_elem = NEW.ID_elem;

END;

DELIMITER $$
CREATE TRIGGER decrementa_equipamento AFTER INSERT ON Reserva_equipamento FOR EACH ROW BEGIN
UPDATE Equipamentos
SET
QuantidadeDisponivel = QuantidadeDisponivel - NEW.Quantidade
WHERE
ID_equip = NEW.ID_equip;

END;
 */
-- =========================================== Email Confirmation Code ===========================================
CREATE TABLE
    IF NOT EXISTS email_codes (
        -- PK
        ID_email INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_email),
        -- values
        Email VARCHAR(256) NOT NULL,
        Checkcode VARCHAR(5) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS blacklist (
        -- PK
        ID_blacklist INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_blacklist),
        -- values
        Token VARCHAR(256) NOT NULL
    );

-- =========================================== Inserts para facilitar a vida ===========================================
INSERT INTO
    campus (Nome, Estado)
VALUES
    ('Campus I', 'SP');

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
        'Aluno',
        'aluno@aluno.ifsp.edu.br',
        '$2a$10$e4NVh5XJUY409kv.NDwRguoH/BiF81mHi8Rxsptl1pqaUIMXqXdPO',
        '$2a$10$3zDSC07NpU.sk6DjWPUGdO6uHTX/D.eyj0vaAKVP3OluK6j.M6e2W',
        1,
        1,
        1
    ),
    (
        'Professor',
        'professor@ifsp.edu.br',
        '$2a$10$e4NVh5XJUY409kv.NDwRguoH/BiF81mHi8Rxsptl1pqaUIMXqXdPO',
        '$2a$10$3zDSC07NpU.sk6DjWPUGdO6uHTX/D.eyj0vaAKVP3OluK6j.M6e2W',
        2,
        2,
        1
    ),
    (
        'Outro',
        'admin@ifsp.edu.br',
        '$2a$10$e4NVh5XJUY409kv.NDwRguoH/BiF81mHi8Rxsptl1pqaUIMXqXdPO',
        '$2a$10$3zDSC07NpU.sk6DjWPUGdO6uHTX/D.eyj0vaAKVP3OluK6j.M6e2W',
        3,
        3,
        1
    );

INSERT INTO
    laboratorios (Sala, Capacidade, ID_campus)
VALUES
    ('Sala 1', 20, 1),
    ('Sala 2', 30, 1);

INSERT INTO
    userlab (AdminLevel, ID_usuario, ID_lab)
VALUES
    (3, 3, 1) /* Admin é usuário responsável do lab1 */,
    (3, 3, 2) /* Admin é usuário responsável do lab2 */,
    (3, 2, 1) /* Professor é usuário responsável do lab1 */,
    (2, 2, 2) /*  Professor é usuário administrador do lab2 */,
    (1, 1, 1) /* Aluno é usuário membro do lab1 */,
    (1, 1, 2) /* Aluno é usuário membro do lab2 */;