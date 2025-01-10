// O========================================================================================O

/*
    O===========================================================================O
    |    Funções de models relacionadas a inserção de sessão em laboratórios    |
    O===========================================================================O

    Funções de inserção de sessão em laboratórios no banco de dados:
    - [X] createSession;
    - [X] startSession;
    - [X] endSession;
    - [X] reserveElement;
    - [X] unreserveElement;
    - [X] reserveEquipment;
    - [X] unreserveEquipment;
    - [X] cancelSession;
*/

// O========================================================================================O

// Importação de módulos:
const connection = require("../../utils/connection");

// O========================================================================================O

// Função para criar uma sessão em um laboratório:
const createSession = async (newSession, userId) => {
  const { session_start_at, session_end_at, session_labId } = newSession;

  const query = "CALL createSession(?, ?, ?, ?)";
  const [results] = await connection.execute(query, [
    session_start_at,
    session_end_at,
    session_labId,
    userId,
  ]);

  return {
    status: true,
    message: "Sessão criada com sucesso!",
    newSessionId: results[0][0].ID_hor,
  };
};

// O========================================================================================O

// Função para iniciar uma sessão em um laboratório:
const startSession = async (sessionId) => {
  const query = "CALL StartSession(?);";
  const [results] = await connection.execute(query, [sessionId]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Sessão iniciada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao iniciar a sessão!",
    };
  }
};

// O========================================================================================O

// Função para encerrar uma sessão em um laboratório:
const endSession = async (sessionId) => {
  const query = "CALL FinishSession(?);";
  await connection.execute(query, [sessionId]);

  return {
    status: true,
    message: "Sessão encerrada com sucesso!",
  };
};

// O========================================================================================O

// Função para adicionar um elemento a uma sessão em um laboratório:
const reserveElement = async (sessionId, elementToAdd) => {
  const { id, quantity } = elementToAdd;

  const query = "CALL ReserveElement(?, ?, ?);";
  await connection.execute(query, [quantity, id, sessionId]);

  return {
    status: true,
    message: "Elemento adicionado com sucesso!",
  };
};

// O========================================================================================O

// Função para remover um elemento de uma sessão em um laboratório:
const unreserveElement = async (sessionId, elementId) => {
  const query = "CALL UnreserveElement(?, ?);";
  await connection.execute(query, [elementId, sessionId]);

  return {
    status: true,
    message: "Elemento removido com sucesso!",
  };
};

// O========================================================================================O

// Função para adicionar um equipamento a uma sessão em um laboratório:
const ReserveEquipment = async (sessionId, equipmentToAdd) => {
  const { id, quantity } = equipmentToAdd;

  const query = "CALL ReserveEquipment(?, ?, ?);";
  await connection.execute(query, [quantity, id, sessionId]);

  return {
    status: true,
    message: "Equipamento adicionado com sucesso!",
  };
};

// O========================================================================================O

// Função para remover um equipamento de uma sessão em um laboratório:
const unreserveEquipment = async (sessionId, equipmentId) => {
  const query = "CALL UnreserveEquipment(?, ?);";
  await connection.execute(query, [equipmentId, sessionId]);

  return {
    status: true,
    message: "Equipamento removido com sucesso!",
  };
};

// O========================================================================================O

// Função para cancelar uma sessão em um laboratório:
const cancelSession = async (sessionId) => {
  const query = "CALL DeleteSession(?);";
  const [result] = await connection.execute(query, [sessionId]);

  if (result[0].result === true) {
    return {
      status: true,
      message: "Sessão cancelada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Sessão já foi iniciada, não é possível cancelar!",
    };
  }
};

// O========================================================================================O

// Exportando funções de controle de sessões em laboratórios:
module.exports = {
  createSession,
  startSession,
  endSession,
  reserveElement,
  unreserveElement,
  ReserveEquipment,
  unreserveEquipment,
  cancelSession,
};

// O========================================================================================O
