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

    // Verificar se o nome do campus já existe:
    const checkCampusName = await instituteModels.checkCampusName(campus_name);

    if (checkCampusName.status) {
        // Nome existe
        return response.status(400).json(checkCampusName);
    }

    // Nome não existe

    // Registrar o campus:
    const registerCampus = await instituteModels.registerCampus(
        campus_name,
        campus_state
    );

    return response.status(200).json(registerCampus);
};

// ++==========================++ Editar Informações do campus ++==========================++

// Editar nome do campus:
const editCampusName = async (request, response) => {
    const { campus_name, campus_id } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.checkCampusID(campus_id);

    if (!checkCampusID.status) {
        return response.status(400).json(checkCampusID);
    }

    // Verifica se o nome do campus já existe:
    const checkCampusName = await instituteModels.checkCampusName(campus_name);

    if (checkCampusName.status) {
        return response.status(400).json(checkCampusName);
    }

    // x-access-token
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    // Verifica se o usuário tem permissão e relação com o campus:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        campus_id
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    // Verifica se o usuário é administrador do campus:
    if (checkUserInCampus.CampusAdminLevel < 3) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o campus!",
        });
    }

    // Editar nome do campus:
    const editCampusName = await instituteModels.editCampusName(
        campus_id,
        campus_name
    );

    if (!editCampusName.status) {
        return response.status(400).json(editCampusName);
    }

    return response.status(200).json(editCampusName);
};

// Editar Estado do campus:
const editCampusState = async (request, response) => {
    const { campus_state, campus_id } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.checkCampusID(campus_id);

    if (!checkCampusID.status) {
        return response.status(400).json(checkCampusID);
    }

    //x-access-token
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    // Verifica se o usuário tem permissão e relação com o campus:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        campus_id
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    // Verifica se o usuário é administrador do campus:
    if (checkUserInCampus.CampusAdminLevel < 3) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o campus!",
        });
    }

    // Editar estado do campus:
    const editCampusState = await instituteModels.editCampusState(
        campus_id,
        campus_state
    );

    if (!editCampusState.status) {
        return response.status(400).json(editCampusState);
    }

    return response.status(200).json(editCampusState);
};

// ++==========================++ Editar administradores do campus ++==========================++

// Adicionar administrador ao campus:
const addAdminUser = async (request, response) => {
    const { user_id, campus_id } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.checkCampusID(campus_id);

    console.log(checkCampusID);

    if (!checkCampusID.status) {
        return response.status(400).json(checkCampusID);
    }

    // Verificar se o usuário existe:
    const checkUserID = await instituteModels.checkUserInCampus(
        user_id,
        campus_id
    );

    console.log(checkUserID);

    if (!checkUserID.status) {
        return response.status(400).json(checkUserID);
    }

    // Verificar se o usuário já é administrador do campus:
    if (checkUserID.CampusAdminLevel > 1) {
        return response.status(400).json({
            status: false,
            message: "Usuário já é administrador do campus!",
        });
    }

    //x-access-token
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    // Verifica se o usuário tem permissão e relação com o campus:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        campus_id
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    // Verifica se o usuário é administrador do campus:
    if (checkUserInCampus.CampusAdminLevel < 3) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o campus!",
        });
    }

    // Adicionar administrador ao campus:
    const addAdminUser = await instituteModels.addAdminUser(user_id, campus_id);

    if (!addAdminUser.status) {
        return response.status(400).json(addAdminUser);
    }

    return response.status(200).json(addAdminUser);
};

// Remover administrador do campus:
const removeAdminUser = async (request, response) => {
    const { user_id, campus_id } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.checkCampusID(campus_id);

    if (!checkCampusID.status) {
        return response.status(400).json(checkCampusID);
    }

    // Verificar se o usuário existe:
    const checkUserID = await instituteModels.checkUserInCampus(
        user_id,
        campus_id
    );

    if (!checkUserID.status) {
        return response.status(400).json(checkUserID);
    }

    // Verificar se o usuário é administrador do campus:
    if (checkUserID.CampusAdminLevel < 2) {
        return response.status(400).json({
            status: false,
            message: "Usuário não é administrador do campus!",
        });
    }

    if (checkUserID.CampusAdminLevel === 3) {
        return response.status(400).json({
            status: false,
            message: "Não é possível remover o administrador principal!",
        });
    }

    //x-access-token
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    // Verifica se o usuário tem permissão e relação com o campus:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        campus_id
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    // Verifica se o usuário é administrador do campus:
    if (checkUserInCampus.CampusAdminLevel < 3) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o campus!",
        });
    }

    // Remover administrador do campus:
    const removeAdminUser = await instituteModels.removeAdminUser(
        user_id,
        campus_id
    );

    if (!removeAdminUser.status) {
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
