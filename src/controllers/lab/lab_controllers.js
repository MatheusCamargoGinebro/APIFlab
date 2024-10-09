/*
    O=======================================================O
    |   Funções de controle relacionadas aos laboratórios   |
    O=======================================================O
*/

// Importando o modelo de laboratórios:
const labModels = require("../../models/lab/lab_models");
const userModels = require("../../models/user/user_models");
const instituteModels = require("../../models/institute/institute_models");
const jwt = require("jsonwebtoken");

// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a inserção de laboratórios    |
    O=================================================================O

    - [] CreateLab;
*/

// O========================================================================================O

// Função para criar um laboratório:
const CreateLab = async (req, res) => {
    const { Sala, Capacidade, campus_id } = req.body;

    // Verificando se o usuário tem permissão para criar um laboratório:
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    if (getUserByID.userData.CampusAdminLevel === 1 || getUserByID.userData.tipo === 1) {
        return res.status(400).json({
            status: false,
            message: "Usuário não tem permissão para criar um laboratório!"
        });
    }

    // Verificando se o campus existe:
    const GetCampusByID = await instituteModels.getCampusByID(campus_id);

    if (GetCampusByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Campus não encontrado!"
        });
    }

    // Verificando se o laboratório já existe:
    const GetLabByName = await labModels.GetLabByName(Sala);

    if (GetLabByName.status === true) {
        return res.status(400).json({
            status: false,
            message: "Laboratório já existe!"
        });
    }

    // Criando o laboratório:
    const CreateLab = await labModels.CreateLab(Sala, Capacidade, campus_id);

    if (CreateLab.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao criar laboratório!"
        });
    }

    // Relacionando o laboratório com o usuário criador:
    const CreateLabUser = await labModels.AddUser(CreateLab.labID, userID, 3);

    if (CreateLabUser.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao relacionar usuário com laboratório!"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Laboratório criado com sucesso!"
    });
};

// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a edição de laboratórios      |
    O=================================================================O

    - [] EditLabName;
    - [] EditLabCapacity;
    - [] Admins:
        - [] AddAdmin;
        - [] RemoveAdmin;
*/

// O========================================================================================O

// Função para editar o nome do laboratório:
const EditLabName = async (req, res) => {
    const { lab_id, sala } = req.body;

    // Verificando se o usuário existe:
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const GetUserByID = await userModels.getUserByID(userID);

    if (GetUserByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o laboratório existe:
    const GetLabByID = await labModels.GetLabById(lab_id);

    if (GetLabByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Laboratório não encontrado!"
        });
    }

    // Verificando permissão do usuário:
    const GetLabUser = await labModels.GetLabUser(lab_id, userID);

    if (GetLabUser.status === false || GetLabUser.userData.AdminLevel === 1 || GetUserByID.userData.tipo === 1) {
        return res.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o laboratório!"
        });
    }

    // Verificando se o novo nome já existe:
    const GetLabByName = await labModels.GetLabByName(sala);

    if (GetLabByName.status === true) {
        return res.status(400).json({
            status: false,
            message: "Nome de laboratório já existe!"
        });
    }

    // Editando o nome do laboratório:
    const EditLabName = await labModels.EditLabName(lab_id, sala);

    if (EditLabName.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao editar nome do laboratório!"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Nome do laboratório editado com sucesso!"
    });
};

// +------------------------------------------------------------------------------------------+

// Função para editar a capacidade do laboratório:
const EditLabCapacity = async (req, res) => {
    const { lab_id, capacity } = req.body;

    // Verificando se o usuário existe:
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const GetUserByID = await userModels.getUserByID(userID);

    if (GetUserByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o laboratório existe:
    const GetLabByID = await labModels.GetLabById(lab_id);

    if (GetLabByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Laboratório não encontrado!"
        });
    }

    // Verificando permissão do usuário:
    const GetLabUser = await labModels.GetLabUser(lab_id, userID);

    if (GetLabUser.status === false || GetLabUser.userData.AdminLevel === 1 || GetUserByID.userData.tipo === 1) {
        return res.status(400).json({
            status: false,
            message: "Usuário não tem permissão para editar o laboratório!"
        });
    }

    // Editando a capacidade do laboratório:
    const EditLabCapacity = await labModels.EditLabCapacity(lab_id, capacity);

    if (EditLabCapacity.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao editar capacidade do laboratório!"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Capacidade do laboratório editada com sucesso!"
    });
};

