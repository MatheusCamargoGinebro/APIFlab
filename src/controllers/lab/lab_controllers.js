/*
    O=======================================================O
    |   Funções de controle relacionadas aos laboratórios   |
    O=======================================================O
*/

// Importando o modelo de laboratórios:
const labModels = require("../../models/lab/lab_models");
const userModels = require("../../models/user/user_models");
const jwt = require("jsonwebtoken");

// O========================================================================================O

/*
    O==========================================O
    |   Funções de controle de Laboratórios    |
    O==========================================O
*/

// Registrar um laboratório:
const registerLab = async (request, response) => {
    const sala = request.body.sala;

    // Verificar se a sala já está cadastrada no banco de dados:
    const checkLab = await labModels.checkLabName(sala);

    if (checkLab.status) {
        return response
            .status(400)
            .json({ message: "Sala já cadastrada!", status: false });
    }

    // Verifica qual é o instituto do usuário:
    const token = request.headers["authorization"];
    const userID = jwt.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (!getUserByID.status) {
        return response
            .status(400)
            .json({ message: "Impossível saber qual campus do usuário" });
    }

    
};

// O========================================================================================O

module.exports = {
    registerLab,
};

// O========================================================================================O
