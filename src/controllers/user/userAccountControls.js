// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas ao login e logout    |
    O=========================================================O

    Funções relacionadas ao login e logout de usuário:
    - [X] UserLogin;
    - [X] UserLogout;
    - [X] ClearBlackList;
    - [X] ClearMailCodeList;
    - [X] getUsersFromCampus;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
const JWT = require("jsonwebtoken");

// Módulo dos Models Read de usuário:
const UserRead = require("../../models/user/userOperations/userReadModels");

// Módulo de tratamento de senhas:
const passwordTreat = require("../../utils/password_treatment");

// Módulo de Blacklist de tokens:
const tokenBlackListModels = require("../../models/user/accountValidation/tokenBlacklistModels");

// Módulo de MailCode:
const mailCodesModels = require("../../models/user/accountValidation/mailCodesModels");

// Módulo de permissões de laboratório:
const labPermission = require("../../controllers/lab/labPermissionChecks");

// O========================================================================================O

// Função para realizar o login de um usuário:
const userLogin = async (req, res) => {
  /*-----------------------------------------------------*/

  const { user_email, user_password } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o email existe no banco de dados:
  const userInfo = await UserRead.getUserByEmail(user_email);

  if (userInfo.status === false) {
    return res.status(401).json({
      auth: false,
      message: "Email de suário ou senha inválidos",
    });
  }

  /*-----------------------------------------------------*/

  // Comparando senhas:
  const result = await passwordTreat.comparePasswords(
    user_password,
    userInfo.userData.userSalt,
    userInfo.userData.userPassword
  );

  if (result === false) {
    return res.status(401).json({
      auth: false,
      message: "Email de suário ou senha inválidos",
    });
  }

  /*-----------------------------------------------------*/

  const token = JWT.sign(
    { userId: userInfo.userData.userId },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );

  /*-----------------------------------------------------*/

  return res.status(200).json({
    auth: true,
    token: token,
    message: "Login efetuado com sucesso!",
  });
};

// O========================================================================================O

// Função para realizar o logout de um usuário:
const userLogout = async (req, res) => {
  /*-----------------------------------------------------*/

  const token = req.headers["x-access-token"];

  /*-----------------------------------------------------*/
  // Adicionando token à blacklist:
  const result = await tokenBlackListModels.addToBlacklist(token);

  if (result.status === true) {
    return res.status(200).json({
      message: "Logout efetuado com sucesso!",
    });
  } else {
    return res.status(500).json({
      message: "Erro ao efetuar logout.",
    });
  }
};

// O========================================================================================O

// Função para limpar a lista de tokens:
const clearBlackList = async () => {
  console.log("Limpando blacklist de tokens...");
  const blacklist = await tokenBlackListModels.getAllBlacklist();

  blacklist.forEach(async (token) => {
    // Verificando se o token já expirou ou se ainda é válido:
    JWT.verify(token.Token, process.env.JWT_SECRET, async (err, __decoded) => {
      if (err) {
        // Removendo token da blacklist:
        await tokenBlackListModels.removeFromBlacklist(token.Token);
      }
    });
  });
};

// O========================================================================================O

// Função para limpar a lista de códigos de email:
const clearMailCodeList = async (__req, res) => {
  console.log("Limpando lista de códigos de email...");
  const mailCodes = await mailCodesModels.clearMailCodeList();

  return res.status(200).json({
    status: true,
    message: "Lista de códigos de email limpa.",
  });
};

// O========================================================================================O

// Função para obter os dados de um usuário:
const getUserData = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando ID do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Recuperando dados do usuário:
  const result = await UserRead.getUserById(userId);

  if (result.status === false) {
    return res.status(404).json({
      status: false,
      message: "Usuário não encontrado.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    data: result.userData[0],
  });
};

// O========================================================================================O

// Função para obter os usuários de um laboratório:
const getUsersFromLab = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando ID do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { lab_id } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para acessar os usuários do laboratório:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    lab_id,
    3
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Recuperando usuários do laboratório:
  const result = await UserRead.getUsersByLab(lab_id);

  if (result.status === false) {
    return res.status(404).json({
      status: false,
      message: "Não há usuários no laboratório.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    users: result.userData[0],
  });
};

// O========================================================================================O

// Função para obter os usuários de um campus:
const getUsersFromCampus = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando ID do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const userInfo = await UserRead.getUserById(userId);

  if (userInfo.status === false) {
    return res.status(404).json({
      status: false,
      message: "Usuário não encontrado.",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para acessar os usuários do campus:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    userInfo.userData[0].campusId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Recuperando usuários do campus:
  const result = await UserRead.getUsersByCampus(userInfo.userData[0].campusId);

  if (result.status === false) {
    return res.status(404).json({
      status: false,
      message: "Não há usuários no campus.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    users: result.userData[0],
  });
};

// O========================================================================================O

// Exportando módulos:
module.exports = {
  userLogin,
  userLogout,
  clearBlackList,
  clearMailCodeList,
  getUserData,
  getUsersFromLab,
  getUsersFromCampus,
};

// O========================================================================================O
