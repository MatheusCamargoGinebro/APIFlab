/*
    O==================================================================O
    |   Funções de controle relacionadas ao usuário e suas operações   |
    O==================================================================O
*/

// Importando módulos:
const userModels = require("../../models/user/user_models");

const passwordTreatment = require("../../utils/password_treatment");

const jwt = require("jsonwebtoken");






// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas a edição de usuário  |
    O=========================================================O

    Funções relacionadas a edição de usuário:
    - [X] EditUserName;
    - [X] EditUserEmail;
    - [X] EditUserPassword;
    - [X] EditUserProfilePicture;
*/

// O========================================================================================O



// Função para editar o email de um usuário:
const editUserEmail = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;
    const { email, code } = req.body;

    // Verificando se o código de confirmação é válido:
    const mailCodeCheck = await checkMailCode(email, code);

    if (mailCodeCheck === false) {
        return res.status(400).json({
            message: "Código de confirmação não vinculado ao email",
        });
    }

    // Deletando o código de confirmação:
    const mailCodeDelete = await userModels.deleteMailCode(email);

    if (mailCodeDelete.status === false) {
        return res.status(500).json({
            status: false,
            message: "Erro ao deletar código de confirmação",
        });
    }

    // Verificando se o email já está cadastrado:
    const emailCheck = await userModels.getUserByEmail(email);

    if (emailCheck.status === true) {
        return res.status(400).json({
            status: false,
            message: "Email já cadastrado",
        });
    }

    // Editando o email do usuário:
    const result = await userModels.editUserEmail(userID, email);

    if (result.status === true) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
};

// Função para editar a senha de um usuário:
const editUserPassword = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;
    const { senha } = req.body;

    // Criptografia da senha:
    const salt = await passwordTreatment.saltGenerator();
    const hashedPassword = await passwordTreatment.hashPasswordGenerator(
        senha,
        salt
    );

    const result = await userModels.editUserPassword(
        userID,
        hashedPassword,
        salt
    );

    if (result.status === true) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
};

// Função para editar a foto de perfil de um usuário:
const editUserProfilePicture = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const { profilePic } = req.body;

    const result = await userModels.editUserProfilePicture(userID, profilePic);

    if (result.status === true) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
};

// O========================================================================================O

module.exports = {
    /* Create */
    sendMailCode,
    userRegister,

    /* Account */
    userLogin,
    userLogout,

    /* Edit */
    editUserName,
    editUserEmail,
    editUserPassword,
    editUserProfilePicture,
};

// O========================================================================================O
