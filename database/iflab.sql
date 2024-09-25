DROP DATABASE IF EXISTS iflab;

CREATE DATABASE IF NOT EXISTS iflab;

USE iflab;

CREATE TABLE IF NOT EXISTS institutos (
	-- PK
    ID_inst INT NOT NULL,
    PRIMARY KEY (ID_inst),
    
    -- values
    Nome VARCHAR(128) NOT NULL,
    Regiao CHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	-- PK
    ID_user INT NOT NULL,
    PRIMARY KEY (ID_user),
    
    -- values
    Nome VARCHAR(128) NOT NULL,
    Email VARCHAR(256) NOT NULL,
    Senha VARCHAR(64) NOT NULL,
    Cargo INT CHECK (Cargo IN (1, 2, 3)),
    
    -- FK
    ID_inst INT NOT NULL,
    FOREIGN KEY (ID_inst) REFERENCES institutos(ID_inst)
);

CREATE TABLE IF NOT EXISTS labs (
	-- PK
    ID_lab INT NOT NULL,
    PRIMARY KEY (ID_lab),
    
    -- Values
    Sala varchar(16),
    
    -- FK
    ID_inst INT NOT NULL,
    FOREIGN KEY (ID_inst) REFERENCES institutos(ID_inst)
);

CREATE TABLE IF NOT EXISTS Elementos (
	-- PK
    ID_elem INT NOT NULL,
    PRIMARY KEY (ID_elem),
    
    -- values
    Nome VARCHAR(128) NOT NULL,
    Quantidade DECIMAL(10,3) NOT NULL,
    Peso_molecular DECIMAL(10,3) NOT NULL,
    numero_cas VARCHAR(32) NOT NULL UNIQUE,
    numero_ec VARCHAR(32) NOT NULL UNIQUE,
    estado_fisico INT CHECK (estado_fisico IN (1, 2, 3)),
    image LONGTEXT NOT NULL,
    
    -- FK
    ID_lab INT NOT NULL,
    FOREIGN KEY (ID_lab) REFERENCES labs(ID_lab)
);


CREATE TABLE IF NOT EXISTS Equipamentos(
	-- PK
    ID_equip INT NOT NULL,
    PRIMARY KEY (ID_equip),
    
    -- values
    Nome VARCHAR(128) NOT NULL,
    Descricao TEXT NOT NULL,
    Quantidade INT NOT NULL,
    
	-- FK
    ID_lab INT NOT NULL,
    FOREIGN KEY (ID_lab) REFERENCES labs(ID_lab)
);

CREATE TABLE IF NOT EXISTS Horarios (
	-- PK
    ID_hor INT NOT NULL,
    PRIMARY KEY (ID_hor),
    
    -- values
    Tipo INT CHECK (Tipo IN (1, 2)),
    Inicio DATE NOT NULL,
    Fim DATE NOT NULL,
    
	-- FK
    ID_lab INT NOT NULL,
    FOREIGN KEY (ID_lab) REFERENCES labs(ID_lab),
    ID_user INT NOT NULL,
    FOREIGN KEY (ID_user) REFERENCES users(ID_user)
);

CREATE TABLE IF NOT EXISTS Reserva_equipamento (
	-- PK
    ID_resequip INT NOT NULL,
    PRIMARY KEY (ID_resequip),
    
    -- FK
    ID_equip INT NOT NULL,
    FOREIGN KEY (ID_equip) REFERENCES Equipamentos(ID_equip),
    ID_hor INT NOT NULL,
    FOREIGN KEY (ID_hor) REFERENCES Horarios(ID_hor)
);

CREATE TABLE IF NOT EXISTS Reserva_elemento (
	-- PK
    ID_reslem INT NOT NULL,
    PRIMARY KEY (ID_reslem),
    
    -- FK
    ID_elem INT NOT NULL,
    FOREIGN KEY (ID_elem) REFERENCES Elementos(ID_elem),
    ID_hor INT NOT NULL,
    FOREIGN KEY (ID_hor) REFERENCES Horarios(ID_hor)
);