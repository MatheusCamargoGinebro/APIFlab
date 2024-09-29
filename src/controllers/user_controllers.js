const { hash } = require("bcryptjs");
const userModels = require("../models/user_models");
const passwordTreatment = require("../utils/password_treatment");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const userRegister = async (req, res) => {
    const { nome, email, senha, tipo, id_campus, code } = req.body;

    // Verificação do código de confirmação:
    /* const mailCode = await userModels.getMailCode(email);

    console.log("1: " + mailCode.code);

    if (mailCode.status === false) {
        return res.status(400).json({ message: "Email não confirmado" });
    }

    console.log("1.1: " + mailCode.code);
    console.log("2.1: " + code);
    const hashedCode = await passwordTreatment.encodeMailCode(code.toString());
    console.log("2.2: " + hashedCode);

    const result = await passwordTreatment.comparePasswords(
        hashedCode,
        mailCode.code
    );

    if (result === false) {
        return res
            .status(400)
            .json({ message: "Código de confirmação inválido" });
    }

    userModels.deleteMailCode(email); */

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

    if (status.nome === false) {
        return res.status(400).json({ message: status.message });
    }

    if (status.email === false) {
        return res.status(400).json({ message: status.message });
    }

    if (status.id_campus === false) {
        return res.status(400).json({ message: status.message });
    }

    res.status(201).json({ message: status.message });
};

const mailCheck = async (req, res) => {
    const email = req.body.email;
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    // Gerando um número aleatório de 10000 a 99999:

    const code = Math.floor(Math.random() * 89999 + 10000);
    const hashCode = await passwordTreatment.encodeMailCode(code.toString());

    transporter
        .sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Confirmação de email",
            text: "Seu código de confirmação é: " + code,
        })
        .then(() => {
            // Salvando o código no banco de dados:
            userModels.deleteMailCode(email);
            const result = userModels.saveMailCode(email, hashCode);

            if (result === false) {
                return res.status(500).json({
                    message: "Erro ao salvar código de confirmação",
                });
            } else {
                return res.status(200).json({
                    message: "Código de confirmação salvo com sucesso!",
                });
            }
        })
        .catch((error) => {
            console.log("Erro ao enviar email de confirmação: " + error);
            res.status(500).json({
                message: "Erro ao enviar email de confirmação",
            });
        });
};

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

const userLogout = async (req, res) => {
    blacklist.push(req.headers["x-access-token"]);

    res.status(200).json({ message: "Logout efetuado com sucesso!" });
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
    mailCheck,
};
