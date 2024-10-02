/*
    O=====================================================O
    |   Funções de controle relacionadas aos institutos   |
    O=====================================================O
*/

// Importando o modelo de institutos:
const instituteModels = require("../../models/institute/institute_models");

// O========================================================================================O

const registerCampus = async (request, response) => {
    const { campus_name, campus_state } = request.body;

    const result = await instituteModels.registerCampus(
        campus_name,
        campus_state
    );

    if (result === true) {
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

    const result = await instituteModels.editCampusName(campus_name, id_campus);

    if (result === true) {
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
