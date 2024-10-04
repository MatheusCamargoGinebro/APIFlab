/*
    O===========================================================O
    |    Função para verificação de tokens no banco de dados    |
    O===========================================================O
*/

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

// Função para verificar se o token está na blacklist:
const checkBlacklist = async (token) => {
    const query = "SELECT * FROM blacklist WHERE Token = ?;";

    const [result] = await connection.execute(query, [token]);

    if (result.length > 0) {
        return { status: true, message: "Token na blacklist" };
    } else {
        return { status: false, message: "Token não está na blacklist" };
    }
};

// Função para adicionar token na blacklist:
const addTokenToBlackList = async (token) => {
    const query = "INSERT INTO blacklist (Token) VALUES (?);";

    const [result] = await connection.execute(query, [token]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Token adicionado na blacklist" };
    } else {
        return {
            status: false,
            message: "Erro ao adicionar token na blacklist",
        };
    }
};

const getAllBlacklist = async () => {
    const query = "SELECT * FROM blacklist;";

    const [result] = await connection.execute(query);

    return result;
};

const removeTokenFromBlacklist = async (token) => {
    const query = "DELETE FROM blacklist WHERE Token = ?;";

    const [result] = await connection.execute(query, [token]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Token removido da blacklist" };
    } else {
        return {
            status: false,
            message: "Erro ao remover token da blacklist",
        };
    }
};

const clearMailCodeList = async () => {
    const query = "DELETE FROM email_codes;";

    await connection.execute(query);

    return { status: true, message: "Códigos de email deletados" };
};

module.exports = {
    checkBlacklist,
    addTokenToBlackList,
    getAllBlacklist,
    removeTokenFromBlacklist,
    clearMailCodeList,
};
