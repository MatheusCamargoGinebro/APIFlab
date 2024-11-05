DROP DATABASE IF EXISTS iflab;

CREATE DATABASE IF NOT EXISTS iflab;

USE iflab;

-- =========================================== Informações do instituto ===========================================
CREATE TABLE IF NOT EXISTS
    campus (
        -- PK
        ID_campus INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_campus),
        --
        -- values
        Nome VARCHAR(128) NOT NULL,
        Estado VARCHAR(2) NOT NULL
    );

-- =========================================== Informações do usuário ===========================================
CREATE TABLE IF NOT EXISTS
    usuarios (
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
CREATE TABLE IF NOT EXISTS
    laboratorios (
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

CREATE TABLE IF NOT EXISTS
    userlab (
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
CREATE TABLE IF NOT EXISTS
    Horarios (
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
CREATE TABLE IF NOT EXISTS
    Elementos (
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

CREATE TABLE IF NOT EXISTS
    Reserva_elemento (
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
CREATE TABLE IF NOT EXISTS
    Equipamentos (
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

CREATE TABLE IF NOT EXISTS
    Reserva_equipamento (
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
CREATE TABLE IF NOT EXISTS
    email_codes (
        -- PK
        ID_email INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (ID_email),
        -- values
        Email VARCHAR(256) NOT NULL,
        Checkcode VARCHAR(5) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    blacklist (
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

INSERT INTO
    elementos (
        Nome,
        Quantidade,
        Descricao,
        Peso_molecular,
        Num_cas,
        Num_ec,
        EstadoFisico,
        Validade,
        SupervisorLevel,
        ID_lab
    )
VALUES
    (
        'Ácido Clorídrico',
        1000,
        'Ácido Clorídrico é uma solução aquosa de cloreto de hidrogênio (HCl). É um líquido incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas. É um dos ácidos mais fortes que existem, sendo capaz de corroer metais e tecidos vivos.',
        36.46,
        '7647-01-0',
        '231-595-7',
        1,
        '2022-12-31',
        1,
        1
    ),
    (
        'Ácido Sulfúrico',
        1000,
        'Ácido Sulfúrico é um ácido mineral forte. É solúvel em água em todas as concentrações. É um líquido viscoso, incolor, inodoro e altamente corrosivo. É um ácido forte, capaz de corroer metais, tecidos vivos e muitos outros materiais.',
        98.08,
        '7664-93-9',
        '231-639-5',
        1,
        '2022-12-31',
        1,
        1
    ),
    (
        'Ácido Nítrico',
        1000,
        'Ácido Nítrico é um ácido mineral forte. É um líquido incolor, altamente corrosivo e tóxico. É um ácido forte, capaz de corroer metais, tecidos vivos e muitos outros materiais.',
        63.01,
        '7697-37-2',
        '231-714-2',
        1,
        '2022-12-31',
        1,
        1
    ),
    (
        'Ácido Fórmico',
        1000,
        'Ácido Fórmico é um ácido orgânico fraco. É um líquido incolor, altamente corrosivo e tóxico. É um ácido fraco, capaz de corroer metais, tecidos vivos e muitos outros materiais.',
        46.03,
        '64-18-6',
        '200-579-1',
        1,
        '2022-12-31',
        1,
        1
    );

INSERT INTO
    equipamentos (
        Nome,
        Descricao,
        QuantidadeTotal,
        QuantidadeDisponivel,
        Qualidade,
        SupervisorLevel,
        ID_lab
    )
VALUES
    (
        'Balança Analítica',
        'Balança analítica é um equipamento de medição de massa de alta precisão. É utilizada em laboratórios de química, física e biologia para pesar substâncias em pequenas quantidades.',
        10,
        10,
        5,
        0,
        1
    ),
    (
        'Bureta',
        'Bureta é um equipamento de laboratório utilizado para medir volumes de líquidos com precisão. É um tubo de vidro graduado, com uma torneira na parte inferior, que permite a liberação controlada do líquido.',
        10,
        10,
        5,
        0,
        1
    ),
    (
        'Mufla',
        'Mufla é um equipamento de laboratório utilizado para aquecer substâncias a altas temperaturas. É um forno elétrico, com resistências internas, que permite a queima de materiais em altas temperaturas.',
        10,
        10,
        5,
        0,
        1
    ),
    (
        'Estufa',
        'Estufa é um equipamento de laboratório utilizado para secar e esterilizar materiais. É um forno elétrico, com resistências internas, que permite a secagem de materiais a baixas temperaturas.',
        10,
        10,
        5,
        0,
        1
    );

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
        '2022-12-31 08:00:00',
        '2022-12-31 12:00:00',
        0,
        0,
        1,
        1
    ),
    (
        '2022-12-31 08:00:00',
        '2022-12-31 12:00:00',
        0,
        0,
        1,
        2
    ),
    (
        '2022-12-31 08:00:00',
        '2022-12-31 12:00:00',
        0,
        0,
        1,
        3
    ),
    (
        '2022-12-31 08:00:00',
        '2022-12-31 12:00:00',
        0,
        0,
        2,
        1
    ),
    (
        '2022-12-31 08:00:00',
        '2022-12-31 12:00:00',
        0,
        0,
        2,
        2
    ),
    (
        '2022-12-31 08:00:00',
        '2022-12-31 12:00:00',
        0,
        0,
        2,
        3
    );

INSERT INTO
    reserva_elemento (Quantidade, ID_elem, ID_hor)
VALUES
    (100, 1, 1),
    (100, 2, 2),
    (100, 3, 3),
    (100, 4, 4);

INSERT INTO
    reserva_equipamento (Quantidade, ID_equip, ID_hor)
VALUES
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3),
    (1, 4, 4);