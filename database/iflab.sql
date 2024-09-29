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
        Telefone CHAR(11),
        Email VARCHAR(256) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS endereco (
        -- PK
        ID_endereco INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_endereco),
        -- values
        numero INT NOT NULL,
        rua VARCHAR(128) NOT NULL,
        complemento VARCHAR(128),
        bairro VARCHAR(128) NOT NULL,
        cidade VARCHAR(128) NOT NULL,
        Estado CHAR(2) NOT NULL,
        CEP CHAR(9) NOT NULL,
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
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
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
    );

CREATE TABLE
    IF NOT EXISTS adminusuarioCampus (
        -- PK
        ID_relation INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_relation),
        -- FK
        ID_Responsavel INT NOT NULL,
        FOREIGN KEY (ID_Responsavel) REFERENCES usuarios (ID_usuario),
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
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
    );

CREATE TABLE
    IF NOT EXISTS adminusuarioLab (
        -- PK
        ID_relation INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_relation),
        -- values
        AdminLevel INT CHECK (AdminLevel IN (1, 2)) NOT NULL,
        -- 1 = Membro
        -- 2 = Responsável
        -- FK
        -- FK
        ID_Responsavel INT NOT NULL,
        FOREIGN KEY (ID_Responsavel) REFERENCES usuarios (ID_usuario),
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
        Inicio TIMESTAMP NOT NULL,
        Fim TIMESTAMP NOT NULL,
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
        Peso_molecular DECIMAL(10, 3) NOT NULL,
        numero_cas VARCHAR(32) NOT NULL UNIQUE,
        numero_ec VARCHAR(32) NOT NULL UNIQUE,
        estado_fisico INT CHECK (estado_fisico IN (1, 2, 3)),
        imagem LONGTEXT,
        -- Image
        image LONGTEXT,
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

-- INSERTS de para futuros testes com a API:
INSERT INTO
    campus (Nome, Telefone, Email)
VALUES
    ('Campus 1', '123456789', 'camp@camp1.com.br'),
    ('Campus 2', '987654321', 'camp@camp2.com.br'),
    ('Campus 3', '123456789', 'camp@camp3.com.br');

INSERT INTO
    endereco (
        numero,
        rua,
        complemento,
        bairro,
        cidade,
        Estado,
        CEP,
        ID_campus
    )
VALUES
    (
        123,
        'Rua 1',
        'Complemento 1',
        'Bairro 1',
        'Cidade 1',
        'SP',
        '12345-678',
        1
    ),
    (
        456,
        'Rua 2',
        'Complemento 2',
        'Bairro 2',
        'Cidade 2',
        'SP',
        '12345-678',
        2
    ),
    (
        789,
        'Rua 3',
        'Complemento 3',
        'Bairro 3',
        'Cidade 3',
        'SP',
        '12345-678',
        3
    );

INSERT INTO
    usuarios (
        Nome,
        Email,
        Senha,
        Salt,
        profilePic,
        Tipo,
        ID_campus
    )
VALUES
    (
        'Usuario 1',
        'user.1@ifsp.edu.br',
        '123456',
        '123456',
        'profilePic1',
        2,
        1
    ),
    (
        'Usuario 2',
        'user.2@aluno.ifsp.edu.br',
        '123456',
        '123456',
        'profilePic2',
        1,
        2
    ),
    (
        'Usuario 3',
        'user.3@ifsp.edu.br',
        '123456',
        '123456',
        'profilePic3',
        3,
        3
    ),
    (
        'Usuario 4',
        'user.4@ifsp.edu.br',
        '123456',
        '123456',
        'profilePic4',
        2,
        1
    );

INSERT INTO
    adminusuarioCampus (ID_Responsavel, ID_campus)
VALUES
    (1, 1),
    (3, 2),
    (4, 3);

INSERT INTO
    laboratorios (Sala, ID_campus)
VALUES
    ('Sala 1', 1),
    ('Sala 2', 2),
    ('Sala 3', 3);

INSERT INTO
    adminusuarioLab (AdminLevel, ID_Responsavel, ID_lab)
VALUES
    (2, 1, 1),
    (1, 3, 2),
    (2, 4, 3);

INSERT INTO
    Elementos (
        Nome,
        Quantidade,
        Peso_molecular,
        numero_cas,
        numero_ec,
        estado_fisico,
        imagem,
        ID_lab
    )
