// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas a edição de usuário  |
    O=========================================================O

    Funções relacionadas a edição de usuário:
    - [X] editUserName;
    - [X] editUserEmail;
    - [X] editUserPassword;
    - [X] editUserPic;
    - [x] editUserType;
    - [x] editUserCampusLevel;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:s
const JWT = require("jsonwebtoken");

// Módulo dos Models Write de usuário:
const UserWrite = require("../../models/user/userOperations/userWriteModels");

// Módulo dos Models Read de usuário:
const UserRead = require("../../models/user/userOperations/userReadModels");

// Módulo dos Models de verificação de código de email:
const MailCodeModels = require("../../models/user/accountValidation/mailCodesModels");

// Módulo de tratamento de senhas:
const passwordTreat = require("../../utils/password_treatment");

// O========================================================================================O

// Função para editar o nome de um usuário:
const editUserName = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { user_name } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o nome de usuário já está cadastrado:
  const nameCheck = await UserRead.getUserByName(user_name);

  if (nameCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Nome de usuário já cadastrado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nome do usuário:
  const result = await UserWrite.editUserName(userId, user_name);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar nome de usuário.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Nome de usuário editado.",
  });
};

// O========================================================================================O

// Função para editar o email de um usuário:
const editUserEmail = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;
  const { user_email, validationCode } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o código de confirmação é válido:
  const mailCodeCheck = await MailCodeModels.getMailCode(
    user_email,
    validationCode
  );

  if (mailCodeCheck === false || validationCode !== mailCodeCheck.code) {
    return res.status(400).json({
      status: false,
      message: "Código de confirmação não vinculado ao email.",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o email já está cadastrado:
  const emailCheck = await UserRead.getUserByEmail(user_email);

  if (emailCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Email já cadastrado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o email do usuário:
  const result = await UserWrite.editUserEmail(userId, user_email);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar email.",
    });
  }

  /*-----------------------------------------------------*/

  // Deletando o código de confirmação:
  const deleteMailCode = await MailCodeModels.deleteMailCode(user_email);

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Email editado.",
  });
};

// O========================================================================================O

// Função para editar a senha de um usuário:
const editUserPassword = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;
  const { user_password } = req.body;

  /*-----------------------------------------------------*/

  // Criptografia da senha:
  const salt = await passwordTreat.saltGenerator();
  const hashedPassword = await passwordTreat.hashPasswordGenerator(
    user_password,
    salt
  );

  /*-----------------------------------------------------*/

  const result = await UserWrite.editUserPassword(userId, hashedPassword, salt);

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Não foi possível alterar a senha.",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Senha alterada.",
  });
};

// O========================================================================================O

// Função para editar a foto de perfil de um usuário:
const editUserPic = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;
  const { user_profpic } = req.body;

  /*-----------------------------------------------------*/

  // Editando a foto de perfil do usuário:
  const result = await UserWrite.editUserPic(userId, user_profpic);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar foto de perfil.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Foto de perfil editada.",
  });
};

// O========================================================================================O

// Função para editar o tipo de usuário:
const editUserType = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;
  const { user_type } = req.body;

  /*-----------------------------------------------------*/

  // Editando o tipo de usuário:
  const result = await UserWrite.editUserType(userId, user_type);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar tipo de usuário.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Tipo de usuário editado.",
  });
};

// O========================================================================================O

// Função para editar o nível de administração de um usuário em um campus:
const editUserCampusLevel = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;
  const { user_id, user_adminLevel } = req.body;

  /*-----------------------------------------------------*/

  // Verificar se os usuários existem e são do mesmo campus:
  const getActorById = await UserRead.getUserById(userId);

  const getUserToEdit = await UserRead.getUserById(user_id);

  if (
    getActorById.status === false ||
    getUserToEdit.status === false ||
    getActorById.userData.campusId !== getUserToEdit.userData.campusId
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuários inválidos!",
    });
  }

  /*-----------------------------------------------------*/

  // Editar nível de administração do usuário:
  const result = await UserWrite.editUserAdminLevel(user_id, user_adminLevel);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar nível de administração.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Nível de administração editado.",
  });
};

// O========================================================================================O

// Exportando módulos:
module.exports = {
  editUserName,
  editUserEmail,
  editUserPassword,
  editUserPic,
  editUserType,
  editUserCampusLevel,
};

// O========================================================================================O
