// O========================================================================================O

/*
    O==========================================================================O
    |    Funções de models relacionadas a leitura de sessões de laboratórios   |
    O==========================================================================O
 
    Funções de models relacionadas a leitura de sessões de laboratórios:
    - [X] checkDateDisponibility;
    - [X] getSessionsByLabId;
    - [X] getSessionById;
    - [X] getSessionElements;
    - [X] getSessionEquipments;
*/

// O========================================================================================O

// Importação de módulos:
const connection = require("../../utils/connection");

// O========================================================================================O

// Função para verificar se há alguma sessão no horário solicitado:
const GetDateBetween = async (
  session_labId,
  session_start_at,
  session_end_at
) => {
  const query = "CALL GetDateBetween(?, ?, ?);";
  const data = [session_labId, session_start_at, session_end_at];

  const [result] = await connection.execute(query, data);

  if (result[0].length > 0) {
    return { status: true, data: result[0] };
  } else {
    return { status: false, message: "Nenhuma sessão encontrada!" };
  }
};

// O========================================================================================O

// Função para buscar todas as sessões de um laboratório:
const getSessionsByLabId = async (labId) => {
  const query = "CALL GetSessionsByLab(?);";
  const data = [labId];

  const [result] = await connection.execute(query, data);

  if (result[0].length > 0) {
    return { status: true, data: result[0] };
  } else {
    return { status: false, message: "Nenhuma sessão encontrada!" };
  }
};

// O========================================================================================O

// Função para buscar uma sessão pelo Id:
const getSessionById = async (sessionId) => {
  const query = "CALL GetSessionByID(?);";
  const data = [sessionId];

  const [result] = await connection.execute(query, data);

  if (result[0].length > 0) {
    return { status: true, data: result[0][0] };
  } else {
    return { status: false, message: "Sessão não encontrada!" };
  }
};

// O========================================================================================O

// Função para buscar os elementos de uma sessão:
const getSessionElements = async (sessionId) => {
  const query = "CALL GetSessionElements(?);";
  const data = [sessionId];

  const [result] = await connection.execute(query, data);

  if (result[0].length > 0) {
    return { status: true, data: result[0] };
  } else {
    return { status: false, message: "Elementos não encontrados!" };
  }
};

// O========================================================================================O

// Função para buscar os equipamentos de uma sessão:
const getSessionEquipments = async (sessionId) => {
  const query = "CALL GetSessionEquipments(?);";
  const data = [sessionId];

  const [result] = await connection.execute(query, data);

  if (result[0].length > 0) {
    return { status: true, data: result[0] };
  } else {
    return { status: false, message: "Equipamentos não encontrados!" };
  }
};

// O========================================================================================O

// Exportação dos módulos:
module.exports = {
  GetDateBetween,
  getSessionsByLabId,
  getSessionById,
  getSessionElements,
  getSessionEquipments,
};

// O========================================================================================O