VALUES
    (
        'Elemento 1',
        100,
        1.0,
        '123-45-671',
        '123-45-671',
        1,
        'imagem1',
        1
    ),
    (
        'Elemento 2',
        200,
        2.0,
        '123-45-672',
        '123-45-672',
        2,
        'imagem2',
        2
    ),
    (
        'Elemento 3',
        300,
        3.0,
        '123-45-673',
        '123-45-673',
        3,
        'imagem3',
        3
    ),
    (
        'Elemento 4',
        400,
        4.0,
        '123-45-674',
        '123-45-674',
        1,
        'imagem4',
        1
    ),
    (
        'Elemento 5',
        500,
        5.0,
        '123-45-675',
        '123-45-675',
        2,
        'imagem5',
        2
    ),
    (
        'Elemento 6',
        600,
        6.0,
        '123-45-676',
        '123-45-676',
        3,
        'imagem6',
        3
    ),
    (
        'Elemento 7',
        700,
        7.0,
        '123-45-677',
        '123-45-677',
        1,
        'imagem7',
        1
    ),
    (
        'Elemento 8',
        800,
        8.0,
        '123-45-678',
        '123-45-678',
        2,
        'imagem8',
        2
    ),
    (
        'Elemento 9',
        900,
        9.0,
        '123-45-679',
        '123-45-679',
        3,
        'imagem9',
        3
    );

INSERT INTO
    Equipamentos (
        Nome,
        Descricao,
        QuantidadeTotal,
        QuantidadeDisponivel,
        Qualidade,
        Imagem,
        ID_lab
    )
VALUES
    (
        'Equipamento 1',
        'Descricao 1',
        10,
        10,
        1,
        'imagem1',
        1
    ),
    (
        'Equipamento 2',
        'Descricao 2',
        20,
        20,
        2,
        'imagem2',
        2
    ),
    (
        'Equipamento 3',
        'Descricao 3',
        30,
        30,
        3,
        'imagem3',
        3
    ),
    (
        'Equipamento 4',
        'Descricao 4',
        40,
        40,
        4,
        'imagem4',
        1
    ),
    (
        'Equipamento 5',
        'Descricao 5',
        50,
        50,
        5,
        'imagem5',
        2
    ),
    (
        'Equipamento 6',
        'Descricao 6',
        60,
        60,
        1,
        'imagem6',
        3
    ),
    (
        'Equipamento 7',
        'Descricao 7',
        70,
        70,
        2,
        'imagem7',
        1
    ),
    (
        'Equipamento 8',
        'Descricao 8',
        80,
        80,
        3,
        'imagem8',
        2
    ),
    (
        'Equipamento 9',
        'Descricao 9',
        90,
        90,
        4,
        'imagem9',
        3
    );

INSERT INTO
    Horarios (Tipo, Inicio, Fim, ID_lab, ID_usuario)
VALUES
    (
        1,
        '2021-01-01 08:00:00',
        '2021-01-01 12:00:00',
        1,
        1
    ),
    (
        2,
        '2021-01-01 13:00:00',
        '2021-01-01 17:00:00',
        2,
        2
    ),
    (
        1,
        '2021-01-01 08:00:00',
        '2021-01-01 12:00:00',
        3,
        3
    ),
    (
        2,
        '2021-01-01 13:00:00',
        '2021-01-01 17:00:00',
        1,
        4
    ),
    (
        1,
        '2021-01-01 08:00:00',
        '2021-01-01 12:00:00',
        2,
        1
    ),
    (
        2,
        '2021-01-01 13:00:00',
        '2021-01-01 17:00:00',
        3,
        2
    ),
    (
        1,
        '2021-01-01 08:00:00',
        '2021-01-01 12:00:00',
        1,
        3
    ),
    (
        2,
        '2021-01-01 13:00:00',
        '2021-01-01 17:00:00',
        2,
        4
    ),
    (
        1,
        '2021-01-01 08:00:00',
        '2021-01-01 12:00:00',
        3,
        1
    ),
    (
        2,
        '2021-01-01 13:00:00',
        '2021-01-01 17:00:00',
        1,
        2
    );

INSERT INTO
    Reserva_elemento (Quantidade, ID_elem, ID_hor)
VALUES
    (10, 1, 1),
    (20, 2, 2),
    (30, 3, 3),
    (40, 4, 4),
    (50, 5, 5),
    (60, 6, 6),
    (70, 7, 7),
    (80, 8, 8),
    (90, 9, 9),
    (100, 1, 10);

INSERT INTO
    Reserva_equipamento (Quantidade, ID_equip, ID_hor)
VALUES
    (10, 1, 1),
    (20, 2, 2),
    (30, 3, 3),
    (40, 4, 4),
    (50, 5, 5),
    (60, 6, 6),
    (70, 7, 7),
    (80, 8, 8),
    (90, 9, 9),
    (100, 1, 10);


-- =========================================== Email Confirmation Code ===========================================

CREATE TABLE
    IF NOT EXISTS email_codes (
        -- PK
        ID_email INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_email),
        -- values
        Email VARCHAR(256) NOT NULL,
        Checkcode VARCHAR(60) NOT NULL
    );