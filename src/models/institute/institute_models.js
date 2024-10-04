/*
    O===================================================O
    |   Funções de controle relacionadas aos modelos    |
    O===================================================O
*/

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

// O========================================================================================O

/*
    O==============================O
    |   Funções de verificações    |
    O==============================O
*/

// Verificar se o nome do campus já existe:
const checkCampusName = async (campus_name) => {
    const query = "SELECT * FROM campus WHERE Nome = ?;";
    const result = await connection.execute(query, [campus_name]);

    console.log("O===============O\n" + result[0] + "\nO===============O");

    if (result.length > 0) {
        return { status: false, message: "Nome do campus já registrado!" };
    } else {
        return { status: true, message: "Nome do campus disponível!" };
    }
};

// ----------------------- //

// Verificar se o campus existe:
const checkCampusID = async (campus_ID) => {
    const query = "SELECT * FROM campus WHERE ID_campus = ?;";
    const [result] = await connection.execute(query, [campus_ID]);

    if (result.length > 0) {
        return { status: true, message: "Campus encontrado!" };
    } else {
        return { status: false, message: "Campus não encontrado!" };
    }
};

// ----------------------- //

// O========================================================================================O

/*
    O==========================================================O
    |   Funções de modelos relacionados aos administradores    |
    O==========================================================O
*/

// Verificar se o usuário possui relação com o campus:
const checkUserInCampus = async (user_ID, campus_ID) => {
    const query =
        "SELECT * FROM usuarios WHERE ID_usuario = ? AND ID_campus = ?;";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.length > 0) {
        return {
            status: true,
            CampusAdminLevel: result[0].CampusAdminLevel,
            message: "Usuário encontrado no campus!",
        };
    } else {
        return {
            status: false,
            CampusAdminLevel: null,
            message: "Usuário não encontrado no campus!",
        };
    }
};

// ----------------------- //

// Atualizando o AdminLevel do usuário para administrador:
const addAdminUser = async (user_ID, campus_ID) => {
    const query =
        "UPDATE usuarios SET AdminLevel = 2 WHERE ID_usuario = ? AND ID_campus = ?;";
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

// ----------------------- //

// Remover um usuário administrador:
const removeAdminUser = async (user_ID, campus_ID) => {
    const query =
        "UPDATE usuarios SET AdminLevel = 1 WHERE ID_usuario = ? AND ID_campus = ?;";
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

// ----------------------- //

// O========================================================================================O

/*
    O================================================O
    |   Funções de modelos relacionados ao campus    |
    O================================================O
*/

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

// ----------------------- //

// ++==========================++ Editar Informações do campus ++==========================++

// Editar nome do campus:
const editCampusName = async (ID_campus, newName) => {
    const query = "UPDATE campus SET Nome = ? WHERE ID_campus = ?;";
    const result = await connection.execute(query, [newName, ID_campus]);

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

// ----------------------- //

// Editar estado do campus:
const editCampusState = async (ID_campus, newName) => {
    const query = "UPDATE campus SET Estado = ? WHERE ID_campus = ?;";
    const result = await connection.execute(query, [newName, ID_campus]);

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

// ----------------------- //

// O========================================================================================O

// Exportando funções:
module.exports = {
    checkCampusName,
    checkCampusID,
    checkUserInCampus,
    addAdminUser,
    removeAdminUser,
    registerCampus,
    editCampusName,
    editCampusState,
};

// O============================================================================================O
