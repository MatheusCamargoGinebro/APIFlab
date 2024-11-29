// O========================================================================================O

/*
    O===========================================================================O
    |    Funções de models relacionadas a inserção de sessão em laboratórios    |
    O===========================================================================O

    Funções de inserção de sessão em laboratórios no banco de dados:
    - [X] createSession;
    - [X] startSession;
    - [X] endSession;
    - [X] addElementToSession;
    - [X] addEquipmentToSession;
    - [X] cancelSession;
*/

// O========================================================================================O

// Importação de módulos:
const connection = require("../../utils/connection");

// O========================================================================================O

// Função para criar uma sessão em um laboratório:
const createSession = async (newSession) => {
  const { session_start_at, session_end_at, session_labId, userId } =
    newSession;

  const query = "CALL CreateSchedule(?, ?, ?, ?)";
  const [results] = await connection.execute(query, [
    session_start_at,
    session_end_at,
    session_labId,
    userId,
  ]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Sessão criada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao criar a sessão!",
    };
  }
};

// O========================================================================================O

// Função para iniciar uma sessão em um laboratório:
const startSession = async (sessionId) => {
  const query = "CALL StartSchedule(?);";
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
  const query = "CALL FinishSchedule(?);";
  const [results] = await connection.execute(query, [sessionId]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Sessão encerrada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao encerrar a sessão!",
    };
  }
};

// O========================================================================================O

// Função para adicionar um elemento a uma sessão em um laboratório:
const addElementToSession = async (sessionId, elementToAdd) => {
  const { elementId, elementQuantity } = elementToAdd;

  const query = "CALL AddElementToSchedule(?, ?, ?);";
  await connection.execute(query, [elementQuantity, elementId, sessionId]);

  return {
    status: true,
    message: "Elemento adicionado com sucesso!",
  };
};

// O========================================================================================O

// Função para adicionar um equipamento a uma sessão em um laboratório:
const addEquipmentToSession = async (sessionId, equipmentToAdd) => {
  const { equipmentId, equipmentQuantity } = equipmentToAdd;

  const query = "CALL AddEquipmentToSchedule(?, ?, ?);";
  await connection.execute(query, [equipmentQuantity, equipmentId, sessionId]);

  return {
    status: true,
    message: "Equipamento adicionado com sucesso!",
  };
};

// O========================================================================================O

// Função para cancelar uma sessão em um laboratório:
const cancelSession = async (sessionId) => {
  const query = "CALL DeleteSchedule(?);";
  const [result] = await connection.execute(query, [sessionId]);

  if (result[0].result === TRUE) {
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
  addElementToSession,
  addEquipmentToSession,
  cancelSession,
};

// O========================================================================================O
