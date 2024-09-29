const connection = require("../utils/connection");

const saveMailCode = async (email, code) => {
    const query = "INSERT INTO email_codes (Email, Checkcode) VALUES (?, ?);";
    const [result] = await connection.execute(query, [email, code]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Código de confirmação salvo" };
    } else {
        return {
            status: false,
            message: "Erro ao salvar código de confirmação",
        };
    }
};

const getMailCode = async (email) => {
    const query = "SELECT Checkcode FROM email_codes WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    if (result.length > 0) {
        return { code: result[0].Checkcode, status: true };
    } else {
        return { code: null, status: false };
    }
};

const deleteMailCode = async (email) => {
    // Verifica se o código de confirmação existe:
    const mailCode = await getMailCode(email);

    if (mailCode.status === false) {
        return {
            status: false,
            message: "Código de confirmação não encontrado",
        };
    }

    // Deleta o código de confirmação:
    const query = "DELETE FROM email_codes WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Código de confirmação deletado" };
    } else {
        return {
            status: false,
            message: "Erro ao deletar código de confirmação",
        };
    }
};

const checkUsername = async (nome) => {
    const query = "SELECT * FROM usuarios WHERE Nome = ?;";

    const [result] = await connection.execute(query, [nome]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

const checkEmail = async (email) => {
    const query = "SELECT * FROM usuarios WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

const checkCampus = async (ID_campus) => {
    const query = "SELECT * FROM campus WHERE ID_campus = ?;";
    const [result] = await connection.execute(query, [ID_campus]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

const registerUser = async (nome, email, senha, tipo, salt, ID_campus) => {
    // Salvando no banco de dados (todos os dados já foram verificados)
    const query =
        "INSERT INTO usuarios (Nome, Email, Senha, Tipo, Salt, ID_campus) VALUES (?, ?, ?, ?, ?, ?);";
    const [result] = await connection.execute(query, [
        nome,
        email,
        senha,
        tipo,
        salt,
        ID_campus,
    ]);

    if (result.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
};

const getInfo = async (email) => {
    const query =
        "SELECT ID_usuario, Salt, Senha FROM usuarios WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    return result[0];
};

const loginUser = async (email, senha) => {
    const query =
        "SELECT Nome, Email FROM usuarios WHERE Email = ? AND Senha = ?;";
    const [result] = await connection.execute(query, [email, senha]);
};

const checkBlacklist = async (token) => {
    const query = "SELECT * FROM blacklist WHERE Token = ?;";
    const [result] = await connection.execute(query, [token]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

const addTokenToBlackList = async (token) => {
    // Verifica se o token já está na blacklist
    const check = await checkBlacklist(token);

    if (check === true) {
        return { status: false, message: "Token já está na blacklist" };
    }

    // Adiciona o token à blacklist
    const query = "INSERT INTO blacklist (Token) VALUES (?);";
    const [result] = await connection.execute(query, [token]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Token adicionado à blacklist" };
    } else {
        return {
            status: false,
            message: "Erro ao adicionar token à blacklist",
        };
    }
};

module.exports = {
    checkEmail,
    checkUsername,
    checkCampus,
    registerUser,
    getInfo,
    loginUser,
    saveMailCode,
    getMailCode,
    deleteMailCode,
    checkBlacklist,
    addTokenToBlackList,
};
