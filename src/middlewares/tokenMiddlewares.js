// O============================================================================================O

/*
    O==============================================================O
    |    Arquivo de verificação de Token relacionado a usuários    |
    O==============================================================O

    Listagem de funções:
    - [X] checkToken;

*/

// O============================================================================================O

// Importando módulos:

// Modulo de verificação de token:
import { verify } from "jsonwebtoken";

// Modulo verificação da blacklist:
import getFromBlacklist from "../models/user/accountValidation/tokenBlacklistModels";

// O============================================================================================O

const checkToken = async (request, response, next) => {
  const token = request.headers["x-access-token"];

  // Verifica se o token está presente no header da requisição:
  if (!token || token === null || token === undefined || token === "") {
    return response.status(401).send({
      message: "Token não fornecido.",
      error_at: "token",
    });
  }

  // Verifica se o token está presente no banco de dados:
  const blackListedToken = await getFromBlacklist(token);

  if (blackListedToken.status === true) {
    return response.status(401).send({
      message: "Token descartado.",
      error_at: "token",
    });
  }

  // Verifica se o token é válido:
  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).send({
        message: "Token inválido ou expirado.",
        error_at: "token",
      });
    }

    next();
  });
};

// O============================================================================================O

export default {
  checkToken,
};

// O============================================================================================O
