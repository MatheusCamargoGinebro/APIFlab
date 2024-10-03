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
    const [result] = await connection.execute(query, [campus_name]);

    if (result.length > 0) {
        return { status: true, message: "Nome do campus já existe!" };
    } else {
        return { status: false, message: "Nome do campus disponível!" };
    }
};

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

// O========================================================================================O

/*
    O==========================================================O
    |   Funções de modelos relacionados aos administradores    |
    O==========================================================O
*/

// Criar um usuário administrador:
const createAdminUser = async (user_ID, campus_ID) => {
    const query =
        "INSERT INTO userCampus (ID_Responsavel, ID_campus) VALUES (?, ?);";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.affectedRows < 0) {
        return {
            status: false,
            message: "Erro ao cadastrar usuário administrador!",
        };
    } else {
        return {
            status: true,
            message: "Usuário administrador cadastrado com sucesso!",
        };
    }
};

// Verificar se o usuário é um administrador:
const checkAdminUser = async (user_ID, campus_ID) => {
    const query =
        "SELECT AdminLevel FROM userCampus WHERE ID_Responsavel = ? AND ID_campus = ?;";

    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.length > 0) {
        return {
            status: true,
            level: result.AdminLevel,
            message: "Usuário é um administrador!",
        };
    } else {
        return {
            status: false,
            level: 0,
            message: "Usuário não é um administrador!",
        };
    }
};

// Remover um usuário administrador:
const removeAdminUser = async (user_ID, campus_ID) => {
    const query =
        "DELETE FROM userCampus WHERE ID_Responsavel = ? AND ID_campus = ?;";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Administrador removido com sucesso!" };
    } else {
        return { status: false, message: "Erro ao remover Administrador!" };
    }
};

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
        if (adminResult === true) {
            return {
                status: true,
                message: "Campus cadastrado com sucesso!",
            };
        } else {
            return {
                status: false,
                message: "Erro ao cadastrar campus!",
            };
        }
    }
};

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

// O========================================================================================O

// Exportando funções:
module.exports = {
    checkCampusName,
    checkCampusID,
    createAdminUser,
    checkAdminUser,
    removeAdminUser,
    registerCampus,
    editCampusName,
    editCampusState,
};
