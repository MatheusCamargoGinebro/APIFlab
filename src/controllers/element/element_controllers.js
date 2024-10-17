/*
    O======================================================O
    |    Funções de controllers relacionadas a elementos    |
    O======================================================O

*/

// Importando os modelos de elementos:
const elementsModels = require("../../models/element/element_models");
const userModels = require("../../models/user/user_models");
const labModels = require("../../models/lab/lab_models");
const JWT = require("jsonwebtoken");

// O========================================================================================O

/*
    O============================================================================O
    |    Funções de controllers relacionadas a inserção de elementos químicos    |
    O============================================================================O

    Funções de controllers relacionadas a inserção de elementos químicos:
    - [X] CreateElement;
    - [X] RemoveElement;
*/

// O========================================================================================O

// Função para criar um novo elemento químico:
const createElement = async (req, res) => {
    // Verifica se o usuário tem permissão para criar um elemento químico:
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

    // Verifica se o usuário tem permissão para criar um elemento químico no laboratório:
    const GetLabUser = await labModels.GetLabUser(lab_id, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    };

    // Cria o elemento químico:
    const { nome, quantidade, descricao, peso_molecular, numero_cas, numero_ec, estado_fisico, imagem } = req.body;

    const CreateElement = await elementsModels.CreateElement(nome, quantidade, descricao, peso_molecular, numero_cas, numero_ec, estado_fisico, imagem, lab_id);

    if (CreateElement.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao criar o elemento químico."
        });
    }

    return res.status(201).json({
        status: true,
        message: "Elemento químico criado com sucesso."
    });
};

// O========================================================================================O

// O========================================================================================O

// Função para remover um elemento químico:
const removeElement = async (req, res) => {
    // Verifica se o usuário tem permissão para remover um elemento químico:
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para remover um elemento químico e se o elemento químico existe:
    const { element_id } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    console.log("GetElementById: ", GetElementById);

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    };

    // Remove o elemento químico:
    const RemoveElement = await elementsModels.RemoveElement(element_id);

    if (RemoveElement.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao remover o elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Elemento químico removido com sucesso."
    });
};


// O========================================================================================O

/*
    O===============================================================================O
    |    Funções de controllers relacionadas a atualização de elementos químicos    |
    O===============================================================================O
 
    Funções de controllers relacionadas a atualização de elementos químicos:
    - [X] EditName;
    - [X] EditQuantity;
    - [X] EditDescription;
    - [X] EditMolarMass;
    - [X] EditCasNumber;
    - [X] EditEcNumber;
    - [X] EditPhysicalState;
    - [X] EditImage;
*/

// O========================================================================================O

// Função para editar o nome de um elemento químico:
const editName = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar o nome do elemento químico:
    const { element_id, nome } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita o nome do elemento químico:
    const EditName = await elementsModels.EditName(element_id, nome);

    if (EditName.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar o nome do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Nome do elemento químico editado com sucesso."
    });
};

// O========================================================================================O

// O========================================================================================O

// Função para editar a quantidade de um elemento químico:
const editQuantity = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar a quantidade do elemento químico:
    const { element_id, quantidade } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita a quantidade do elemento químico:
    const EditQuantity = await elementsModels.EditQuantity(element_id, quantidade);

    if (EditQuantity.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a quantidade do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Quantidade do elemento químico editada com sucesso."
    });
}

// O========================================================================================O

// O========================================================================================O

// Função para editar a descrição de um elemento químico:
const editDescription = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar a descrição do elemento químico:
    const { element_id, descricao } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita a descrição do elemento químico:
    const EditDescription = await elementsModels.EditDescription(element_id, descricao);

    if (EditDescription.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a descrição do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Descrição do elemento químico editada com sucesso."
    });
}

// O========================================================================================O

// O========================================================================================O

// Função para editar a massa molar de um elemento químico:
const editMolarMass = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar a massa molar do elemento químico:
    const { element_id, peso_molecular } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita a massa molar do elemento químico:
    const EditMolarMass = await elementsModels.EditMolarMass(element_id, peso_molecular);

    if (EditMolarMass.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a massa molar do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Massa molar do elemento químico editada com sucesso."
    });
}

// O========================================================================================O

// O========================================================================================O

