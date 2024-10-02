/*
    O=====================================================O
    |   Funções de controle relacionadas aos institutos   |
    O=====================================================O
*/

// Importando o modelo de institutos:
const instituteModels = require("../../models/institute/institute_models");
const jwt = require("jsonwebtoken");
// O========================================================================================O

const registerCampus = async (request, response) => {
    const { campus_name, campus_state } = request.body;
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const checkCampus = await instituteModels.checkCampusName(campus_name);

    if (checkCampus) {
        return response.status(400).json({ message: "Campus já existe" });
    }

    const registerCampus = await instituteModels.registerCampus(
        campus_name,
        campus_state,
        userID
    );

    if (registerCampus.status === false) {
        return response
            .status(400)
            .json({ message: "Erro ao registrar campus" });
    } else {
        return response.status(200).json({ message: "Campus registrado" });
    }
};

const editCampusName = async (request, response) => {
    const { campus_name, id_campus } = request.body;

    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const checkCampus = await instituteModels.checkCampusName(campus_name);

    if (checkCampus) {
        return response.status(400).json({ message: "Campus já existe" });
    }

    const checkAdmin = await instituteModels.checkAdminUser(userID, id_campus);

    if (checkAdmin === false) {
        return response
            .status(400)
            .json({ message: "Usuário não é administrador do campus" });
    }

    const editCampus = await instituteModels.editCampusName(
        id_campus,
        campus_name
    );

    if (editCampus.status === false) {
        return response
            .status(400)
            .json({ message: "Erro ao editar nome do campus" });
    } else {
        return response.status(200).json({ message: "Nome do campus editado" });
    }
};

const editCampusState = async (request, response) => {
    const { campus_state, id_campus } = request.body;

    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const checkAdmin = await instituteModels.checkAdminUser(userID, id_campus);

    if (checkAdmin === false) {
        return response
            .status(400)
            .json({ message: "Usuário não é administrador do campus" });
    }

    const editCampus = await instituteModels.editCampusState(
        id_campus,
        campus_state
    );

    if (editCampus.status === false) {
        return response
            .status(400)
            .json({ message: "Erro ao editar estado do campus" });
    } else {
        return response
            .status(200)
            .json({ message: "Estado do campus editado" });
    }
};

module.exports = {
    registerCampus,
    editCampusName,
    editCampusState,
};
