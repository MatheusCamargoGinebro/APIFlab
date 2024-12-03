-- =========================================== Inserts para facilitar a vida ===========================================
INSERT INTO
    campus (Nome, Estado)
VALUES
    ('Campus I', 'SP'),
    ('Campus II', 'MG'),
    ('Campus III', 'RS');

INSERT INTO
    usuarios (Nome, Email, Senha, Salt, Tipo, CampusAdminLevel, ID_campus)
VALUES
    ('Aluno', 'aluno@aluno.ifsp.edu.br', '$2a$10$e4NVh5XJUY409kv.NDwRguoH/BiF81mHi8Rxsptl1pqaUIMXqXdPO', '$2a$10$3zDSC07NpU.sk6DjWPUGdO6uHTX/D.eyj0vaAKVP3OluK6j.M6e2W', 1, 1, 1),
    ('Professor', 'professor@ifsp.edu.br', '$2a$10$e4NVh5XJUY409kv.NDwRguoH/BiF81mHi8Rxsptl1pqaUIMXqXdPO', '$2a$10$3zDSC07NpU.sk6DjWPUGdO6uHTX/D.eyj0vaAKVP3OluK6j.M6e2W', 2, 2, 1),
    ('Outro', 'admin@ifsp.edu.br', '$2a$10$e4NVh5XJUY409kv.NDwRguoH/BiF81mHi8Rxsptl1pqaUIMXqXdPO', '$2a$10$3zDSC07NpU.sk6DjWPUGdO6uHTX/D.eyj0vaAKVP3OluK6j.M6e2W', 3, 3, 1);

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

/* Validade é um timestamp */
/* estado físico varia de 1 a 3 */
/* supervisorlevel varia de 0 a 2 */
INSERT INTO
    elementos (Nome, Quantidade, Descricao, Peso_molecular, Num_cas, Num_ec, EstadoFisico, Validade, SupervisorLevel, ID_lab)
VALUES
    (
        'Ácido Clorídrico',
        100,
        'Ácido clorídrico é uma solução aquosa de cloreto de hidrogênio (HCl). É um ácido forte, corrosivo e tóxico, utilizado em laboratórios de química para reações de neutralização e limpeza de vidrarias.',
        36.46,
        '7647-01-0',
        '231-595-7',
        1,
        '2022-12-31 00:00:00',
        0,
        1
    ),
    (
        'Ácido Sulfúrico',
        100,
        'Ácido sulfúrico é um ácido forte, corrosivo e tóxico, utilizado em laboratórios de química para reações de neutralização e síntese de compostos orgânicos e inorgânicos.',
        98.08,
        '7664-93-9',
        '231-639-5',
        1,
        '2022-12-31 00:00:00',
        0,
        1
    ),
    ('Água Destilada', 100, 'Água destilada é uma água purificada, livre de sais minerais e impurezas, utilizada em laboratórios de química para preparo de soluções e limpeza de vidrarias.', 18.02, '7732-18-5', '231-791-2', 1, '2022-12-31 00:00:00', 0, 1),
    ('Álcool Etílico', 100, 'Álcool etílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 46.07, '64-17-5', '200-578-6', 1, '2022-12-31 00:00:00', 0, 1),
    ('Álcool Isopropílico', 100, 'Álcool isopropílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 60.10, '67-63-0', '200-661-7', 1, '2022-12-31 00:00:00', 0, 1),
    ('Álcool Metílico', 100, 'Álcool metílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 32.04, '67-56-1', '200-659-6', 1, '2022-12-31 00:00:00', 0, 1),
    ('Álcool Benzílico', 100, 'Álcool benzílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 108.14, '100-51-6', '202-859-9', 1, '2022-12-31 00:00:00', 0, 2),
    (
        'Álcool Ciclohexílico',
        100,
        'Álcool ciclohexílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.',
        100.16,
        '108-93-0',
        '203-631-1',
        1,
        '2022-12-31 00:00:00',
        0,
        2
    ),
    ('Álcool Fenílico', 100, 'Álcool fenílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 94.11, '108-95-2', '203-633-2', 1, '2022-12-31 00:00:00', 0, 2),
    ('Álcool Glicólico', 100, 'Álcool glicólico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 76.05, '79-14-1', '201-180-5', 1, '2022-12-31 00:00:00', 0, 2),
    ('Álcool Propílico', 100, 'Álcool propílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 60.10, '67-63-0', '200-661-7', 1, '2022-12-31 00:00:00', 0, 2),
    ('Álcool Terbútílico', 100, 'Álcool terbútílico é um líquido incolor, inflamável e volátil, utilizado em laboratórios de química para limpeza de vidrarias e extração de compostos orgânicos.', 74.12, '75-65-0', '200-882-4', 1, '2022-12-31 00:00:00', 0, 2);

INSERT INTO
    equipamentos (Nome, Descricao, QuantidadeTotal, QuantidadeDisponivel, Qualidade, SupervisorLevel, ID_lab)
VALUES
    ('Balança Analítica', 'Balança analítica é um equipamento de medição de massa de alta precisão. É utilizada em laboratórios de química, física e biologia para pesar substâncias em pequenas quantidades.', 10, 10, 5, 0, 1),
    ('Bureta', 'Bureta é um equipamento de laboratório utilizado para medir volumes de líquidos com precisão. É um tubo de vidro graduado, com uma torneira na parte inferior, que permite a liberação controlada do líquido.', 10, 10, 5, 0, 1),
    ('Mufla', 'Mufla é um equipamento de laboratório utilizado para aquecer substâncias a altas temperaturas. É um forno elétrico, com resistências internas, que permite a queima de materiais em altas temperaturas.', 10, 10, 5, 0, 1),
    ('Estufa', 'Estufa é um equipamento de laboratório utilizado para secar e esterilizar materiais. É um forno elétrico, com resistências internas, que permite a secagem de materiais a baixas temperaturas.', 10, 10, 5, 0, 1);