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

    if (!checkCampusName.status) {
        return response.status(400).json(checkCampusName);
    }

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
    // Coletando ID do usuário:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).ID_usuario;

    // Verificar se o usuário pertence ao campus:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        id_campus
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    if (checkUserInCampus.CampusAdminLevel < 2) {
        return response.status(401).json({
            status: false,
            message: "Usuário não tem permissão para realizar essa ação!",
        });
    }

    const { campus_name, id_campus } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.checkCampusID(id_campus);

    if (!checkCampusID.status) {
        return response.status(400).json(checkCampusID);
    }

    // Verificar se o nome do campus já existe:
    const checkCampusName = await instituteModels.checkCampusName(campus_name);

    if (!checkCampusName.status) {
        return response.status(400).json(checkCampusName);
    }

    // Editar nome do campus:
    const editCampusName = await instituteModels.editCampusName(
        campus_name,
        id_campus
    );

    if (!editCampusName.status) {
        return response.status(400).json(editCampusName);
    }

    return response.status(200).json(editCampusName);
};

// Editar Estado do campus:
const editCampusState = async (request, response) => {
    // Coletando ID do usuário:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).ID_usuario;

    // Verificar se o usuário pertence ao campus:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        id_campus
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    if (checkUserInCampus.CampusAdminLevel < 2) {
        return response.status(401).json({
            status: false,
            message: "Usuário não tem permissão para realizar essa ação!",
        });
    }

    const { campus_state, id_campus } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.checkCampusID(id_campus);

    if (!checkCampusID.status) {
        return response.status(400).json(checkCampusID);
    }

    // Editar estado do campus:
    const editCampusState = await instituteModels.editCampusState(
        campus_state,
        id_campus
    );

    if (!editCampusState.status) {
        return response.status(400).json(editCampusState);
    }

    return response.status(200).json(editCampusState);
};

// ++==========================++ Editar administradores do campus ++==========================++

// Adicionar administrador ao campus:
const addAdminUser = async (request, response) => {
    const { id_user, id_campus } = request.body;

    // Verificando se o usuário tem permissão para adicionar um administrador:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).ID_usuario;

    // Verificar se o usuário pertence ao campus, e qual seu nível de administração:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        id_campus
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    if (checkUserInCampus.CampusAdminLevel < 2) {
        return response.status(401).json({
            status: false,
            message: "Usuário não tem permissão para realizar essa ação!",
        });
    }

    // Verificar se o usuário existe no campus:
    const CheckNewAdmin = await instituteModels.checkUserInCampus(
        id_user,
        id_campus
    );

    if (!CheckNewAdmin.status) {
        return response.status(400).json(CheckNewAdmin);
    }

    if (
        CheckNewAdmin.CampusAdminLevel === 2 ||
        CheckNewAdmin.CampusAdminLevel === 3
    ) {
        return response.status(400).json({
            status: false,
            message: "Usuário já é administrador do campus!",
        });
    }

    // Adicionar administrador ao campus:
    const addAdminUser = await instituteModels.addAdminUser(id_user, id_campus);

    if (!addAdminUser.status) {
        return response.status(400).json(addAdminUser);
    }

    return response.status(200).json(addAdminUser);
};

// Remover administrador do campus:
const removeAdminUser = async (request, response) => {
    const { id_user, id_campus } = request.body;

    // Verificando se o usuário tem permissão para remover um administrador:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).ID_usuario;

    // Verificar se o usuário pertence ao campus, e qual seu nível de administração:
    const checkUserInCampus = await instituteModels.checkUserInCampus(
        userID,
        id_campus
    );

    if (!checkUserInCampus.status) {
        return response.status(400).json(checkUserInCampus);
    }

    if (checkUserInCampus.CampusAdminLevel < 2) {
        return response.status(401).json({
            status: false,
            message: "Usuário não tem permissão para realizar essa ação!",
        });
    }

    // Verificar se o usuário existe no campus:
    const CheckAdmin = await instituteModels.checkUserInCampus(
        id_user,
        id_campus
    );

    if (!CheckAdmin.status) {
        return response.status(400).json(CheckAdmin);
    }

    if (CheckAdmin.CampusAdminLevel === 1) {
        return response.status(400).json({
            status: false,
            message: "Usuário não é administrador do campus!",
        });
    }

    // Remover administrador do campus:
    const removeAdminUser = await instituteModels.removeAdminUser(
        id_user,
        id_campus
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
