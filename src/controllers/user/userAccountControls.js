// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas ao login e logout    |
    O=========================================================O

    Funções relacionadas ao login e logout de usuário:
    - [X] UserLogin;
    - [X] UserLogout;
    - [X] ClearTokenList;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Read de usuário:
import UserRead from "../../models/user/userOperations/userReadModels";

// Módulo de tratamento de senhas:
import passwordTreat from "../../utils/password_treatment";

// Módulo de Blacklist de tokens:
import tokenBlackListModels from "../../models/user/accountValidation/tokenBlacklistModels";

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
    userInfo.userData.Salt,
    userInfo.userData.Senha
  );

  if (result === false) {
    return res.status(401).json({
      auth: false,
      message: "Email de suário ou senha inválidos",
    });
  }

  /*-----------------------------------------------------*/

  // Gerando token de autenticação:
  const token = JWT.sign(
    { userId: userInfo.userData.ID_usuario },
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
  const blacklist = await tokenModels.getAllBlacklist();

  blacklist.forEach(async (token) => {
    JWT.verify(token.Token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        await tokenBlackListModels.removeFromBlacklist(token.Token);
      }
    });
  });

  return { status: true, message: "Blacklist limpa." };
};

// O========================================================================================O

// Exportando módulos:
export default {
  userLogin,
  userLogout,
  clearBlackList,
};

// O========================================================================================O
