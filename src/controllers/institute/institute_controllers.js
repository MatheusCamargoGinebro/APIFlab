/*
    O=====================================================O
    |   Funções de controle relacionadas aos institutos   |
    O=====================================================O
*/

// Importando o modelo de institutos:
const instituteModels = require("../../models/institute/institute_models");
const jwt = require("jsonwebtoken");

// O========================================================================================O

/*
    O====================================O
    |   Funções de controle de Campus    |
    O====================================O
*/

// Registrar um campus:
const registerCampus = async (request, response) => {
    const { campus_name, campus_state } = request.body;

    const checkCampusName = await instituteModels.checkCampusName(campus_name);

    if (checkCampusName.status) {
        return response.status(400).json(checkCampusName);
    }

    const registerCampus = await instituteModels.registerCampus(
        campus_name,
        campus_state
    );

    if (registerCampus.status === false) {
        return response.status(400).json(registerCampus);
    }

    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const createAdminUser = await instituteModels.createAdminUser(
        userID,
        registerCampus.campus_ID
    );

    if (createAdminUser.status === false) {
        return response.status(400).json(createAdminUser);
    }

    return response.status(200).json(registerCampus);
};

// ++==========================++ Editar Informações do campus ++==========================++

// Editar nome do campus:
const editCampusName = async (request, response) => {
    const { campus_name, campus_ID } = request.body;

    const checkCampusName = await instituteModels.checkCampusName(campus_name);

    if (checkCampusName.status) {
        return response.status(400).json(checkCampusName);
    }

    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const checkAdminUser = await instituteModels.checkAdminUser(
        campus_ID,
        userID
    );

    if (checkAdminUser.status === false) {
        return response.status(400).json(checkAdminUser);
    }

    if (checkAdminUser.level < 2) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar informações!",
        });
    }

    const editCampusName = await instituteModels.editCampusName(
        campus_name,
        campus_ID
    );

    if (editCampusName.status === false) {
        return response.status(400).json(editCampusName);
    }

    return response.status(200).json(editCampusName);
};

// Editar estado do campus:
const editCampusState = async (request, response) => {
    const { campus_state, campus_ID } = request.body;

    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const checkAdminUser = await instituteModels.checkAdminUser(
        campus_ID,
        userID
    );

    if (checkAdminUser.status === false) {
        return response.status(400).json(checkAdminUser);
    }

    if (checkAdminUser.level < 2) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar informações!",
        });
    }

    const editCampusState = await instituteModels.editCampusState(
        campus_state,
        campus_ID
    );

    if (editCampusState.status === false) {
        return response.status(400).json(editCampusState);
    }

    return response.status(200).json(editCampusState);
};

// ++==========================++ Editar administradores do campus ++==========================++

// Adicionar administrador ao campus:
const addAdminUser = async (request, response) => {
    const { campus_ID, user_ID } = request.body;

    const checkCampus = await instituteModels.checkCampusID(campus_ID);

    if (checkCampus.status === false) {
        return response.status(400).json(checkCampus);
    }

    const checkAdminUser = await instituteModels.checkAdminUser(
        user_ID,
        campus_ID
    );

    if (checkAdminUser.status === false) {
        return response.status(400).json(checkAdminUser);
    }

    if (checkAdminUser.level < 2) {
        return response.status(400).json({
            status: false,
            message:
                "Usuário não tem permissão para adicionar administradores!",
        });
    }

    const checkAdminExistance = await instituteModels.checkAdminUser(
        user_ID,
        campus_ID
    );

    if (checkAdminExistance.status) {
        return response.status(400).json(checkAdminExistance);
    }

    const createAdminUser = await instituteModels.createAdminUser(
        user_ID,
        campus_ID
    );

    if (createAdminUser.status === false) {
        return response.status(400).json(createAdminUser);
    }

    return response.status(200).json(createAdminUser);
};

// Remover administrador do campus:
const removeAdminUser = async (request, response) => {
    const { campus_ID, user_ID } = request.body;

    const checkCampus = await instituteModels.checkCampusID(campus_ID);

    if (checkCampus.status === false) {
        return response.status(400).json(checkCampus);
    }

    const checkAdminUser = await instituteModels.checkAdminUser(
        user_ID,
        campus_ID
    );

    if (checkAdminUser.status === false) {
        return response.status(400).json(checkAdminUser);
    }

    if (checkAdminUser.level < 2) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para remover administradores!",
        });
    }

    const removeAdminUser = await instituteModels.removeAdminUser(
        user_ID,
        campus_ID
    );

    if (removeAdminUser.status === false) {
        return response.status(400).json(removeAdminUser);
    }

    return response.status(200).json(removeAdminUser);
};

// O========================================================================================O

module.exports = {
    registerCampus,
    editCampusName,
    editCampusState,
    addAdminUser,
    removeAdminUser,
};

// O========================================================================================O
