// O====================================================================================O

/*
    O=================================================O
    |    Funções de Models relacionadas a usuários    |
    O=================================================O

    Funções relacionadas a usuários:
    - [X] RegisterUser;
    - [X] EditUserName;
    - [X] EditUserEmail;
    - [X] EditUserPassword;
    - [X] EditUserType;
    - [X] EditUserLevel;
    - [X] EditUserLabLevel;
*/

// O====================================================================================O

// Importando conexão com o banco de dados:
import { execute } from "../../utils/connection";

// O====================================================================================O

// Função para registrar um usuário no banco de dados:
const registerUser = async (newUser) => {
  const { nome, email, senha, tipo, salt, ID_campus, CampusAdminLevel } =
    newUser;

  // Salvando no banco de dados:
  //const query = "INSERT INTO usuarios (Nome, Email, Senha, Tipo, Salt, ID_campus, CampusAdminLevel) VALUES (?, ?, ?, ?, ?, ?, ?);";

  const query = "CALL CreateUser(?, ?, ?, ?, ?, ?, ?);";
  const [result] = await execute(query, [
    nome,
    email,
    senha,
    salt,
    tipo,
    ID_campus,
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
const EditUserName = async (userID, newName) => {
  // Editando no banco de dados:
  const query = "CALL EditUserName(?, ?);";
  const [result] = await execute(query, [userID, newName]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Nome atualizado" };
  } else {
    return { status: false, message: "Erro ao atualizar nome" };
  }
};

// O====================================================================================O

// Função para editar o email de um usuário:
const EditUserEmail = async (userID, newEmail) => {
  // Editando no banco de dados:
  const query = "CALL EditUserEmail(?, ?);";
  const [result] = await execute(query, [userID, newEmail]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Email atualizado" };
  } else {
    return { status: false, message: "Erro ao atualizar email" };
  }
};

// O====================================================================================O

// Função para editar a senha de um usuário:
const EditUserPassword = async (userID, newPassword) => {
  // Editando no banco de dados:
  const query = "CALL EditUserPassword(?, ?);";
  const [result] = await execute(query, [userID, newPassword]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Senha atualizada" };
  } else {
    return { status: false, message: "Erro ao atualizar senha" };
  }
};

// O====================================================================================O

// Função para editar o tipo de usuário:
const EditUserType = async (userID, newType) => {
  // Editando no banco de dados:
  const query = "CALL EditUserType(?, ?);";
  const [result] = await execute(query, [userID, newType]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Tipo atualizada" };
  } else {
    return { status: false, message: "Erro ao atualizar Tipo" };
  }
};

// O====================================================================================O

// Função para editar o nível de um usuário:
const EditUserLevel = async (userID, newLevel) => {
  // Editando no banco de dados:
  const query = "CALL EditUserLevel(?, ?);";
  const [result] = await execute(query, [userID, newLevel]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Nível atualizado" };
  } else {
    return { status: false, message: "Erro ao atualizar nível" };
  }
};

// O====================================================================================O

// Função para editar o nível de administração de um usuário:
const EditUserAdminLevel = async (userID, newAdminLevel) => {
  // Editando no banco de dados:
  const query = "CALL EditUserCampusAdminLevel(?, ?);";
  const [result] = await execute(query, [userID, newAdminLevel]);

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
const EditUserLabLevel = async (userID, LabID, newLevel) => {
  // Editando no banco de dados:
  const query = "CALL EditUserLevel(?, ?);";
  const [result] = await execute(query, [userID, LabID, newLevel]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Nível de laboratório atualizado" };
  } else {
    return { status: false, message: "Erro ao atualizar nível de laboratório" };
  }
};

// O====================================================================================O

// Exportando funções:
export {
  registerUser,
  EditUserName,
  EditUserEmail,
  EditUserPassword,
  EditUserType,
  EditUserLevel,
  EditUserAdminLevel,
  EditUserLabLevel,
};

// O====================================================================================O
