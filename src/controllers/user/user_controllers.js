/*
    O==================================================================O
    |   Funções de controle relacionadas ao usuário e suas operações   |
    O==================================================================O
*/

// Importando módulos:
const userModels = require("../../models/user/user_models");
const tokenModels = require("../../models/token/token_models");
const campusModels = require("../../models/institute/institute_models");

const passwordTreatment = require("../../utils/password_treatment");

const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

// O========================================================================================O

/*
    O================================================================O
    |    Funções de verificação de código de confirmação de email    |
    O================================================================O

    Funções relacionadas a verificação de código de confirmação de email:
    - [X] CheckMailCode;
    - [X] SendMailCode;
*/

// O========================================================================================O

// Função para verificar se o código de confirmação de email é válido:
const checkMailCode = async (mail, code) => {
    const mailExistance = await userModels.getMailCode(mail);

    // Verificando se o email existe no banco de dados:
    if (mailExistance.status === false) {
        return false;
    }

    // Verificando se o código de confirmação é válido:
    if (mailExistance.code !== code) {
        return false;
    }

    return true;
};

// Função para enviar um código de confirmação de email:
const sendMailCode = async (req, res) => {
    const email = req.body.email;

    // Verificando se o email existe no banco de dados:
    const emailCheck = await userModels.getUserByEmail(email);

    if (emailCheck.status === true) {
        return res.status(400).json({
            status: false,
            message: "Email já cadastrado",
        });
    }

    // Configurações do nodemailer:
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    // Gerando um número aleatório de 10000 a 99999:
    const code = Math.floor(Math.random() * 89999 + 10000);

    // Enviando o email de confirmação:
    transporter
        .sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Confirmação de email",
            text: "Seu código de confirmação é: " + code,
        })
        .catch((error) => {
            res.status(500).json({
                status: false,
                message: "Erro ao enviar email de confirmação" + error,
            });
        });

    // Salvando o código no banco de dados:
    await userModels.deleteMailCode(email);

    const result = await userModels.saveMailCode(email, code.toString());

    if (result.status === true) {
        return res.status(200).json({
            status: true,
            message: "Código de confirmação enviado com sucesso!",
        });
    } else {
        return res.status(500).json({
            status: false,
            message: "Erro ao enviar código de confirmação",
        });
    }
};

// O========================================================================================O

/*
    O========================================================================O
    |   Funções de controle relacionadas a manipulação de usuário no banco   |
    O========================================================================O

    Funções relacionadas a manipulação de usuário no banco:
    - [X] UserRegister;
*/

// O========================================================================================O

// Função para registrar um novo usuário, com verificação de código de email criptografia de senha:
const userRegister = async (req, res) => {
    const { nome, email, senha, tipo, id_campus, code } = req.body;

    // Verifica se o código de confirmação é válido:
    const mailCodeCheck = await checkMailCode(email, code);

    if (mailCodeCheck === false) {
        return res.status(400).json({
            status: false,
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

    // Verifica se o campus existe:
    const campusCheck = await campusModels.checkCampusID(id_campus);

    if (campusCheck.status === false) {
        return res.status(400).json({
            status: false,
            message: "Campus não encontrado",
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

    // Verificando se o nome de usuário já está cadastrado:
    const nameCheck = await userModels.getUserByName(nome);

    if (nameCheck.status === true) {
        return res.status(400).json({
            status: false,
            message: "Nome de usuário já cadastrado",
        });
    }

    // Criptografia da senha:
    const salt = await passwordTreatment.saltGenerator();
    const hashedPassword = await passwordTreatment.hashPasswordGenerator(
        senha,
        salt
    );

    // Verificando quantos usuários já estão cadastrados no campus para definir o nível de adminstração do usuário:
    const usersInCampus = await userModels.getUserByCampus(id_campus);
    const CampusAdminLevel = usersInCampus.status === false ? 3 : 1;

    const status = await userModels.registerUser(
        nome,
        email,
        hashedPassword,
        tipo,
        salt,
        id_campus,
        CampusAdminLevel
    );

    if (status === true) {
        return res.status(200).json({
            status: true,
            message: "Usuário cadastrado com sucesso!",
        });
    } else {
        return res.status(500).json({
            status: false,
            message: "Erro ao cadastrar usuário",
        });
    }
};

// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas ao login e logout    |
    O=========================================================O

    Funções relacionadas ao login e logout de usuário:
    - [X] UserLogin;
    - [X] UserLogout;
*/

// O========================================================================================O

// Função para realizar o login de um usuário:
const userLogin = async (req, res) => {
    const { email, senha } = req.body;

    // Verificando se o email existe no banco de dados:
    const userInfo = await userModels.getUserByEmail(email);

    if (userInfo.status === false) {
        return res.status(401).json({
            auth: false,
            token: null,
            message: "Usuário ou senha inválidos",
        });
    }

    // Comparando senhas:
    const result = await passwordTreatment.comparePasswords(
        senha,
        userInfo.userData.Salt,
        userInfo.userData.Senha
    );

    if (result === false) {
        return res.status(401).json({
            auth: false,
            token: null,
            message: "Usuário ou senha inválidos",
        });
    }

    // Gerando token de autenticação:
    const token = jwt.sign(
        { userID: userInfo.userData.ID_usuario },
        process.env.JWT_SECRET,
        {
            expiresIn: 86400,
        }
    );

    return res.status(200).json({
        auth: true,
        token: token,
        message: "Login efetuado com sucesso!",
    });
};

// Função para realizar o logout de um usuário:
const userLogout = async (req, res) => {
    const token = req.headers["x-access-token"];

    const status = await tokenModels.addTokenToBlackList(token);

    if (status.status === true) {
        return res.status(200).json({
            message: "Logout efetuado com sucesso!",
        });
    } else {
        return res.status(500).json({
            message: "Erro ao efetuar logout",
        });
    }
};

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

// Função para editar o nome de um usuário:
const editUserName = async (req, res) => {
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const { nome } = req.body;

    // Verificando se o nome de usuário já está cadastrado:
    const nameCheck = await userModels.getUserByName(nome);

    if (nameCheck.status === true) {
        return res.status(400).json({
            status: false,
            message: "Nome de usuário já cadastrado",
        });
    }

    // Editando o nome do usuário:
    const result = await userModels.editUserName(userID, nome);

    if (result.status === true) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
};

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