// Função para editar o número CAS de um elemento químico:
const editCasNumber = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar o número CAS do elemento químico:
    const { element_id, numero_cas } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita o número CAS do elemento químico:
    const EditCasNumber = await elementsModels.EditCasNumber(element_id, numero_cas);

    if (EditCasNumber.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar o número CAS do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Número CAS do elemento químico editado com sucesso."
    });
};

// O========================================================================================O

// O========================================================================================O

// Função para editar o número EC de um elemento químico:
const editEcNumber = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar o número EC do elemento químico:
    const { element_id, numero_ec } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita o número EC do elemento químico:
    const EditEcNumber = await elementsModels.EditEcNumber(element_id, numero_ec);

    if (EditEcNumber.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar o número EC do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Número EC do elemento químico editado com sucesso."
    });
}

// O========================================================================================O

// O========================================================================================O

// Função para editar o estado físico
const editPhysicalState = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar o estado físico do elemento químico:
    const { element_id, estado_fisico } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita o estado físico do elemento químico:
    const EditPhysicalState = await elementsModels.EditPhysicalState(element_id, estado_fisico);

    if (EditPhysicalState.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar o estado físico do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Estado físico do elemento químico editado com sucesso."
    });
};

// O========================================================================================O

// O========================================================================================O

// Função para editar a imagem de um elemento químico:
const editImage = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = JWT.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(404).json({
            status: false,
            message: "Usuário não encontrado."
        });
    }

    // Verifica se o usuário tem permissão para editar a imagem do elemento químico:
    const { element_id, imagem } = req.body;
    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    const GetLabUser = await labModels.GetLabUser(GetElementById.data.ID_lab, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel < 2) {
        return res.status(401).json({
            status: false,
            message: "Usuário não autorizado."
        });
    }

    // Edita a imagem do elemento químico:
    const EditImage = await elementsModels.EditImage(element_id, imagem);

    if (EditImage.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao editar a imagem do elemento químico."
        });
    }

    return res.status(200).json({
        status: true,
        message: "Imagem do elemento químico editada com sucesso."
    });
}

// O========================================================================================O

/*
    O=========================================================================O
    |    Funções de controllers relacionadas a busca de elementos químicos    |
    O=========================================================================O
 
    Funções de controllers relacionadas a busca de elementos químicos:
    - [X] GetElementById;
    - [X] GetElementsByLabId;
    - [X] GetElementByName;
    - [X] GetElementByCasNumber;
    - [X] GetElementByEcNumber;
*/

// O========================================================================================O

// Função para buscar um elemento químico pelo ID:
const getElementById = async (req, res) => {
    const { element_id } = req.body;

    const GetElementById = await elementsModels.GetElementById(element_id);

    if (GetElementById.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetElementById.data
    });
}

// Função para buscar elementos químicos por ID do laboratório:
const getElementsByLabId = async (req, res) => {
    const { lab_id } = req.body;

    const GetElementsByLabId = await elementsModels.GetElementsByLabId(lab_id);

    if (GetElementsByLabId.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elementos químicos não encontrados."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetElementsByLabId.data
    });
}

// Função para buscar um elemento químico pelo nome:
const getElementByName = async (req, res) => {
    const { nome } = req.body;

    const GetElementByName = await elementsModels.GetElementByName(nome);

    if (GetElementByName.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetElementByName.data
    });
}

// Função para buscar um elemento químico pelo número CAS:
const getElementByCasNumber = async (req, res) => {
    const { numero_cas } = req.body;

    const GetElementByCasNumber = await elementsModels.GetElementByCasNumber(numero_cas);

    if (GetElementByCasNumber.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetElementByCasNumber.data
    });
}

// Função para buscar um elemento químico pelo número EC:
const getElementByEcNumber = async (req, res) => {
    const { numero_ec } = req.body;

    const GetElementByEcNumber = await elementsModels.GetElementByEcNumber(numero_ec);

    if (GetElementByEcNumber.status === false) {
        return res.status(404).json({
            status: false,
            message: "Elemento químico não encontrado."
        });
    }

    return res.status(200).json({
        status: true,
        data: GetElementByEcNumber.data
    });
}

// O========================================================================================O

module.exports = {
    /* Create */
    createElement,
    removeElement,

    /* Edit */
    editName,
    editQuantity,
    editDescription,
    editMolarMass,
    editCasNumber,
    editEcNumber,
    editPhysicalState,
    editImage,

    /* Get */
    getElementById,
    getElementsByLabId,
    getElementByName,
    getElementByCasNumber,
    getElementByEcNumber,
};