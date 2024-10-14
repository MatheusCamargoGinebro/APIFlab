/*
    O=================================================O
    |   Arquivo Models relacionado aos laboratórios   |
    O=================================================O
*/

// Importando o módulo de conexão com o banco de dados:
const connection = require("../../utils/connection");

// O========================================================================================O

/*
    O=================================================================O
    |    Funções de models relacionadas a inserção de laboratórios    |
    O=================================================================O

    Funções de inserção de laboratórios no banco de dados:
    - [X] CreateLab;
    - [X] AddUser;
    - [X] RemoveUser;
*/

// O========================================================================================O

// Função de inserção de laboratórios no banco de dados:
const CreateLab = async (Sala, Capacidade, ID_campus) => {
    const query = "INSERT INTO laboratorios (Sala, Capacidade, ID_campus) VALUES (?, ?, ?)";
    const [results] = await connection.execute(query, [Sala, Capacidade, ID_campus]);

    if (results.affectedRows > 0) {
        return { status: true, message: "Laboratório cadastrado com sucesso!", labID: results.insertId };
    } else {
        return { status: false, message: "Erro ao cadastrar laboratório!", labID: null };
    }
};

// Função para adicionar um usuário a um laboratório no banco de dados:
const AddUser = async (ID_lab, ID_usuario, AdminLevel) => {
    const query = "INSERT INTO userlab (ID_lab, ID_usuario, AdminLevel) VALUES (?, ?, ?)";
    const [results] = await connection.execute(query, [ID_lab, ID_usuario, AdminLevel]);

    if (results.affectedRows > 0) {
        return { status: true, message: "Usuário adicionado ao laboratório com sucesso!" };
    } else {
        return { status: false, message: "Erro ao adicionar usuário ao laboratório!" };
    }
};

// Função para remover um usuário de um laboratório no banco de dados:
const RemoveUser = async (ID_lab, ID_usuario) => {
    const query = "DELETE FROM userlab WHERE ID_lab = ? AND ID_usuario = ?";
    const [results] = await connection.execute(query, [ID_lab, ID_usuario]);

    if (results.affectedRows > 0) {
        return { status: true, message: "Usuário removido do laboratório com sucesso!" };
    } else {
        return { status: false, message: "Erro ao remover usuário do laboratório!" };
    }
};

// O========================================================================================O

/*
    O================================================================O
    |    Funções de models relacionadas a edição de laboratórios     |
    O================================================================O
 
    Funções de edição de laboratórios no banco de dados:
    - [X] EditLabName;
    - [X] EditLabCapacity;
    - [X] Editar permissões de usuário em laboratório:
        - [X] AddAdmin;
        - [X] RemoveAdmin;
 
*/

// O========================================================================================O

// Função de edição do nome do laboratório no banco de dados:
const EditLabName = async (ID_lab, NewName) => {
    const query = "UPDATE laboratorios SET Sala = ? WHERE ID_lab = ?";
    const [results] = await connection.execute(query, [NewName, ID_lab]);

    if (results.affectedRows > 0) {
        return { status: true, message: "Nome do laboratório editado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar nome do laboratório!" };
    }
};

// Função de edição da capacidade do laboratório no banco de dados:
const EditLabCapacity = async (ID_lab, newCapacity) => {
    const query = "UPDATE laboratorios SET Capacidade = ? WHERE ID_lab = ?";
    const [results] = await connection.execute(query, [newCapacity, ID_lab]);

    if (results.affectedRows > 0) {
        return { status: true, message: "Capacidade do laboratório editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar capacidade do laboratório!" };
    }
};

// Função para adicionar um administrador a um laboratório no banco de dados:
const AddAdmin = async (ID_lab, ID_usuario, AdminLevel) => {
    const query = "UPDATE userlab SET AdminLevel = ? WHERE ID_lab = ? AND ID_usuario = ?";
    const [results] = await connection.execute(query, [AdminLevel, ID_lab, ID_usuario]);

    if (results.affectedRows > 0) {
        return { status: true, message: "Usuário promovido a administrador do laboratório com sucesso!" };
    } else {
        return { status: false, message: "Erro ao promover usuário a administrador do laboratório!" };
    }
};

// Função para remover um administrador de um laboratório no banco de dados:
const RemoveAdmin = async (ID_lab, ID_usuario) => {
    const query = "UPDATE userlab SET AdminLevel = 1 WHERE ID_lab = ? AND ID_usuario = ?";
    const [results] = await connection.execute(query, [ID_lab, ID_usuario]);

    if (results.affectedRows > 0) {
        return { status: true, message: "Usuário removido do cargo de administrador do laboratório com sucesso!" };
    } else {
        return { status: false, message: "Erro ao remover usuário do cargo de administrador do laboratório!" };
    }
};

