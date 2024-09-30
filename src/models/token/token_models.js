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
        return true;
    } else {
        return false;
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

module.exports = {
    checkBlacklist,
    addTokenToBlackList,
};
