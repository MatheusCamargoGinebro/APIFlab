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

INSERT INTO
    elementos (Nome, Quantidade, Descricao, Peso_molecular, Num_cas, Num_ec, EstadoFisico, Validade, SupervisorLevel, ID_lab)
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
    ('Ácido Fórmico', 1000, 'Ácido Fórmico é um ácido orgânico fraco. É um líquido incolor, altamente corrosivo e tóxico. É um ácido fraco, capaz de corroer metais, tecidos vivos e muitos outros materiais.', 46.03, '64-18-6', '200-579-1', 1, '2022-12-31', 1, 1);

INSERT INTO
    equipamentos (Nome, Descricao, QuantidadeTotal, QuantidadeDisponivel, Qualidade, SupervisorLevel, ID_lab)
VALUES
    ('Balança Analítica', 'Balança analítica é um equipamento de medição de massa de alta precisão. É utilizada em laboratórios de química, física e biologia para pesar substâncias em pequenas quantidades.', 10, 10, 5, 0, 1),
    ('Bureta', 'Bureta é um equipamento de laboratório utilizado para medir volumes de líquidos com precisão. É um tubo de vidro graduado, com uma torneira na parte inferior, que permite a liberação controlada do líquido.', 10, 10, 5, 0, 1),
    ('Mufla', 'Mufla é um equipamento de laboratório utilizado para aquecer substâncias a altas temperaturas. É um forno elétrico, com resistências internas, que permite a queima de materiais em altas temperaturas.', 10, 10, 5, 0, 1),
    ('Estufa', 'Estufa é um equipamento de laboratório utilizado para secar e esterilizar materiais. É um forno elétrico, com resistências internas, que permite a secagem de materiais a baixas temperaturas.', 10, 10, 5, 0, 1);

INSERT INTO
    horarios (Inicio, Fim, Finished, Started, ID_lab, ID_usuario)
VALUES
    ('2022-12-31 08:00:00', '2022-12-31 12:00:00', 0, 0, 1, 1),
    ('2022-12-31 08:00:00', '2022-12-31 12:00:00', 0, 0, 1, 2),
    ('2022-12-31 08:00:00', '2022-12-31 12:00:00', 0, 0, 1, 3),
    ('2022-12-31 08:00:00', '2022-12-31 12:00:00', 0, 0, 2, 1),
    ('2022-12-31 08:00:00', '2022-12-31 12:00:00', 0, 0, 2, 2),
    ('2022-12-31 08:00:00', '2022-12-31 12:00:00', 0, 0, 2, 3);

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