// +------------------------------------------------------------------------------------------+

// Função para adicionar um administrador ao laboratório:
const addAdmin = async (req, res) => {
    const { lab_id, user_id } = req.body;

    // Verificando se o usuário existe:
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const GetUserByID = await userModels.getUserByID(userID);

    if (GetUserByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o laboratório existe:
    const GetLabByID = await labModels.GetLabById(lab_id);

    if (GetLabByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Laboratório não encontrado!"
        });
    }

    // Verificando permissão do usuário:
    const GetLabUser = await labModels.GetLabUser(lab_id, userID);

    if (GetLabUser.status === false || GetLabUser.userData.AdminLevel !== 3 || GetUserByID.userData.tipo === 1) {
        return res.status(400).json({
            status: false,
            message: "Usuário não tem permissão para adicionar um administrador!"
        });
    }

    // Verificando se o usuário existe:
    const GetNewAdminData = await userModels.getUserByID(user_id);

    if (GetNewAdminData.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o usuário pertence ao laboratório:
    const GetNewAdminRelation = await labModels.GetLabUser(lab_id, user_id);

    if (GetNewAdminRelation.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não pertence ao laboratório!"
        });
    }

    if (GetNewAdminRelation.userData.AdminLevel !== 1) {
        return res.status(400).json({
            status: false,
            message: "Usuário já é administrador!"
        });
    }

    // Adicionando o usuário como administrador:
    const AddAdmin = await labModels.AddUser(lab_id, user_id, 2);

    if (AddAdmin.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao adicionar administrador!"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Administrador adicionado com sucesso!"
    });
};

// +------------------------------------------------------------------------------------------+

// Função para remover um administrador do laboratório:
const removeAdmin = async (req, res) => {
    const { lab_id, user_id } = req.body;

    // Verificando se o usuário existe:
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const GetUserByID = await userModels.getUserByID(userID);

    if (GetUserByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o laboratório existe:
    const GetLabByID = await labModels.GetLabById(lab_id);

    if (GetLabByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Laboratório não encontrado!"
        });
    }

    // Verificando permissão do usuário:
    const GetLabUser = await labModels.GetLabUser(lab_id, userID);

    if (GetLabUser.status === false || GetLabUser.userData.AdminLevel !== 3 || GetUserByID.userData.tipo === 1) {
        return res.status(400).json({
            status: false,
            message: "Usuário não tem permissão para remover um administrador!"
        });
    }

    // Verificando se o usuário existe:
    const GetNewAdminData = await userModels.getUserByID(user_id);

    if (GetNewAdminData.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o usuário pertence ao laboratório:
    const GetNewAdminRelation = await labModels.GetLabUser(lab_id, user_id);

    if (GetNewAdminRelation.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não pertence ao laboratório!"
        });
    }

    if (GetNewAdminRelation.userData.AdminLevel !== 2) {
        return res.status(400).json({
            status: false,
            message: "Usuário não é administrador!"
        });
    }

    // Removendo o usuário como administrador:
    const RemoveAdmin = await labModels.RemoveUser(lab_id, user_id);

    if (RemoveAdmin.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao remover administrador!"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Administrador removido com sucesso!"
    });
}

// O========================================================================================O

module.exports = {
    /* Create */
    CreateLab,

    /* Edit */
    EditLabName,
    EditLabCapacity,

    /* Admins */
    addAdmin,
    removeAdmin
};

// O========================================================================================O