// O========================================================================================O

/*
    O============================================================O
    |    Funções de models relacionadas a gets de laboratórios   |
    O============================================================O
 
    Funções de gets de laboratórios no banco de dados:
    - [] GetAllLabs;
    - [] GetLabById;
    - [] GetLabByName;
    - [] GetLabsByCampus;
    - [] Ler usuários de um laboratório:
        - [] GetLabUsers;
        - [] GetLabUser;
        - [] GetLabsByUserId;
        - [] GetLabMembers;
        - [] GetLabAdmins;
        - [] GetLabResponsible;

*/

// O========================================================================================O

// Função de get de todos os laboratórios no banco de dados:
const GetAllLabs = async () => {
    const query = "SELECT * FROM laboratorios";
    const [results] = await connection.execute(query);

    if (results.length > 0) {
        return { status: true, data: results[0] };
    } else {
        return { status: false, data: null };
    }
};

// Função de get de um usuário específico em um laboratório no banco de dados:
const GetLabUser = async (ID_lab, ID_usuario) => {
    const query = "SELECT * FROM userlab WHERE ID_lab = ? AND ID_usuario = ?";
    const [results] = await connection.execute(query, [ID_lab, ID_usuario]);

    if (results.length > 0) {
        return { status: true, data: results[0] };
    } else {
        return { status: false, data: null };
    }
};

// Função de get de um laboratório pelo ID no banco de dados:
const GetLabById = async (ID_lab) => {
    const query = "SELECT * FROM laboratorios WHERE ID_lab = ?";
    const [results] = await connection.execute(query, [ID_lab]);

    if (results.length > 0) {
        return { status: true, data: results[0] };
    } else {
        return { status: false, data: null };
    }
};

// Função de get de um laboratório pelo nome no banco de dados:
const GetLabByName = async (Sala, campus_id) => {
    const query = "SELECT * FROM laboratorios WHERE Sala = ? AND ID_campus = ?";
    const [results] = await connection.execute(query, [Sala, campus_id]);

    if (results.length > 0) {
        return { status: true, data: results[0] };
    } else {
        return { status: false, data: null };
    }
};

// Função de get de todos os laboratórios de um campus no banco de dados:
const GetLabsByCampus = async (ID_campus) => {
    const query = "SELECT * FROM laboratorios WHERE ID_campus = ?";
    const [results] = await connection.execute(query, [ID_campus]);

    if (results.length > 0) {
        return { status: true, data: results[0] };
    } else {
        return { status: false, data: null };
    }
};

// +----------------------------------------------------------------------------------------+

// Função de get de todos os usuários de um laboratório no banco de dados:
const GetLabUsers = async (ID_lab) => {
    const query = "SELECT * FROM userlab WHERE ID_lab = ?";
    const [results] = await connection.execute(query, [ID_lab]);

    if (results.length > 0) {
        return { status: true, data: results[0] };
    } else {
        return { status: false, data: null };
    }
};



// Função de get de todos os laboratórios de um usuário no banco de dados:
const GetLabsByUserId = async (ID_usuario) => {
    const query = "SELECT * FROM userlab WHERE ID_usuario = ?";
    const [results] = await connection.execute(query, [ID_usuario]);

    if (results.length > 0) {
        return { status: true, data: results };
    } else {
        return { status: false, data: null };
    }
};

// Função de get de todos os laboratórios de um usuário com determinado nível de acesso:
const GetLabByUserLevel = async (ID_usuario, level) => {
    const query = "SELECT * FROM userlab WHERE ID_usuario = ? AND AdminLevel = ?";
    const [results] = await connection.execute(query, [ID_usuario, level]);

    if (results.length > 0) {
        return { status: true, data: results };
    } else {
        return { status: false, data: null };
    }
};

// O========================================================================================O

module.exports = {
    /* Create */
    CreateLab,
    AddUser,
    RemoveUser,

    /* Edit */
    EditLabName,
    EditLabCapacity,
    AddAdmin,
    RemoveAdmin,

    /* Get */
    GetAllLabs,
    GetLabById,
    GetLabByName,
    GetLabsByCampus,
    GetLabUsers,
    GetLabUser,
    GetLabsByUserId,
    GetLabByUserLevel,
};

// O========================================================================================O
