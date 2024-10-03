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
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
    );

CREATE TABLE
    IF NOT EXISTS userCampus (
        -- PK
        ID_relation INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_relation),
        -- values
        AdminLevel INT CHECK (AdminLevel IN (1, 2, 3)) NOT NULL,
        -- 1 = Membro
        -- 2 = Pode adicionar labs
        -- 3 = Responsável (pode editar)
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
INSERT INTO campus (Nome, Estado) VALUES 
('Campus 1', 'SP');

INSERT INTO usuarios (Nome, Email, Senha, Salt, Tipo, ID_campus) VALUES 
('Aluno 1', 'aluno1@aluno.ifsp.edu.br', '123456', '123456', 1, 1),
('Aluno 2', 'aluno2@aluno.ifsp.edu.br', '123456', '123456', 1, 1),
('Aluno 3', 'aluno3@aluno.ifsp.edu.br', '123456', '123456', 1, 1),
('Professor 1', 'professor1@ifsp.edu.br', '123456', '123456', 2, 1),
('Professor 2', 'professor2@ifsp.edu.br', '123456', '123456', 2, 1);

INSERT INTO userCampus (AdminLevel, ID_Responsavel, ID_campus) VALUES 
(2, 4, 1),
(2, 5, 1);

INSERT INTO laboratorios (Sala, ID_campus) VALUES 
('Sala 1', 1),
('Sala 2', 1),
('Sala 3', 1);

INSERT INTO userLab (AdminLevel, ID_Responsavel, ID_lab) VALUES 
(2, 4, 1),
(2, 5, 2),
(2, 4, 3);

INSERT INTO Elementos (Nome, Quantidade, Peso_molecular, numero_cas, numero_ec, estado_fisico, ID_lab) VALUES 
('Elemento 1', 100, 100, '123451', '123451', 1, 1),
('Elemento 2', 100, 100, '123452', '123452', 1, 1),
('Elemento 3', 100, 100, '123453', '123453', 1, 1),
('Elemento 4', 100, 100, '123454', '123454', 1, 1),
('Elemento 5', 100, 100, '123455', '123455', 1, 1),
('Elemento 6', 100, 100, '123456', '123456', 1, 2),
('Elemento 7', 100, 100, '123457', '123457', 1, 2),
('Elemento 8', 100, 100, '123458', '123458', 1, 2),
('Elemento 9', 100, 100, '123459', '123459', 1, 2),
('Elemento 10', 100, 100, '123410', '123410', 1, 2),
('Elemento 11', 100, 100, '123411', '123411', 1, 3),
('Elemento 12', 100, 100, '123412', '123412', 1, 3),
('Elemento 13', 100, 100, '123413', '123413', 1, 3),
('Elemento 14', 100, 100, '123414', '123414', 1, 3),
('Elemento 15', 100, 100, '123415', '123415', 1, 3);

INSERT INTO Equipamentos (Nome, Descricao, QuantidadeTotal, QuantidadeDisponivel, Qualidade, ID_lab) VALUES 
('Equipamento 1', 'Equipamento 1', 10, 10, 5, 1),
('Equipamento 2', 'Equipamento 2', 10, 10, 5, 1),
('Equipamento 3', 'Equipamento 3', 10, 10, 5, 1),
('Equipamento 4', 'Equipamento 4', 10, 10, 5, 1),
('Equipamento 5', 'Equipamento 5', 10, 10, 5, 1),
('Equipamento 6', 'Equipamento 6', 10, 10, 5, 2),
('Equipamento 7', 'Equipamento 7', 10, 10, 5, 2),
('Equipamento 8', 'Equipamento 8', 10, 10, 5, 2),
('Equipamento 9', 'Equipamento 9', 10, 10, 5, 2),
('Equipamento 10', 'Equipamento 10', 10, 10, 5, 2),
('Equipamento 11', 'Equipamento 11', 10, 10, 5, 3),
('Equipamento 12', 'Equipamento 12', 10, 10, 5, 3),
('Equipamento 13', 'Equipamento 13', 10, 10, 5, 3),
('Equipamento 14', 'Equipamento 14', 10, 10, 5, 3),
('Equipamento 15', 'Equipamento 15', 10, 10, 5, 3);

INSERT INTO Horarios (Tipo, Inicio, Fim, ID_lab, ID_usuario) VALUES 
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 1, 1),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 1, 2),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 1, 3),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 1, 4),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 1, 5),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 2, 1),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 2, 2),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 2, 3),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 2, 4),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 2, 5),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 3, 1),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 3, 2),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 3, 3),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 3, 4),
(1, '2021-06-01 08:00:00', '2021-06-01 12:00:00', 3, 5);

INSERT INTO Reserva_elemento (Quantidade, ID_elem, ID_hor) VALUES 
(10, 1, 1),
(10, 2, 2),
(10, 3, 3),
(10, 4, 4),
(10, 5, 5),
(10, 6, 6),
(10, 7, 7),
(10, 8, 8),
(10, 9, 9),
(10, 10, 10),
(10, 11, 11),
(10, 12, 12),
(10, 13, 13),
(10, 14, 14),
(10, 15, 15);

INSERT INTO Reserva_equipamento (Quantidade, ID_equip, ID_hor) VALUES 
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(1, 4, 4),
(1, 5, 5),
(1, 6, 6),
(1, 7, 7),
(1, 8, 8),
(1, 9, 9),
(1, 10, 10),
(1, 11, 11),
(1, 12, 12),
(1, 13, 13),
(1, 14, 14),
(1, 15, 15);


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