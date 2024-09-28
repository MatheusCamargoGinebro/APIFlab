const userModels = require("../models/user_models");
const passwordTreatment = require("../utils/password_treatment");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
    const { nome, email, senha, tipo, id_campus } = req.body;
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
    res.send("Edit Route!");
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
};
