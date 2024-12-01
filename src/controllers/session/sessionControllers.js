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
  - [X] removeElementFromSession;
  - [X] addEquipmentToSession;
  - [X] removeEquipmentFromSession;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
const JWT = require("jsonwebtoken");

// Módulo de manipulação de datas:
const moment = require("moment");

// Módulo dos Models Write de sessões:
const sessionWrite = require("../../models/session/sessionWriteModels");

// Módulo dos Models Read de sessões:
const sessionRead = require("../../models/session/sessionReadModels");

// Módulo de verificação de permissões de laboratório:
const labPermission = require("../../controllers/lab/labPermissionChecks");

// Módulo de leitura de equipamentos:
const equipmentRead = require("../../models/equipment/equipmentReadModels");

// Módulo de leitura de elementos:
const elementRead = require("../../models/element/elementReadModels");

// O========================================================================================O

// Função para criar uma nova sessão em um laboratório:
const createSession = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações da nova sessão:
  // Sobre o fuso horário:
  /* As datas na interface estão no fuso do usuário, mas são enviadas no fuso padrão (UTC 0).
     O servidor recebe as datas no fuso padrão e salvará no banco de dados no fuso padrão. 
  */
  const { session_start_at, session_end_at, session_labId } = req.body;

  const start = moment.unix(session_start_at);
  const end = moment.unix(session_end_at);

  /*-----------------------------------------------------*/

  // Verifica se a sessão tem no mínimo 5 minutos de duração:
  if (end.diff(start, "minutes") < 5) {
    return res.json({
      status: false,
      message: "A sessão deve ter no mínimo 5 minutos de duração.",
    });
  }

  // Verifica se a sessão tem no máximo 18 horas de duração:
  if (end.diff(start, "hours") > 18) {
    return res.json({
      status: false,
      message: "A sessão deve ter no máximo 18 horas de duração.",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para criar uma sessão:
  const permission = await labPermission.checkUserToManipulate(
    userId,
    session_labId,
    2
  );

  if (permission.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário sem permissão para criar uma sessão!",
    });
  }

  /*-----------------------------------------------------*/

  // Verifica disponibilidade de horário para a sessão:
  const checkAvailability = await sessionRead.GetDateBetween(
    session_labId,
    session_start_at,
    session_end_at
  );

  if (checkAvailability.status === true) {
    return res.status(400).json({
      status: false,
      message: "Horário indisponível!",
    });
  }

  /*-----------------------------------------------------*/

  // Criando um novo objeto de sessão:
  const newSession = {
    session_start_at,
    session_end_at,
    session_labId,
  };

  // Criando a nova sessão:
  const result = await sessionWrite.createSession(newSession, userId);

  if (result.status === false) {
    return res.status(400).json({
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
const getSessionsByLabId = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Recuperando informações da requisição:
  const { session_labId } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para visualizar as sessões:
  const permission = await labPermission.checkUserToManipulate(
    userId,
    session_labId,
    1
  );

  if (permission.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário sem permissão para visualizar as sessões!",
    });
  }

  /*-----------------------------------------------------*/

  // Recuperando as sessões do laboratório:
  const sessions = await sessionRead.getSessionsByLabId(session_labId);

  if (sessions.status === false) {
    return res.status(400).json({
      status: false,
      message: "Nenhuma sessão encontrada!",
    });
  }

  /*-----------------------------------------------------*/

  // convertendo sessionStarted e sessionFinished para boolean:
  sessions.data = sessions.data.map((session) => {
    session.sessionStarted = Boolean(session.sessionStarted);
    session.sessionFinished = Boolean(session.sessionFinished);
    return session;
  });

  // Convertendo sessionStartsAt e sessionEndsAt para UNIX:
  sessions.data = sessions.data.map((session) => {
    session.sessionStartsAt = moment(session.sessionStartsAt).unix();
    session.sessionEndsAt = moment(session.sessionEndsAt).unix();
    return session;
  });

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    data: sessions.data,
  });
};

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

// Função para remover um elemento de uma sessão em um laboratório:
const removeElementFromSession = async (req, res) => {};

// O========================================================================================O

// Função para adicionar um equipamento a uma sessão em um laboratório:
const addEquipmentToSession = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Recuperando informações da requisição:
  const { session_id, session_equipment } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para adicionar um equipamento a uma sessão:
  const session = await sessionRead.getSessionById(session_id);

  if (session.status === false) {
    return res.status(400).json({
      status: false,
      message: "Sessão não encontrada!",
    });
  }

  if (
    session.data.userId !== userId ||
    session.data.sessionStarted === 1 ||
    session.data.sessionFinished === 1
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem autorização para modificar essa sessão!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o equipamento existe:
  const equipment = await equipmentRead.getEquipmentById(session_equipment.id);

  if (equipment.status === false) {
    return res.status(400).json({
      status: false,
      message: "Equipamento não encontrado!",
    });
  }

  if (equipment.data.labId !== session.data.labId) {
    return res.status(400).json({
      status: false,
      message: "Equipamento não pertence ao laboratório da sessão!",
    });
  }

  if (equipment.data.availableQuantity < session_equipment.quantity) {
    return res.status(400).json({
      status: false,
      message: "Quantidade de equipamentos insuficiente!",
    });
  }

  // Verificando se o equipamento já está na sessão:
  const sessionEquipments = await sessionRead.getSessionEquipments(session_id);

  if (sessionEquipments.status === true) {
    const checkEquipment = sessionEquipments.data.find(
      (equipment) => equipment.equipmentId === session_equipment.id
    );

    if (checkEquipment) {
      return res.status(400).json({
        status: false,
        message: "Equipamento já adicionado à sessão!",
      });
    }
  }

  /*-----------------------------------------------------*/

  // Adicionando o equipamento à sessão:
  const result = await sessionWrite.ReserveEquipment(
    session_id,
    session_equipment
  );

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao adicionar equipamento à sessão!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Equipamento adicionado à sessão com sucesso!",
  });
};

// O========================================================================================O

// Função para remover um equipamento de uma sessão em um laboratório:
const removeEquipmentFromSession = async (req, res) => {};

// O========================================================================================O

// Exportando funções de controle de sessões em laboratórios:
module.exports = {
  createSession,
  getSessionsByLabId,
  startSession,
  endSession,
  addElementToSession,
  removeElementFromSession,
  addEquipmentToSession,
  removeEquipmentFromSession,
};

// O========================================================================================O
