// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas a edição de usuário  |
    O=========================================================O

    Funções relacionadas a edição de usuário:
    - [X] EditUserName;
    - [X] EditUserEmail;
    - [X] EditUserPassword;
    - [X] editUserPic;
    - [x] EditUserType;
    - [x] EditUserCampusLevel;
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
  const nameCheck = await UserRead.GetUserByName(newName);

  if (nameCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Nome de usuário já cadastrado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nome do usuário:
  const result = await UserWrite.editUserName(userId, newName);

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
  const { newMail, validationCode } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o código de confirmação é válido:
  const mailCodeCheck = await MailCodeModels.getMailCode(
    newMail,
    validationCode
  );

  if (mailCodeCheck === false) {
    return res.status(400).json({
      message: "Código de confirmação não vinculado ao email.",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o email já está cadastrado:
  const emailCheck = await UserRead.getUserByEmail(newMail);

  if (emailCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Email já cadastrado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o email do usuário:
  const result = await UserWrite.EditUserEmail(userId, newMail);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar email.",
    });
  }

  /*-----------------------------------------------------*/

  // Deletando o código de confirmação:
  const mailCodeDelete = await MailCodeModels.deleteMailCode(newMail);

  if (mailCodeDelete.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao deletar código de confirmação",
    });
  }

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
  const { newPassword } = req.body;

  /*-----------------------------------------------------*/

  // Criptografia da senha:
  const salt = await passwordTreat.saltGenerator();
  const hashedPassword = await passwordTreat.hashPasswordGenerator(
    newPassword,
    salt
  );

  /*-----------------------------------------------------*/

  const result = await UserWrite.EditUserPassword(userId, hashedPassword, salt);

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
  const { newProfilePic } = req.body;

  /*-----------------------------------------------------*/

  // Editando a foto de perfil do usuário:
  const result = await UserWrite.EditUserPic(userId, newProfilePic);

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
  const { userType } = req.body;

  /*-----------------------------------------------------*/

  // Editando o tipo de usuário:
  const result = await userModels.editUserType(userId, userType);

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

// Função para editar o nível de um usuário:
const EditUserCampusLevel = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const responsableUserId = JWT.decode(token).userId;
  const { userType, userId } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário é administrador:
  const userCheck = await UserRead.GetUserByID(responsableUserId);

  if (userCheck.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado.",
    });
  }

  if (userCheck.userData.Tipo !== 3 || responsableUserId === userId) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para realizar operação.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o tipo de usuário:
  const result = await userModels.EditUserAdminLevel(
    responsableUserId,
    userType
  );

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

// Exportando módulos:
export {
  editUserName,
  editUserEmail,
  editUserPassword,
  editUserPic,
  editUserType,
  EditUserCampusLevel,
};

// O========================================================================================O
