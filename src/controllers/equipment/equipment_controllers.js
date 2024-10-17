/*
    O===================================================================O
    |    Funções de controllers relacionadas a busca de equipamentos    |
    O===================================================================O
*/

// Impotando os models de equipamentos:
const equipmentsModels = require("../../models/equipment/equipment_models");
const userModels = require("../../models/user/user_models");
const labModels = require("../../models/lab/lab_models");
const JWT = require("jsonwebtoken");

// O========================================================================================O

/*
    O================================================================================================O
    |    Funções de controllers relacionadas a inserção de equipamentos em laboratórios específicos    |
    O================================================================================================O

    Funções de controllers relacionadas a inserção de equipamentos em laboratórios específicos:
    - [] CreateEquipment;
    - [] RemoveEquipment;
*/

// O========================================================================================O

// Função para criar um novo equipamento:
const createEquipment = async (req, res) => {
    // Verifica se o usuário tem permissão para criar um equipamento:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    if (getUserByID.userData.CampusAdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Verifica se o laboratório existe:
    const { lab_id } = req.body;
    const GetLabById = await labModels.GetLabById(lab_id);

    if (GetLabById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Laboratório não encontrado."
        });
    }

    const { equipment_name, equipment_description, equipment_quantity, equipment_quality, equipment_image } = req.body;

    // Cria o novo equipamento:
    const createEquipment = await equipmentsModels.CreateEquipment(equipment_name, equipment_description, equipment_quantity, equipment_quality, equipment_image, lab_id);

    if (createEquipment.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao criar o equipamento."
        });
    }

    return res.status(201).json({
        status: true,
        message: "Equipamento criado com sucesso."
    });
};

// Função para remover um equipamento:
const removeEquipment = async (req, res) => {
    // Verifica se o usuário tem permissão para remover um equipamento:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    if (getUserByID.userData.CampusAdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Verifica se o equipamento existe:
    const { equipment_id } = req.body;
    const GetEquipmentById = await equipmentsModels.GetEquipmentById(equipment_id);

    if (GetEquipmentById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    // Remove o equipamento:
    const removeEquipment = await equipmentsModels.RemoveEquipment(equipment_id);

    if (removeEquipment.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao remover o equipamento."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Equipamento removido com sucesso."
    });
};

// O========================================================================================O

/*
    O====================================================================O
    |    Funções de controllers relacionadas a edição de equipamentos    |
    O====================================================================O

    Funções de controllers relacionadas a edição de equipamentos em laboratórios específicos:
    - [] EditName;
    - [] EditDescription;
    - [] EditTotalQuantity;
    - [] EditQuality;
    - [] EditImage;
*/

// O========================================================================================O

// Função para editar o nome de um equipamento:
const editName = async (req, res) => {
    // Verifica se o usuário tem permissão para editar o nome de um equipamento:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    if (getUserByID.userData.CampusAdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Verifica se o equipamento existe:
    const { equipment_id, equipment_name } = req.body;
    const GetEquipmentById = await equipmentsModels.GetEquipmentById(equipment_id);

    if (GetEquipmentById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    // Edita o nome do equipamento:
    const editName = await equipmentsModels.EditName(equipment_id, equipment_name);

    if (editName.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar o nome do equipamento."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Nome do equipamento editado com sucesso."
    });
};

// Função para editar a descrição de um equipamento:
const editDescription = async (req, res) => {
    // Verifica se o usuário tem permissão para editar a descrição de um equipamento:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    if (getUserByID.userData.CampusAdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Verifica se o equipamento existe:
    const { equipment_id, equipment_description } = req.body;
    const GetEquipmentById = await equipmentsModels.GetEquipmentById(equipment_id);

    if (GetEquipmentById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    // Edita a descrição do equipamento:
    const editDescription = await equipmentsModels.EditDescription(equipment_id, equipment_description);

    if (editDescription.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a descrição do equipamento."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Descrição do equipamento editada com sucesso."
    });
};

