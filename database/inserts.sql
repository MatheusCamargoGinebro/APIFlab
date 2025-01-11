-- =========================================== INSERTS PARA TESTES ===========================================

/* 
    Limpando todas as tabelas:

    DELETE FROM Reserva_equipamento;
    DELETE FROM Equipamentos;
    DELETE FROM Reserva_elemento;
    DELETE FROM Elementos;
    DELETE FROM Horarios;
    DELETE FROM userlab;
    DELETE FROM laboratorios;
    DELETE FROM usuarios;
    DELETE FROM campus;

 */

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
        Imagem,
        Validade,
        SupervisorLevel,
        ID_lab
    )
VALUES
    (
        'Água Destilada',
        100.000,
        'Água purificada para experimentos.',
        18.015,
        '7732-18-5',
        'N/A',
        1,
        NULL,
        '2025-12-31',
        0,
        1
    ),
    (
        'Sódio',
        5.000,
        'Metal alcalino altamente reativo.',
        22.990,
        '7440-23-5',
        '231-132-9',
        2,
        NULL,
        '2024-12-31',
        1,
        1
    ),
    (
        'Ácido Sulfúrico',
        20.000,
        'Ácido forte usado em sínteses.',
        98.079,
        '7664-93-9',
        '231-639-5',
        3,
        NULL,
        '2025-07-01',
        2,
        2
    ),
    (
        'Etanol',
        50.000,
        'Álcool comum utilizado em experimentos.',
        46.068,
        '64-17-5',
        '200-578-6',
        1,
        NULL,
        '2025-11-30',
        0,
        1
    ),
    (
        'Cloreto de Sódio',
        200.000,
        'Sal comum usado em química.',
        58.443,
        '7647-14-5',
        '231-598-3',
        3,
        NULL,
        '2025-06-15',
        1,
        2
    ),
    (
        'Glucose',
        15.000,
        'Carboidrato simples.',
        180.156,
        '50-99-7',
        '200-075-1',
        1,
        NULL,
        '2025-10-01',
        0,
        2
    ),
    (
        'Hidróxido de Potássio',
        25.000,
        'Base forte usada em laboratórios.',
        56.106,
        '1310-58-3',
        '215-181-3',
        2,
        NULL,
        '2025-08-15',
        2,
        2
    ),
    (
        'Ácido Nítrico',
        10.000,
        'Ácido usado em sínteses e análises.',
        63.012,
        '7697-37-2',
        '231-714-2',
        3,
        NULL,
        '2025-07-01',
        2,
        1
    ),
    (
        'Cobre',
        30.000,
        'Metal usado em experimentos de condutividade.',
        63.546,
        '7440-50-8',
        '231-159-6',
        2,
        NULL,
        '2025-04-01',
        0,
        1
    ),
    (
        'Fenol',
        5.000,
        'Composto aromático usado em química.',
        94.113,
        '108-95-2',
        '203-632-7',
        1,
        NULL,
        '2025-05-20',
        1,
        2
    ),
    (
        'Benzeno',
        12.000,
        'Hidrocarboneto aromático.',
        78.113,
        '71-43-2',
        '200-753-7',
        3,
        NULL,
        '2025-09-01',
        2,
        2
    ),
    (
        'Clorofórmio',
        8.000,
        'Composto orgânico usado como solvente.',
        119.378,
        '67-66-3',
        '200-663-8',
        3,
        NULL,
        '2025-11-01',
        2,
        1
    );

