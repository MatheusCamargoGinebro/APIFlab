// O========================================================================================O

/*
    O=========================================================================O
    |    Funções de controllers relacionadas a busca de elementos químicos    |
    O=========================================================================O
 
    Funções de controllers relacionadas a busca de elementos químicos:
    - [X] getElementById;
    - [X] getElementsByLabId;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
const JWT = require("jsonwebtoken");

// Módulo dos Models Read de elementos químicos:
const elementRead = require("../../models/element/elementReadModels");

// Módulo de verificação de permissões de laboratório:
const labPermission = require("../../controllers/lab/labPermissionChecks");

// O========================================================================================O

// Função para buscar um elemento químico pelo ID:
const getElementById = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // ID do elemento químico:
  const { element_id  } = req.body;

  /*-----------------------------------------------------*/

  // Recuperando informações do elemento químico:
  const element = await elementRead.getElementById(element_id);

  if (element.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  // Verificando se o usuário tem permissão para acessar o elemento químico:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    element.data.labId,
    1
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({ status: true, element: element.data });
};

// O========================================================================================O

// Função para ler todos os elementos de um laboratório:
const getElementsByLabId = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // ID do laboratório:
  const { element_labId } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para acessar os elementos do laboratório:
  const userCheck = await labPermission.checkUserToManipulate(userId, element_labId, 1);

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Recuperando informações dos elementos do laboratório:
  const elements = await elementRead.getElementsByLab(element_labId);

  if (elements.status === false) {
    return res.status(404).json({
      status: false,
      message: "Elementos químicos não encontrados!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({ status: true, data: elements.data });
};

// O========================================================================================O

// Exportando funções:
module.exports = {
  getElementById,
  getElementsByLabId,
};

// O========================================================================================O
