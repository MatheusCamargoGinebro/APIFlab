/*
    O===========================================O
    |   Arquivo Models relacionado a usuários   |
    O===========================================O
*/

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

/*  
    O=========================================================O
    |    Funções de Models relacionadas a código de emails    |
    O=========================================================O
*/
// Função para salvar o código de confirmação de email no banco de dados:
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

// Função para recuperar o código de confirmação de email do banco de dados:
const getMailCode = async (email) => {
    const query = "SELECT Checkcode FROM email_codes WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    if (result.length > 0) {
        return { code: result[0].Checkcode, status: true };
    } else {
        return { code: null, status: false };
    }
};

// Função para deletar o código de confirmação já utilizado ou cancelado no banco de dados:
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

/*
    O=====================================================================O
    |    Funções de Models relacionadas a existência de dados no banco    |
    O=====================================================================O

*/
// Função para verificar se o email já está cadastrado no banco de dados:
const checkEmail = async (email) => {
    const query = "SELECT * FROM usuarios WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

// Função para verificar se o nome de usuário já está cadastrado no banco de dados:
const checkUsername = async (nome) => {
    const query = "SELECT * FROM usuarios WHERE Nome = ?;";

    const [result] = await connection.execute(query, [nome]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

// Função para verificar se o campus existe no banco de dados:
const checkCampus = async (ID_campus) => {
    const query = "SELECT * FROM campus WHERE ID_campus = ?;";
    const [result] = await connection.execute(query, [ID_campus]);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
};

/*
    O=================================================O
    |    Funções de Models relacionadas a usuários    |
    O=================================================O
*/
// Função para registrar um usuário no banco de dados:
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

// Função para recuperar informações do usuário (ID, Salt e Senha) para verificação de login:
const getInfo = async (email) => {
    const query =
        "SELECT ID_usuario, Salt, Senha FROM usuarios WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    return result[0];
};

// Função para verificar se o login é válido:
const loginUser = async (email, senha) => {
    const query =
        "SELECT Nome, Email FROM usuarios WHERE Email = ? AND Senha = ?;";
    const [result] = await connection.execute(query, [email, senha]);

    if (result.length > 0) {
        return { status: true, message: "Login é válido" };
    } else {
        return { status: false, message: "Email ou senha incorretos" };
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
};

// O============================================================================================O
