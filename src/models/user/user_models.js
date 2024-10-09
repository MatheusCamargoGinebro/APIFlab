/*
    O===========================================O
    |   Arquivo Models relacionado a usuários   |
    O===========================================O
*/

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

// O====================================================================================O
/*  
    O=========================================================O
    |    Funções de Models relacionadas a código de emails    |
    O=========================================================O

    Funções relacionadas a códigos de email:
    - [X] SaveMailCode;
    - [X] GetMailCode;
    - [X] DeleteMailCode;
*/
// O====================================================================================O

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

// O====================================================================================O

/*
    O=================================================O
    |    Funções de Models relacionadas a usuários    |
    O=================================================O

    Funções relacionadas a usuários:
    - [X] RegisterUser;
    - [X] LoginUser;
*/

// O====================================================================================O

// Função para registrar um usuário no banco de dados:
const registerUser = async (
    nome,
    email,
    senha,
    tipo,
    salt,
    ID_campus,
    CampusAdminLevel
) => {
    // Salvando no banco de dados (todos os dados já foram verificados)
    const query =
        "INSERT INTO usuarios (Nome, Email, Senha, Tipo, Salt, ID_campus, CampusAdminLevel) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const [result] = await connection.execute(query, [
        nome,
        email,
        senha,
        tipo,
        salt,
        ID_campus,
        CampusAdminLevel,
    ]);

    if (result.affectedRows > 0) {
        return true;
    } else {
        return false;
    }
};

// Função para verificar se o login é válido:
const loginUser = async (email, senha) => {
    const query = "SELECT * FROM usuarios WHERE Email = ? AND Senha = ?;";
    const [result] = await connection.execute(query, [email, senha]);

    if (result.length > 0) {
        return { status: true, message: "Login é válido" };
    } else {
        return { status: false, message: "Email ou senha incorretos" };
    }
};

// O====================================================================================O

/*
    O===============================================O
    |    Funções de Models relacionadas a edição    |
    O===============================================O

    Funções relacionadas a edição de dados de usuários:
    - [X] EditUserName;
    - [X] EditUserEmail;
    - [X] EditUserPassword;
    - [X] EditUserProfilePicture;
*/

// O====================================================================================O

// Função para editar o nome de usuário:
const editUserName = async (userID, newName) => {
    const query = "UPDATE usuarios SET Nome = ? WHERE ID_usuario = ?;";
    const [result] = await connection.execute(query, [newName, userID]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Nome de usuário atualizado" };
    } else {
        return { status: false, message: "Erro ao atualizar nome de usuário" };
    }
};

// Função para editar o email do usuário:
const editUserEmail = async (userID, newEmail) => {
    const query = "UPDATE usuarios SET Email = ? WHERE ID_usuario = ?;";
    const [result] = await connection.execute(query, [newEmail, userID]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Email de usuário atualizado" };
    } else {
        return { status: false, message: "Erro ao atualizar email de usuário" };
    }
};

// Função para editar a senha do usuário:
const editUserPassword = async (userID, newPassword, newSalt) => {
    const query =
        "UPDATE usuarios SET Senha = ?, Salt = ? WHERE ID_usuario = ?;";
    const [result] = await connection.execute(query, [
        newPassword,
        newSalt,
        userID,
    ]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Senha de usuário atualizada" };
    } else {
        return { status: false, message: "Erro ao atualizar senha de usuário" };
    }
};

// Função para editar a foto de perfil do usuário:
const editUserProfilePicture = async (userID, newProfilePicture) => {
    const query = "UPDATE usuarios SET profilePic = ? WHERE ID_usuario = ?;";
    const [result] = await connection.execute(query, [
        newProfilePicture,
        userID,
    ]);

    if (result.affectedRows > 0) {
        return { status: true, message: "Foto de perfil atualizada" };
    } else {
        return { status: false, message: "Erro ao atualizar foto de perfil" };
    }
};

// O====================================================================================O

/*
    O============================================O
    |    Funções de Models relacionadas a get    |
    O============================================O

    Funções relacionadas a pegar informações de usuários:
    - [X] GetUserByID;
    - [X] GetUserByEmail;
    - [X] GetUserByName;
    - [X] GetUserbyCampus;
*/

// O====================================================================================O

// Função para pegar informações do usuário pelo ID:
const getUserByID = async (ID_usuario) => {
    const query = "SELECT * FROM usuarios WHERE ID_usuario = ?;";
    const [result] = await connection.execute(query, [ID_usuario]);

    if (result.length > 0) {
        return { status: true, userData: result[0] };
    } else {
        return { status: false, userData: null };
    }
};

// Função para pegar informações do usuário pelo email:
const getUserByEmail = async (email) => {
    const query = "SELECT * FROM usuarios WHERE Email = ?;";
    const [result] = await connection.execute(query, [email]);

    if (result.length > 0) {
        return { status: true, userData: result[0] };
    } else {
        return { status: false, userData: null };
    }
};

// Função para pegar informações do usuário pelo nome de usuário:
const getUserByName = async (username) => {
    const query = "SELECT * FROM usuarios WHERE Nome = ?;";
    const [result] = await connection.execute(query, [username]);

    if (result.length > 0) {
        return { status: true, userData: result[0] };
    } else {
        return { status: false, userData: null };
    }
};

// Função para pegar todos os usuários de um campus:
const getUsersByCampus = async (ID_campus) => {
    const query = "SELECT * FROM usuarios WHERE ID_campus = ?;";
    const [result] = await connection.execute(query, [ID_campus]);

    if (result.length > 0) {
        return { status: true, userData: result };
    } else {
        return { status: false, userData: null };
    }
};

// Função para pegar um usuário específico de um campus:
const getUserByCampus = async (ID_usuario, ID_campus) => {
    const query =
        "SELECT * FROM usuarios WHERE ID_usuario = ? AND ID_campus = ?;";
    const [result] = await connection.execute(query, [ID_usuario, ID_campus]);

    if (result.length > 0) {
        return { status: true, userData: result[0] };
    } else {
        return { status: false, userData: null };
    }
};

// O====================================================================================O

module.exports = {
    /* Código de email */
    saveMailCode,
    deleteMailCode,

    /* Account */
    registerUser,
    loginUser,

    /* Edit */
    editUserName,
    editUserEmail,
    editUserPassword,
    editUserProfilePicture,

    /* Get */
    getUserByID,
    getUserByEmail,
    getUserByName,
    getUsersByCampus,
    getMailCode,
    getUserByCampus,
};

// O============================================================================================O
