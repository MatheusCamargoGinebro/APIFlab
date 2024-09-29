const userModels = require("../models/user_models");
const passwordTreatment = require("../utils/password_treatment");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

// ======================================= Registrando usuário =======================================

// Função para verificar se o código de confirmação de email é válido:
const checkMailCode = async (mail, code) => {
    const mailCode = await userModels.getMailCode(mail);

    if (mailCode.status === false) {
        return false;
    }

    if (code !== mailCode.code) {
        return false;
    }

    userModels.deleteMailCode(mail);
    return true;
};

// Função para enviar o código de confirmação de email:
const sendMailCode = async (req, res) => {
    const email = req.body.email;
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    // Gerando um número aleatório de 10000 a 99999:
    const code = Math.floor(Math.random() * 89999 + 10000);

    transporter
        .sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Confirmação de email",
            text: "Seu código de confirmação é: " + code,
        })
        .catch((error) => {
            res.status(500).json({
                message: "Erro ao enviar email de confirmação" + error,
            });
        });

    // Salvando o código no banco de dados:
    await userModels.deleteMailCode(email);

    const result = await userModels.saveMailCode(email, code.toString());

    if (result.status === true) {
        return res.status(200).json({
            message: "Código de confirmação enviado com sucesso!",
        });
    } else {
        return res.status(500).json({
            message: "Erro ao enviar código de confirmação",
        });
    }
};

// Função para registrar um usuário:
const userRegister = async (req, res) => {
    const { nome, email, senha, tipo, id_campus, code } = req.body;

    // Verificando se o código de confirmação é válido:
    const mailCodeCheck = await checkMailCode(email, code);

    if (mailCodeCheck === false) {
        return res.status(400).json({
            message: "Código de confirmação não vinculado ao email",
        });
    }

    // Verificando se o campus existe:
    const campusCheck = await userModels.checkCampus(id_campus);

    if (campusCheck === false) {
        return res.status(400).json({
            message: "Campus não encontrado",
        });
    }

    // Verificando se o email já está cadastrado:
    const emailCheck = await userModels.checkEmail(email);

    if (emailCheck === true) {
        return res.status(400).json({
            message: "Email já cadastrado",
        });
    }

    // Verificando se o nome de usuário já está cadastrado:
    const usernameCheck = await userModels.checkUsername(nome);

    if (usernameCheck === true) {
        return res.status(400).json({
            message: "Nome de usuário já cadastrado",
        });
    }

    // Criptografia da senha:
    const salt = await passwordTreatment.saltGenerator();
    const hashedPassword = await passwordTreatment.hashPasswordGenerator(
        senha,
        salt
    );

    const status = await userModels.registerUser(
        nome,
        email,
        hashedPassword,
        tipo,
        salt,
        id_campus
    );

    if (status === true) {
        return res.status(200).json({
            message: "Usuário cadastrado com sucesso!",
        });
    } else {
        return res.status(500).json({
            message: "Erro ao cadastrar usuário",
        });
    }
};

// ======================================= Login e Logout de usuário =======================================

// Função para realizar o login de um usuário:
const userLogin = async (req, res) => {
    const { email, senha } = req.body;

    const userInfo = await userModels.getInfo(email);

    if (userInfo === undefined || userInfo === null || userInfo.length === 0) {
        return res.status(401).json({
            auth: false,
            token: null,
            message: "Usuário ou senha inválidos",
        });
    }

    // Comparando senhas:
    const result = await passwordTreatment.comparePasswords(
        senha,
        userInfo.Salt,
        userInfo.Senha
    );

    if (result === false) {
        return res.status(401).json({
            auth: false,
            token: null,
            message: "Usuário ou senha inválidos",
        });
    } else {
        const token = jwt.sign(
            { userID: userInfo.ID_usuario },
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
    }
};

// Função para realizar o logout de um usuário:
const userLogout = async (req, res) => {
    const token = req.headers["x-access-token"];

    const status = await userModels.addTokenToBlackList(token);

    if (status === true) {
        return res.status(200).json({
            message: "Logout realizado com sucesso!",
        });
    } else {
        return res.status(500).json({
            message: "Erro ao realizar logout",
        });
    }
};

const userEdit = async (req, res) => {
    const { nome, email, senha, tipo, profilePic } = req.body;
};

const userDelete = async (req, res) => {
    res.send("Delete Route!");
};

const userReservations = async (req, res) => {
    res.send("Reservations Route!");
};

module.exports = {
    userRegister,
    userLogin,
    userEdit,
    userDelete,
    userReservations,
    userLogout,
    sendMailCode,
};
