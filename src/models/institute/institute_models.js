/*
    O=====================================================O
    |   Funções de controle relacionadas aos institutos   |
    O=====================================================O
*/

// Importando o modelo de institutos:
const connection = require("../../config/database/connection");

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
const registerCampus = async (request, response) => {
    const { campus_name, campus_state } = request.body;

    const Checkresult = await checkCampusName(campus_name);

    if (Checkresult.length > 0) {
        return response.status(400).send({
            status: false,
            message: "Nome do campus já cadastrado",
        });
    }

    const query =
        "INSERT INTO campus (campus_name, campus_state) VALUES (?, ?);";
    const [result] = await connection.execute(query, [
        campus_name,
        campus_state,
    ]);

    if (result.affectedRows > 0) {
        return response.status(201).send({
            message: "Campus registrado com sucesso",
        });
    } else {
        return response.status(400).send({
            message: "Erro ao registrar campus",
        });
    }
};

// O========================================================================================O

const editCampusName = async (request, response) => {
    const { campus_name, id_campus } = request.body;

    const Checkresult = await checkCampusName(campus_name);

    if (Checkresult.length > 0) {
        return response.status(400).send({
            status: false,
            message: "Nome do campus já cadastrado",
        });
    }

    const query = "UPDATE campus SET campus_name = ? WHERE id_campus = ?;";
    const [result] = await connection.execute(query, [campus_name, id_campus]);

    if (result.affectedRows > 0) {
        return response.status(200).send({
            message: "Nome do campus editado com sucesso",
        });
    } else {
        return response.status(400).send({
            message: "Erro ao editar nome do campus",
        });
    }
};

// O========================================================================================O

module.exports = {
    registerCampus,
    editCampusName,
};
