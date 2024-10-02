/*
    O===================================================O
    |   Funções de controle relacionadas aos modelos    |
    O===================================================O
*/

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

const checkCampusName = async (campus_name) => {
    const query = "SELECT * FROM campus WHERE campus_name = ?;";
    const [result] = await connection.execute(query, [campus_name]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

// O========================================================================================O

const createAdminUser = async (user_ID, campus_ID) => {
    const query =
        "INSERT INTO adminusuarioCampus (ID_responsavel, ID_campus) VALUES (?, ?);";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.affectedRows < 0) {
        return true;
    } else {
        return false;
    }
};

const checkAdminUser = async (user_ID, campus_ID) => {
    const query =
        "SELECT * FROM adminusuarioCampus WHERE ID_responsavel = ? AND ID_campus = ?;";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

const removeAdminUser = async (user_ID, campus_ID) => {
    const query =
        "DELETE FROM adminusuarioCampus WHERE ID_responsavel = ? AND ID_campus = ?;";
    const [result] = await connection.execute(query, [user_ID, campus_ID]);

    if (result.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
};

// O========================================================================================O

const registerCampus = async (campus_name, campus_state, user_ID) => {
    const query = "INSERT INTO campus (Nome, Estado) VALUES (?, ?);";
    const [result] = await connection.execute(query, [
        campus_name,
        campus_state,
    ]);

    if (result.affectedRows > 0) {
        const adminResult = createAdminUser(user_ID, result.insertId);

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

// O========================================================================================O

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

const editCampusState = async (ID_campus, ID_user, newName) => {
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

module.exports = {
    registerCampus,
    editCampusName,
    editCampusState,
    createAdminUser,
    checkAdminUser,
    removeAdminUser,
};