INSERT INTO
    Equipamentos (
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
        'Microscópio',
        'Equipamento para análises microscópicas.',
        10,
        8,
        4,
        NULL,
        0,
        1
    ),
    (
        'Balança Analítica',
        'Balança de alta precisão.',
        5,
        3,
        5,
        NULL,
        1,
        1
    ),
    (
        'Centrífuga',
        'Centrífuga para separação de amostras.',
        3,
        3,
        5,
        NULL,
        2,
        2
    ),
    (
        'Espectrofotômetro',
        'Equipamento usado para análises espectrais.',
        4,
        2,
        4,
        NULL,
        0,
        1
    ),
    (
        'Phmetro',
        'Mede o pH de soluções.',
        7,
        5,
        3,
        NULL,
        0,
        1
    ),
    (
        'Cromatógrafo',
        'Para análises químicas avançadas.',
        2,
        1,
        5,
        NULL,
        2,
        2
    ),
    (
        'Incubadora',
        'Equipamento para cultura microbiológica.',
        6,
        4,
        4,
        NULL,
        1,
        2
    ),
    (
        'Termociclador',
        'Utilizado em PCR para DNA.',
        3,
        2,
        5,
        NULL,
        2,
        1
    ),
    (
        'Estufa',
        'Aquecimento e secagem de materiais.',
        8,
        6,
        3,
        NULL,
        0,
        1
    ),
    (
        'Autoclave',
        'Esterilização de materiais.',
        5,
        3,
        4,
        NULL,
        1,
        1
    ),
    (
        'Pipetador Automático',
        'Precisa para medições líquidas.',
        12,
        10,
        3,
        NULL,
        0,
        2
    ),
    (
        'Condutivímetro',
        'Mede a condutividade de soluções.',
        4,
        3,
        3,
        NULL,
        0,
        2
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
        '2025-01-10 08:00:00',
        '2025-01-10 12:00:00',
        FALSE,
        FALSE,
        1,
        1
    ),
    (
        '2025-02-15 14:00:00',
        '2025-02-15 18:00:00',
        FALSE,
        FALSE,
        1,
        2
    ),
    (
        '2025-03-20 10:00:00',
        '2025-03-20 14:00:00',
        TRUE,
        TRUE,
        2,
        3
    ),
    (
        '2025-04-01 09:00:00',
        '2025-04-01 13:00:00',
        FALSE,
        FALSE,
        1,
        1
    ),
    (
        '2025-05-10 08:30:00',
        '2025-05-10 11:30:00',
        TRUE,
        TRUE,
        2,
        2
    ),
    (
        '2025-06-20 13:00:00',
        '2025-06-20 16:00:00',
        FALSE,
        FALSE,
        1,
        3
    ),
    (
        '2025-07-15 15:00:00',
        '2025-07-15 18:00:00',
        FALSE,
        FALSE,
        2,
        1
    ),
    (
        '2025-08-12 10:00:00',
        '2025-08-12 12:00:00',
        TRUE,
        TRUE,
        1,
        2
    ),
    (
        '2025-09-20 08:00:00',
        '2025-09-20 12:00:00',
        FALSE,
        FALSE,
        2,
        3
    ),
    (
        '2025-10-05 13:00:00',
        '2025-10-05 16:30:00',
        FALSE,
        FALSE,
        1,
        1
    ),
    (
        '2025-11-18 09:00:00',
        '2025-11-18 12:30:00',
        FALSE,
        FALSE,
        2,
        2
    ),
    (
        '2025-12-22 14:00:00',
        '2025-12-22 18:00:00',
        TRUE,
        TRUE,
        1,
        3
    );

INSERT INTO
    Reserva_elemento (Quantidade, ID_elem, ID_hor)
VALUES
    (2.500, 1, 1),
    (1.000, 2, 2),
    (0.500, 3, 3),
    (5.000, 4, 4),
    (3.000, 5, 5),
    (2.000, 6, 6),
    (1.500, 7, 7),
    (2.000, 8, 8),
    (0.750, 9, 9),
    (3.250, 10, 10),
    (4.000, 11, 11),
    (1.000, 12, 12);

INSERT INTO
    Reserva_equipamento (Quantidade, ID_equip, ID_hor)
VALUES
    (2, 1, 1),
    (1, 2, 2),
    (1, 3, 3),
    (1, 4, 4),
    (2, 5, 5),
    (1, 6, 6),
    (2, 7, 7),
    (1, 8, 8),
    (2, 9, 9),
    (3, 10, 10),
    (1, 11, 11),
    (1, 12, 12);