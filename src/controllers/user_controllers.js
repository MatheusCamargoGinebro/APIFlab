const userModels = require("../models/user_models");
const passwordTreatment = require("../utils/password_treatment");

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

    console.log(status);

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
    res.send("Login Route!");
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
};