// Função para editar a quantidade total de um equipamento:
const editTotalQuantity = async (req, res) => {
    // Verifica se o usuário tem permissão para editar a quantidade total de um equipamento:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    if (getUserByID.userData.CampusAdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Verifica se o equipamento existe:
    const { equipment_id, equipment_quantity } = req.body;
    const GetEquipmentById = await equipmentsModels.GetEquipmentById(equipment_id);

    if (GetEquipmentById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    // Edita a quantidade total do equipamento:
    const editTotalQuantity = await equipmentsModels.EditTotalQuantity(equipment_id, equipment_quantity);

    if (editTotalQuantity.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a quantidade total do equipamento."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Quantidade total do equipamento editada com sucesso."
    });
};

// Função para editar a qualidade de um equipamento:
const editQuality = async (req, res) => {
    // Verifica se o usuário tem permissão para editar a qualidade de um equipamento:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    if (getUserByID.userData.CampusAdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Verifica se o equipamento existe:
    const { equipment_id, equipment_quality } = req.body;
    const GetEquipmentById = await equipmentsModels.GetEquipmentById(equipment_id);

    if (GetEquipmentById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    // Edita a qualidade do equipamento:
    const editQuality = await equipmentsModels.EditQuality(equipment_id, equipment_quality);

    if (editQuality.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a qualidade do equipamento."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Qualidade do equipamento editada com sucesso."
    });
};

// Função para editar a imagem de um equipamento:
const editImage = async (req, res) => {
    // Verifica se o usuário tem permissão para editar a imagem de um equipamento:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    if (getUserByID.userData.CampusAdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Verifica se o equipamento existe:
    const { equipment_id, equipment_image } = req.body;
    const GetEquipmentById = await equipmentsModels.GetEquipmentById(equipment_id);

    if (GetEquipmentById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    // Edita a imagem do equipamento:
    const editImage = await equipmentsModels.EditImage(equipment_id, equipment_image);

    if (editImage.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a imagem do equipamento."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Imagem do equipamento editada com sucesso."
    });
};

// O========================================================================================O

/*
    O============================================================================O
    |    Funções de controllers relacionadas a busca de equipamentos químicos    |
    O============================================================================O

    Funções de controllers relacionadas a busca de equipamentos químicos:
    - [] GetEquipmentById;
    - [] GetEquipmentsByLabId;
    - [] GetEquipmentByName;
*/

// O========================================================================================O

// Função para buscar um equipamento pelo ID:

const getEquipmentById = async (req, res) => {
    const { equipment_id } = req.body;

    const GetEquipmentById = await equipmentsModels.GetEquipmentById(equipment_id);

    if (GetEquipmentById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetEquipmentById.data
    });
};

// Função para buscar equipamentos por ID do laboratório:
const getEquipmentsByLabId = async (req, res) => {
    const { lab_id } = req.body;

    const GetEquipmentsByLabId = await equipmentsModels.GetEquipmentsByLabId(lab_id);

    if (GetEquipmentsByLabId.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamentos não encontrados."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetEquipmentsByLabId.data
    });
};

// Função para buscar um equipamento pelo nome:
const getEquipmentByName = async (req, res) => {
    const { equipment_name, lab_id } = req.body;

    const GetEquipmentByName = await equipmentsModels.GetEquipmentByName(equipment_name, lab_id);

    if (GetEquipmentByName.status === false) {
        return res.status(404).json({
            status: false,
            message: "Equipamento não encontrado."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetEquipmentByName.data
    });
};

// O========================================================================================O

module.exports = {
    /* Create */
    createEquipment,
    removeEquipment,

    /* Edit */
    editName,
    editDescription,
    editTotalQuantity,
    editQuality,
    editImage,

    /* Get */
    getEquipmentById,
    getEquipmentsByLabId,
    getEquipmentByName
};

// O========================================================================================O