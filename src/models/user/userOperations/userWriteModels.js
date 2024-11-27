// O====================================================================================O

/*
    O=================================================O
    |    Funções de Models relacionadas a usuários    |
    O=================================================O

    Funções relacionadas a usuários:
    - [X] registerUser;
    - [X] editUserName;
    - [X] editUserEmail;
    - [X] editUserPassword;
    - [X] editUserPic;
    - [X] editUserType;
    - [X] editUserAdminLevel;
    - [X] editUserLabLevel;
*/

// O====================================================================================O

// Importando conexão com o banco de dados:
const connection = require("../../../utils/connection");

// O====================================================================================O

// Função para registrar um usuário no banco de dados:
const registerUser = async (newUser) => {
  const { nome, email, senha, tipo, salt, campusId, CampusAdminLevel } =
    newUser;

  // Salvando no banco de dados:
  const query = "CALL CreateUser(?, ?, ?, ?, ?, ?, ?);";
  const [result] = await connection.execute(query, [
    nome,
    email,
    senha,
    salt,
    tipo,
    campusId,
    CampusAdminLevel,
  ]);

  if (result.affectedRows > 0) {
    return true;
  } else {
    return false;
  }
};

// O====================================================================================O

// Função para editar o nome de um usuário:
const editUserName = async (userID, newName) => {
  // Editando no banco de dados:
  const query = "CALL EditUserName(?, ?);";
  const [result] = await connection.execute(query, [userID, newName]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Nome atualizado" };
  } else {
    return { status: false, message: "Erro ao atualizar nome" };
  }
};

// O====================================================================================O

// Função para editar o email de um usuário:
const editUserEmail = async (userID, newEmail) => {
  // Editando no banco de dados:
  const query = "CALL EditUserEmail(?, ?);";
  const [result] = await connection.execute(query, [userID, newEmail]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Email atualizado" };
  } else {
    return { status: false, message: "Erro ao atualizar email" };
  }
};

// O====================================================================================O

// Função para editar a senha de um usuário:
const editUserPassword = async (userID, newPassword, newSalt) => {
  // Editando no banco de dados:
  const query = "CALL EditUserPassword(?, ?, ?);";
  const [result] = await connection.execute(query, [userID, newPassword, newSalt]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Senha atualizada" };
  } else {
    return { status: false, message: "Erro ao atualizar senha" };
  }
};

// O====================================================================================O

// Função para editar a foto de perfil de um usuário:
const editUserPic = async (userID, newPic) => {
  // Editando no banco de dados:
  const query = "CALL EditUserPic(?, ?);";
  const [result] = await connection.execute(query, [userID, newPic]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Foto de perfil atualizada" };
  } else {
    return { status: false, message: "Erro ao atualizar foto de perfil" };
  }
};

// O====================================================================================O

// Função para editar o tipo de usuário:
const editUserType = async (userID, newType) => {
  // Editando no banco de dados:
  const query = "CALL EditUserType(?, ?);";
  const [result] = await connection.execute(query, [userID, newType]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Tipo atualizada" };
  } else {
    return { status: false, message: "Erro ao atualizar Tipo" };
  }
};

// O====================================================================================O

// Função para editar o nível de administração de um usuário:
const editUserAdminLevel = async (userID, newAdminLevel) => {
  // Editando no banco de dados:
  const query = "CALL EditUserCampusAdminLevel(?, ?);";
  const [result] = await connection.execute(query, [userID, newAdminLevel]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Nível de administração atualizado" };
  } else {
    return {
      status: false,
      message: "Erro ao atualizar nível de administração",
    };
  }
};

// O====================================================================================O

// Função para editar o nível de laboratório de um usuário:
const editUserLabLevel = async (userID, LabID, newLevel) => {
  // Editando no banco de dados:
  const query = "CALL EditUserLabLevel(?, ?, ?);";
  const [result] = await connection.execute(query, [userID, LabID, newLevel]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Nível de laboratório atualizado" };
  } else {
    return { status: false, message: "Erro ao atualizar nível de laboratório" };
  }
};

// O====================================================================================O

// Exportando funções:
module.exports = {
  registerUser,
  editUserName,
  editUserEmail,
  editUserPassword,
  editUserPic,
  editUserType,
  editUserAdminLevel,
  editUserLabLevel,
};

// O====================================================================================O
