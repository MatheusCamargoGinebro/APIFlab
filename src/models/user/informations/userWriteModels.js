// O====================================================================================O

/*
    O=================================================O
    |    Funções de Models relacionadas a usuários    |
    O=================================================O

    Funções relacionadas a usuários:
    - [X] RegisterUser;
    - [X] EditUser;
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

// Função para editar informações do usuário:
const EditUser = async (userID, newUserData) => {
  const {
    newName,
    newEmail,
    newPassword,
    newSalt,
    newProfilePicture,
    newType,
    newLevel,
  } = newUserData;

  // Editando no banco de dados:
  const query = "CALL EditUser(?, ?, ?, ?, ?, ?);";
  const [result] = await execute(query, [
    userID,
    newName,
    newEmail,
    newPassword,
    newSalt,
    newProfilePicture,
    newType,
    newLevel,
  ]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Informações de usuário atualizadas" };
  } else {
    return {
      status: false,
      message: "Erro ao atualizar informações de usuário",
    };
  }
};

// O====================================================================================O

// Função para editar o nível de laboratório de um usuário:
const EditUserLevel = async (userID, LabID, newLevel) => {
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
module.exports = { registerUser, EditUser, EditUserLevel };

// O====================================================================================O