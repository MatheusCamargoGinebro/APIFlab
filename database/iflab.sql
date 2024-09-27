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
        Senha VARCHAR(64) NOT NULL,
        profilePic LONGTEXT,
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
        AdminLevel INT CHECK (AdminLevel IN (1, 2)) NOT NULL,
        -- 1 = Membro
        -- 2 = Responsável
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
    );

CREATE TABLE
    IF NOT EXISTS adminusuarioLab (
        -- PK
        ID_relation INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_relation),
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
-- Toda vez que uma reserva é feita, subtrai-se a quantidade reservada da quantidade disponível:
-- Elemento:
DELIMITER $$
CREATE TRIGGER decrementa_elemento AFTER INSERT ON Reserva_elemento
FOR EACH ROW
BEGIN
    UPDATE Elementos
    SET Quantidade = Quantidade - NEW.Quantidade
    WHERE ID_elem = NEW.ID_elem;
END;

-- Equipamento:
DELIMITER $$
CREATE TRIGGER decrementa_equipamento AFTER INSERT ON Reserva_equipamento
FOR EACH ROW
BEGIN
    UPDATE Equipamentos
    SET QuantidadeDisponivel = QuantidadeDisponivel - NEW.Quantidade
    WHERE ID_equip = NEW.ID_equip;
END;



-- INSERTS de para futuros testes com a API:
INSERT INTO
    campus (Nome, Telefone, Email)
VALUES
    (
        'Campus 1',
        '123456789',
        'campus1@camp1.ifsp.edu.br'
    );

INSERT INTO
    endereco (
        numero,
        rua,
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
        'Bairro 1',
        'Cidade 1',
        'SP',
        '12345-678',
        1
    );

INSERT INTO
    usuarios (Nome, Email, Senha, ID_campus)
VALUES
    ('User 1', 'prof1@ifsp.edu.br', '123456', 1),
    ('User 2', 'prof2@ifsp.edu.br', '123456', 1),
    ('User 3', 'prof3@ifsp.edu.br', '123456', 1),
    ('User 4', 'prof4@ifsp.edu.br', '123456', 1);

INSERT INTO
    adminusuarioCampus (ID_Responsavel, ID_campus)
VALUES
    (1, 1);

INSERT INTO
    laboratorios (Sala, ID_campus)
VALUES
    ('Sala A101', 1);

INSERT INTO
    adminusuarioLab (ID_Responsavel, ID_lab)
VALUES
    (1, 1),
    (2, 1);

INSERT INTO
    Elementos (Nome, Quantidade, Peso_molecular, numero_cas, numero_ec, estado_fisico, ID_lab)
VALUES
    ('Elemento 1', 100.0, 100.0, '123456-78-9', '123456-78-9', 1, 1),
    ('Elemento 2', 100.0, 100.0, '223456-78-9', '223456-78-9', 2, 1),
    ('Elemento 3', 100.0, 100.0, '323456-78-9', '323456-78-9', 3, 1),
    ('Elemento 4', 100.0, 100.0, '423456-78-9', '423456-78-9', 1, 1);

INSERT INTO
    Equipamentos (Nome, Descricao, QuantidadeTotal, QuantidadeDisponivel, Qualidade, ID_lab)
VALUES
    ('Equipamento 1', 'Descrição 1', 10, 10, 5, 1),
    ('Equipamento 2', 'Descrição 2', 10, 10, 5, 1),
    ('Equipamento 3', 'Descrição 3', 10, 10, 5, 1),
    ('Equipamento 4', 'Descrição 4', 10, 10, 5, 1);


INSERT INTO
    Horarios (Tipo, Inicio, Fim, ID_lab, ID_usuario)
VALUES
    (1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 1, 1),
    (2, '2021-06-01 14:00:00', '2021-06-01 18:00:00', 1, 2),
    (1, '2021-06-02 08:00:00', '2021-06-02 12:00:00', 1, 3),
    (2, '2021-06-02 14:00:00', '2021-06-02 18:00:00', 1, 4);

INSERT INTO
    Reserva_elemento (Quantidade, ID_elem, ID_hor)
VALUES
    (10.0, 1, 1),
    (10.0, 2, 2),
    (10.0, 3, 3),
    (10.0, 4, 4);

INSERT INTO
    Reserva_equipamento (Quantidade, ID_equip, ID_hor)
VALUES
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3),
    (1, 4, 4);