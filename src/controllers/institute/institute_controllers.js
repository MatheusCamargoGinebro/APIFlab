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

    Funções relacionadas a Campus:
    - [X] registerCampus;
*/

// O========================================================================================O

// Registrar um campus:
const registerCampus = async (request, response) => {
    const { campus_name, campus_state } = request.body;

    // Verificar se o nome do campus já existe:
    const checkCampusName = await instituteModels.getCampusByName(campus_name);

    if (checkCampusName.status) {
        return response
            .status(400)
            .json({ status: false, message: "Campus já existe!" });
    }

    // Registrar o campus:
    const registerCampus = await instituteModels.registerCampus(
        campus_name,
        campus_state
    );

    if (registerCampus.status === false) {
        return response.status(400).json(registerCampus);
    }

    return response.status(200).json(registerCampus);
};

// O========================================================================================O

/*
    O=====================================================O
    |   Funções de controle relacionadas a editar Campus   |
    O=====================================================O

    Funções relacionadas a editar Campus:
    - [] editCampusName;
    - [] editCampusState;
*/

// O========================================================================================O

// Editar nome do campus:
const editCampusName = async (request, response) => {
    const { campus_name, campus_id } = request.body;

    // Verificar se o nome do campus já existe:
    const checkCampusName = await instituteModels.getCampusByName(campus_name);

    if (checkCampusName.status) {
        return response
            .status(400)
            .json({ status: false, message: "Nome do campus já existe!" });
    }

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.getCampusByID(campus_id);

    if (checkCampusID.status === false) {
        return response
            .status(400)
            .json({ status: false, message: "Campus informado não existe!" });
    }

    // Verifica privilégios do usuário:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const user = await userModels.getUserByID(userID);

    if (user.status === false) {
        return response.status(400).json({
            status: false,
            message: "Erro ao verificar usuário!",
        });
    }

    if (user.CampusAdminLevel !== 3 || user.ID_campus !== campus_id) {
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

    if (editCampusName.status === false) {
        return response.status(400).json(editCampusName);
    }

    return response.status(200).json(editCampusName);
};

// O========================================================================================O

// O========================================================================================O

// Editar Estado do campus:
const editCampusState = async (request, response) => {
    const { campus_state, campus_id } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.getCampusByID(campus_id);

    if (checkCampusID.status === false) {
        return response
            .status(400)
            .json({ status: false, message: "Campus informado não existe!" });
    }

    // Verifica privilégios do usuário:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const user = await userModels.getUserByID(userID);

    if (user.status === false) {
        return response.status(400).json({
            status: false,
            message: "Erro ao verificar usuário!",
        });
    }

    if (user.CampusAdminLevel !== 3 || user.ID_campus !== campus_id) {
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

    if (editCampusState.status === false) {
        return response.status(400).json(editCampusState);
    }

    return response.status(200).json(editCampusState);
};

// O========================================================================================O

/*
    O==========================================================O
    |    Funções de controle relacionadas a administradores    |
    O==========================================================O

    Funções relacionadas a administradores:
    - [X] addAdminUser;
    - [X] removeAdminUser;
*/

// ++==========================++ Editar administradores do campus ++==========================++

// Adicionar administrador ao campus:
const addAdminUser = async (request, response) => {
    const { user_id, campus_id } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.getCampusByID(campus_id);

    if (checkCampusID.status === false) {
        return response
            .status(400)
            .json({ status: false, message: "Campus informado não existe!" });
    }

    // Verificar se o usuário existe:
    const checkUserID = await userModels.getUserByID(user_id);

    if (checkUserID.status === false) {
        return response
            .status(400)
            .json({ status: false, message: "Usuário informado não existe!" });
    }

    // Verificar se o usuário já é administrador do campus:
    if (checkUserID.CampusAdminLevel > 1) {
        return response.status(400).json({
            status: false,
            message: "Usuário já é administrador do campus!",
        });
    }

    // Verifica privilégios do usuário:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;
    const user = await userModels.getUserByID(userID);

    if (user.status === false) {
        return response.status(400).json({
            status: false,
            message: "Erro ao verificar usuário!",
        });
    }

    if (user.CampusAdminLevel !== 3 || user.ID_campus !== campus_id) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o campus!",
        });
    }

    // Adicionar administrador ao campus:
    const addAdmin = await instituteModels.addAdmin(user_id, campus_id);

    if (addAdmin.status === false) {
        return response.status(400).json(addAdmin);
    }

    return response.status(200).json(addAdmin);
};

// O========================================================================================O

// O========================================================================================O

// Remover administrador do campus:
const removeAdminUser = async (request, response) => {
    const { user_id, campus_id } = request.body;

    // Verificar se o campus existe:
    const checkCampusID = await instituteModels.getCampusByID(campus_id);

    if (checkCampusID.status === false) {
        return response
            .status(400)
            .json({ status: false, message: "Campus informado não existe!" });
    }

    // Verificar se o usuário existe:
    const checkUserID = await userModels.getUserByID(user_id);

    if (checkUserID.status === false) {
        return response
            .status(400)
            .json({ status: false, message: "Usuário informado não existe!" });
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

    // Verifica privilégios do usuário:
    const token = request.headers["x-access-token"];
    const userID = jwt.decode(token).userID;
    const user = await userModels.getUserByID(userID);

    if (user.status === false) {
        return response.status(400).json({
            status: false,
            message: "Erro ao verificar usuário!",
        });
    }

    if (user.CampusAdminLevel !== 3 || user.ID_campus !== campus_id) {
        return response.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o campus!",
        });
    }

    // Remover administrador do campus:
    const removeAdmin = await instituteModels.removeAdmin(user_id, campus_id);

    if (removeAdmin.status === false) {
        return response.status(400).json(removeAdmin);
    }

    return response.status(200).json(removeAdmin);
};

// O========================================================================================O

module.exports = {
    /* Create */
    registerCampus,

    /* Edit */
    editCampusName,
    editCampusState,

    /* Admin */
    addAdminUser,
    removeAdminUser,
};

// O========================================================================================O
