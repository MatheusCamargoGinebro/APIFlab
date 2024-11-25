-- =========================================== DATABASE iflab ===========================================

DROP DATABASE IF EXISTS iflab;

CREATE DATABASE IF NOT EXISTS iflab;

USE iflab;

-- =========================================== Informações do instituto ===========================================
CREATE TABLE
    IF NOT EXISTS campus (
        -- PK
        ID_campus INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_campus),
        --
        -- values
        Nome VARCHAR(128) NOT NULL,
        Estado VARCHAR(2) NOT NULL
    );

-- =========================================== Informações do usuário ===========================================
CREATE TABLE
    IF NOT EXISTS usuarios (
        -- PK
        ID_usuario INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_usuario),
        --
        -- values
        Nome VARCHAR(128) NOT NULL,
        Email VARCHAR(256) NOT NULL,
        Senha VARCHAR(60) NOT NULL,
        Salt VARCHAR(60) NOT NULL,
        profilePic LONGTEXT,
        --
        -- Controle de acesso:
        Tipo INT CHECK (Tipo IN (1, 2, 3)),
        -- 1 = Aluno
        -- 2 = Professor
        -- 3 = Outro
        CampusAdminLevel INT CHECK (CampusAdminLevel IN (1, 2, 3)) NOT NULL,
        -- 1 = Membro
        -- 2 = Pode adicionar labs
        -- 3 = Responsável (pode editar, adicionar e remover admins)
        --
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
        --
        -- Values
        Sala varchar(16),
        Capacidade INT NOT NULL,
        --
        -- FK
        ID_campus INT NOT NULL,
        FOREIGN KEY (ID_campus) REFERENCES campus (ID_campus)
    );

CREATE TABLE
    IF NOT EXISTS userlab (
        -- PK
        ID_relation INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_relation),
        --
        -- Valores de controle de acesso:
        AdminLevel INT CHECK (AdminLevel IN (1, 2, 3)) NOT NULL,
        -- 1 = Membro
        -- 2 = Pode adicionar elementos, equipamentos e reservas
        -- 3 = Responsável (pode editar)
        --
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
        --
        -- values
        Inicio TIMESTAMP NOT NULL,
        Fim TIMESTAMP NOT NULL,
        --
        -- Valores de controle:
        Finished BOOLEAN NOT NULL DEFAULT FALSE,
        Started BOOLEAN NOT NULL DEFAULT FALSE,
        --
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
        --
        -- values
        Nome VARCHAR(128) NOT NULL,
        Quantidade DECIMAL(10, 3) NOT NULL,
        Descricao TEXT,
        Peso_molecular DECIMAL(10, 3) NOT NULL,
        Num_cas VARCHAR(32) NOT NULL,
        Num_ec VARCHAR(32) NOT NULL,
        EstadoFisico INT CHECK (EstadoFisico IN (1, 2, 3)),
        Imagem LONGTEXT,
        Validade DATE NOT NULL,
        --
        -- Valores de controle:
        SupervisorLevel INT CHECK (SupervisorLevel IN (0, 1, 2)) NOT NULL,
        -- 0 = Normal
        -- 1 = Supervisionado pela Polícia Federal
        -- 2 = Supervisionado pelo Exército
        --
        -- FK
        ID_lab INT NOT NULL,
        FOREIGN KEY (ID_lab) REFERENCES laboratorios (ID_lab)
    );

CREATE TABLE
    IF NOT EXISTS Reserva_elemento (
        -- PK
        ID_reslem INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_reslem),
        --
        -- values
        Quantidade DECIMAL(10, 3) NOT NULL,
        --
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
        --
        -- values
        Nome VARCHAR(128) NOT NULL,
        Descricao TEXT NOT NULL,
        QuantidadeTotal INT,
        QuantidadeDisponivel INT,
        Qualidade INT CHECK (Qualidade IN (0, 1, 2, 3, 4, 5)),
        Imagem LONGTEXT,
        --
        -- Valores de controle:
        SupervisorLevel INT CHECK (SupervisorLevel IN (0, 1, 2)) NOT NULL,
        -- 0 = Normal
        -- 1 = Supervisionado pela Polícia Federal
        -- 2 = Supervisionado pelo Exército
        --
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