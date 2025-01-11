-- =========================================== DATABASE iflab ===========================================
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
        Validade TIMESTAMP NOT NULL,
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

-- =========================================== INSERTS PARA TESTES ===========================================
INSERT INTO
    campus (Nome, Estado)
VALUES
    ('Campus I', 'SP'),
    ('Campus II', 'MG'),
    ('Campus III', 'RS');

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
    Elementos (
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
        'Ácido Clorídrico é uma solução aquosa de cloreto de hidrogênio (HCl). É um líquido incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        36.46,
        '7647-01-0',
        '231-595-7',
        1,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Sulfúrico',
        1000,
        'Ácido Sulfúrico é um ácido mineral forte. É solúvel em água em todas as concentrações. É um líquido viscoso, incolor, inodoro e altamente corrosivo.',
        98.08,
        '7664-93-9',
        '231-639-5',
        1,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Nítrico',
        1000,
        'Ácido Nítrico é um ácido mineral forte. É um líquido incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        63.01,
        '7697-37-2',
        '231-714-2',
        1,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Fórmico',
        1000,
        'Ácido Fórmico é um ácido orgânico. É um líquido incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        46.03,
        '64-18-6',
        '200-579-1',
        1,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Acético',
        1000,
        'Ácido Acético é um ácido orgânico. É um líquido incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        60.05,
        '64-19-7',
        '200-580-7',
        1,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Cítrico',
        1000,
        'Ácido Cítrico é um ácido orgânico. É um sólido cristalino incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        192.13,
        '77-92-9',
        '201-069-1',
        3,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Fosfórico',
        1000,
        'Ácido Fosfórico é um ácido mineral forte. É um líquido incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        98.00,
        '7664-38-2',
        '231-633-2',
        1,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Bórico',
        1000,
        'Ácido Bórico é um ácido mineral fraco. É um sólido cristalino incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        61.83,
        '10043-35-3',
        '233-139-2',
        3,
        '2021-12-31 23:59:59',
        0,
        1
    ),
    (
        'Ácido Sulfuroso',
        1000,
        'Ácido Sulfuroso é um ácido mineral fraco. É um gás incolor, altamente corrosivo e tóxico, que pode ser encontrado em concentrações variadas.',
        64.07,
        '7446-09-5',
        '231-195-2',
        2,
        '2021-12-31 23:59:59',
        0,
        1
    );

INSERT INTO
    Equipamentos (
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
        'Balança analítica é um instrumento de medição utilizado para se determinar a massa de um objeto com alta precisão.',
        10,
        10,
        5,
        0,
        1
    ),
    (
        'Balança de Precisão',
        'Balança de precisão é um instrumento de medição utilizado para se determinar a massa de um objeto com precisão.',
        10,
        10,
        4,
        0,
        1
    ),
    (
        'Balança Semi-Analítica',
        'Balança semi-analítica é um instrumento de medição utilizado para se determinar a massa de um objeto com precisão.',
        10,
        10,
        3,
        0,
        1
    ),
    (
        'Balança de Pratos',
        'Balança de pratos é um instrumento de medição utilizado para se determinar a massa de um objeto com precisão.',
        10,
        10,
        2,
        0,
        1
    ),
    (
        'Balança de Mão',
        'Balança de mão é um instrumento de medição utilizado para se determinar a massa de um objeto com precisão.',
        10,
        10,
        1,
        0,
        1
    ),
    (
        'Estufa',
        'Estufa é um equipamento utilizado para secar e esterilizar materiais.',
        10,
        10,
        5,
        0,
        1
    ),
    (
        'Mufla',
        'Mufla é um equipamento utilizado para calcinar materiais.',
        10,
        10,
        4,
        0,
        1
    ),
    (
        'Autoclave',
        'Autoclave é um equipamento utilizado para esterilizar materiais.',
        10,
        10,
        3,
        0,
        1
    ),
    (
        'Destilador',
        'Destilador é um equipamento utilizado para destilar líquidos.',
        10,
        10,
        2,
        0,
        1
    ),
    (
        'Centrífuga',
        'Centrífuga é um equipamento utilizado para separar substâncias.',
        10,
        10,
        1,
        0,
        1
    );

INSERT INTO
    Horarios (
        Inicio,
        Fim,
        Finished,
        Started,
        ID_lab,
        ID_usuario
    )
VALUES
    (
        '2021-12-31 08:00:00',
        '2021-12-31 12:00:00',
        0,
        0,
        1,
        1
    ),
    (
        '2021-12-31 14:00:00',
        '2021-12-31 18:00:00',
        0,
        0,
        1,
        1
    ),
    (
        '2021-12-31 08:00:00',
        '2021-12-31 12:00:00',
        0,
        0,
        2,
        1
    ),
    (
        '2021-12-31 14:00:00',
        '2021-12-31 18:00:00',
        0,
        0,
        2,
        1
    );

INSERT INTO
    Reserva_elemento (Quantidade, ID_elem, ID_hor)
VALUES
    (100, 1, 1),
    (100, 2, 1),
    (100, 3, 1),
    (100, 4, 1),
    (100, 5, 1),
    (100, 6, 1),
    (100, 7, 1),
    (100, 8, 1),
    (100, 9, 1);

INSERT INTO
    Reserva_equipamento (Quantidade, ID_equip, ID_hor)
VALUES
    (1, 1, 1),
    (1, 2, 1),
    (1, 3, 1),
    (1, 4, 1),
    (1, 5, 1),
    (1, 6, 1),
    (1, 7, 1),
    (1, 8, 1),
    (1, 9, 1),
    (1, 10, 1);