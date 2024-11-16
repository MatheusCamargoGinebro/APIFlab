// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas a edição de usuário  |
    O=========================================================O

    Funções relacionadas a edição de usuário:
    - [X] EditUserName;
    - [X] EditUserEmail;
    - [X] EditUserPassword;
    - [X] EditUserPic;
    - [X] EditUserType;
    - [X] EditUserCampusLevel; 
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Write de usuário:
import UserWrite from "../../models/user/userOperations/userWriteModels";

// Módulo dos Models Read de usuário:
import UserRead from "../../models/user/userOperations/userReadModels";

// Módulo dos Models de verificação de código de email:
import MailCodeModels from "../../models/user/accountValidation/mailCodesModels";

// Módulo de tratamento de senhas:
import passwordTreat from "../../utils/password_treatment";

// O========================================================================================O

// Função para editar o nome de um usuário:
const editUserName = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { newName } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o nome de usuário já está cadastrado:
  const nameCheck = await UserRead.checkUserName(newName);

  if (nameCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Nome de usuário já cadastrado",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nome do usuário:
  const result = await UserWrite.EditUserName(userId, newName);

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao atualizar nome de usuário",
    });
  }

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o email de um usuário:
const editUserEmail = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;
  const { newMail, validationCode } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o código de confirmação é válido:
  const mailCodeCheck = await MailCodeModels.getMailCode(
    newMail,
    validationCode
  );

  if (mailCodeCheck.status === false) {
    return res.status(400).json({
      message: "Código de confirmação não vinculado ao email",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o email já está cadastrado:
  const emailCheck = await UserRead.GetUserByEmail(newMail);

  if (emailCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Email já cadastrado",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o email do usuário:
  const result = await UserWrite.EditUserEmail(userId, newMail);

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao atualizar email",
    });
  }

  /*-----------------------------------------------------*/

  // Deletando o código de confirmação:
  const mailCodeDelete = await userModels.deleteMailCode(email);

  if (mailCodeDelete.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao deletar código de confirmação",
    });
  }

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar a senha de um usuário:
const editUserPassword = async (req, res) => {
  /*-----------------------------------------------------*/

  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;
  const { newPassword } = req.body;

  /*-----------------------------------------------------*/

  // Criptografia da senha:
  const salt = await passwordTreat.saltGenerator();
  const hashedPassword = await passwordTreat.hashPasswordGenerator(
    newPassword,
    salt
  );

  /*-----------------------------------------------------*/

  // Editando a senha do usuário:
  const result = await userModels.editUserPassword(
    userId,
    hashedPassword,
    salt
  );

  /*-----------------------------------------------------*/

  // Verificando se a senha foi atualizada:
  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao atualizar senha",
    });
  }

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar a foto de perfil de um usuário:
const EditUserPic = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { newProfilePic } = req.body;

  /*-----------------------------------------------------*/

  // Editando a foto de perfil do usuário:
  const result = await UserWrite.EditUserPic(userId, newProfilePic);

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao atualizar foto de perfil",
    });
  }

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o tipo de usuário:
const EditUserType = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { newUserType } = req.body;

  /*-----------------------------------------------------*/

  // Editando o tipo de usuário:
  const result = await UserWrite.EditUserType(userId, newUserType);

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao atualizar tipo de usuário",
    });
  }

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o nível de campus de um usuário:
const EditUserCampusLevel = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { newCampusLevel } = req.body;

  /*-----------------------------------------------------*/

  // Editando o nível de campus do usuário:
  const result = await UserWrite.EditUserCampusLevel(userId, newCampusLevel);

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao atualizar nível de campus",
    });
  }

  return res.status(200).json(result);
};

// O========================================================================================O

// Exportando módulos:
export default {
  editUserName,
  editUserEmail,
  editUserPassword,
  EditUserPic,
  EditUserType,
  EditUserCampusLevel,
};

// O========================================================================================O
