// O========================================================================================O

/*
  O======================================================O
  |    Funções de controle de sessões em laboratórios    |
  O======================================================O

  Lista de funções de controle de sessões em laboratórios:
  - [X] createSession;
  - [X] getSessionsByLabId;
  - [X] startSession;
  - [X] endSession;
  - [X] addElementToSession;
  - [X] addEquipmentToSession;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
const JWT = require("jsonwebtoken");

// Módulo dos Models Write de sessões:
const sessionWrite = require("../../models/session/sessionWriteModels");

// Módulo dos Models Read de sessões:
const sessionRead = require("../../models/session/sessionReadModels");

// Módulo de verificação de permissões de laboratório:
const labPermission = require("../../controllers/lab/labPermissionChecks");

// O========================================================================================O

// Função para criar uma nova sessão em um laboratório:
const createSession = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações da nova sessão:
  const { session_start_at, session_end_at, session_labId } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para criar uma sessão em um laboratório:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    session_labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message:
        "Você não tem permissão para criar uma sessão neste laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se há alguma sessão no horário solicitado:
  const checkSession = await sessionRead.checkDateDisponibility(
    session_labId,
    session_start_at,
    session_end_at
  );

  if (checkSession.status === true) {
    return res.status(401).json({
      status: false,
      message: "Já existe uma sessão neste horário neste horário!",
    });
  }

  /*-----------------------------------------------------*/

  // Criando a nova sessão:
  const newSession = await sessionWrite.createSession(
    session_start_at,
    session_end_at,
    session_labId,
    userId
  );

  if (newSession.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao criar a sessão!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Sessão criada com sucesso!",
  });
};

// O========================================================================================O

// Função para recuperar todas as sessões de um laboratório:
const getSessionsByLabId = async (req, res) => {};

// O========================================================================================O

// Função para iniciar uma sessão em um laboratório:
const startSession = async (req, res) => {};

// O========================================================================================O

// Função para encerrar uma sessão em um laboratório:
const endSession = async (req, res) => {};

// O========================================================================================O

// Função para adicionar um elemento a uma sessão em um laboratório:
const addElementToSession = async (req, res) => {};

// O========================================================================================O

// Função para adicionar um equipamento a uma sessão em um laboratório:
const addEquipmentToSession = async (req, res) => {};

// O========================================================================================O

// Exportando funções de controle de sessões em laboratórios:
module.exports = {
  createSession,
  getSessionsByLabId,
  startSession,
  endSession,
  addElementToSession,
  addEquipmentToSession,
};

// O========================================================================================O
