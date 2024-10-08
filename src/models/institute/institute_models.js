/*
    O===================================================O
    |   Funções de controle relacionadas aos modelos    |
    O===================================================O
*/

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

// O========================================================================================O

/*
    O=====================================================O
    |   Funções Models relacionadas a criar institutos    |
    O=====================================================O

    Funções relacionadas a criar institutos:
    - [X] registerCampus;
*/

// O========================================================================================O

// Registrar um campus:
const registerCampus = async (campus_name, campus_state) => {
    const query = "INSERT INTO campus (Nome, Estado) VALUES (?, ?);";
    const [result] = await connection.execute(query, [
        campus_name,
        campus_state,
    ]);

    if (result.affectedRows > 0) {
        return {
            status: true,
            campus_ID: result.insertId,
            message: "Campus registrado com sucesso!",
        };
    } else {
        return {
            status: false,
            campus_ID: null,
            message: "Erro ao registrar campus!",
        };
    }
};

// O========================================================================================O

/*
    O===========================================O
    |   Funções Models de gets em Institutos    |
    O===========================================O

    Funções relacionadas a gets em institutos:
    - [X] getCampusByID;
    - [X] getCampusByName;
*/

// O========================================================================================O

// Procure um campus pelo ID:
const getCampusByID = async (campus_ID) => {
    const query = "SELECT * FROM campus WHERE ID_campus = ?;";
    const [result] = await connection.execute(query, [campus_ID]);

    if (result.length > 0) {
        return { status: true, campusData: result[0] };
    } else {
        return { status: false, campusData: null };
    }
};

// Procure um campus pelo nome:
const getCampusByName = async (campus_name) => {
    const query = "SELECT * FROM campus WHERE Nome = ?;";
    const [result] = await connection.execute(query, [campus_name]);

    if (result.length > 0) {
        return { status: true, campusData: result[0] };
    } else {
        return { status: false, campusData: null };
    }
};

// O========================================================================================O

/*
    O=====================================================O
    |    Funções Models relacionadas a administradores    |
    O=====================================================O

    Funções relacionadas a administradores:
    - [X] addAdmin;
    - [X] removeAdmin;
*/

// O========================================================================================O

// Atualizando o AdminLevel do usuário para administrador:
const addAdmin = async (user_ID, campus_ID) => {
    const query =
        "UPDATE usuarios SET CampusAdminLevel = 2 WHERE ID_usuario = ? AND ID_campus = ?;";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.affectedRows > 0) {
        return {
            status: true,
            message: "Usuário promovido a administrador com sucesso!",
        };
    } else {
        return {
            status: false,
            message: "Erro ao promover usuário a administrador!",
        };
    }
};

// Remover um usuário administrador:
const removeAdmin = async (user_ID, campus_ID) => {
    const query =
        "UPDATE usuarios SET CampusAdminLevel = 1 WHERE ID_usuario = ? AND ID_campus = ?;";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.affectedRows > 0) {
        return {
            status: true,
            message: "Usuário removido da lista de administradores!",
        };
    } else {
        return {
            status: false,
            message: "Erro ao remover usuário da lista de administradores!",
        };
    }
};

// O========================================================================================O

/*
    O====================================================O
    |   Funções de edição relacionadas aos institutos    |
    O====================================================O

    Funções relacionadas a edição de institutos:
    - [X] editCampusName;
    - [X] editCampusState;
*/

// ++==========================++ Editar Informações do campus ++==========================++

// Editar nome do campus:
const editCampusName = async (ID_campus, newName) => {
    const query = "UPDATE campus SET Nome = ? WHERE ID_campus = ?;";
    const [result] = await connection.execute(query, [newName, ID_campus]);

    if (result.affectedRows > 0) {
        return {
            status: true,
            message: "Nome do campus editado com sucesso!",
        };
    } else {
        return {
            status: false,
            message: "Erro ao editar nome do campus!",
        };
    }
};

// Editar estado do campus:
const editCampusState = async (ID_campus, newName) => {
    const query = "UPDATE campus SET Estado = ? WHERE ID_campus = ?;";
    const [result] = await connection.execute(query, [newName, ID_campus]);

    if (result.affectedRows > 0) {
        return {
            status: true,
            message: "Estado do campus editado com sucesso!",
        };
    } else {
        return {
            status: false,
            message: "Erro ao editar estado do campus!",
        };
    }
};

// O========================================================================================O

// Exportando funções:
module.exports = {
    /* Registro */
    registerCampus,

    /* Gets */
    getCampusByID,
    getCampusByName,

    /* Admins */
    addAdmin,
    removeAdmin,

    /* Edit */
    editCampusName,
    editCampusState,
};

// O============================================================================================O
