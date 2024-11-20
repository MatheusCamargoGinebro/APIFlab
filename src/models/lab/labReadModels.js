// O========================================================================================O

/*
    O============================================================O
    |    Funções de models relacionadas a gets de laboratórios   |
    O============================================================O
 
    Funções de gets de laboratórios no banco de dados:
    - [X] GetLabById;
    - [X] GetLabByName;
    - [X] GetLabsByUser;
    - [X] GetAllLabUsers;
    - [X] GetLabUsersByLevel;
    - [X] GetLabsByUserLevel;
    - [X] GetLabUserRelation;

*/

// O========================================================================================O

// Importando módulos:
import { execute } from "../../database/connection";

// O========================================================================================O

// Função para buscar um laboratório pelo ID no banco de dados:
const GetLabById = async (ID_lab) => {
  const query = "CALL GetLabByID(?)";
  const [results] = await execute(query, [ID_lab]);

  if (results.length > 0) {
    return {
      status: true,
      lab: results[0],
    };
  } else {
    return {
      status: false,
      message: "Laboratório não encontrado!",
    };
  }
};

// O========================================================================================O

// Função para buscar um laboratório pelo nome no banco de dados:
const GetLabByName = async (labName, campusId) => {
  const query = "CALL GetLabByName(?, ?)";
  const [results] = await execute(query, [labName, campusId]);

  if (results.length > 0) {
    return {
      status: true,
      lab: results[0],
    };
  } else {
    return {
      status: false,
      message: "Laboratório não encontrado!",
    };
  }
};

// O========================================================================================O

// Função para buscar laboratórios de um usuário no banco de dados:
const GetLabsByUser = async (ID_usuario) => {
  const query = "CALL GetLabsByUser(?)";
  const [results] = await execute(query, [ID_usuario]);

  if (results.length > 0) {
    return {
      status: true,
      labs: results,
    };
  } else {
    return {
      status: false,
      message: "Laboratórios não encontrados!",
    };
  }
};

// O========================================================================================O

// Função para buscar todos os usuários de um laboratório no banco de dados:
const GetAllLabUsers = async (ID_lab) => {
  const query = "CALL GetAllLabUsers(?)";
  const [results] = await execute(query, [ID_lab]);

  if (results.length > 0) {
    return {
      status: true,
      users: results,
    };
  } else {
    return {
      status: false,
      message: "Usuários não encontrados!",
    };
  }
};

// O========================================================================================O

// Função para buscar usuários de um laboratório por nível no banco de dados:
const GetLabUsersByLevel = async (ID_lab, level) => {
  const query = "CALL GetLabUsersByLevel(?, ?)";
  const [results] = await execute(query, [ID_lab, level]);

  if (results.length > 0) {
    return {
      status: true,
      users: results,
    };
  } else {
    return {
      status: false,
      message: "Usuários não encontrados!",
    };
  }
};

// O========================================================================================O

// Função para buscar laboratórios de um usuário por nível no banco de dados:
const GetLabsByUserLevel = async (ID_usuario, level) => {
  const query = "CALL GetLabsByUserLevel(?, ?)";
  const [results] = await execute(query, [ID_usuario, level]);

  if (results.length > 0) {
    return {
      status: true,
      labs: results,
    };
  } else {
    return {
      status: false,
      message: "Laboratórios não encontrados!",
    };
  }
};

// O========================================================================================O

// Função para buscar a relação entre um usuário e um laboratório no banco de dados:
const GetLabUserRelation = async (ID_lab, ID_usuario) => {
  const query = "CALL GetLabUserRelation(?, ?)";
  const [results] = await execute(query, [ID_lab, ID_usuario]);

  if (results.length > 0) {
    return {
      status: true,
      relation: results[0],
    };
  } else {
    return {
      status: false,
      message: "Relação não encontrada!",
    };
  }
};

// O========================================================================================O

// Exportando funções:
export default {
  GetLabById,
  GetLabByName,
  GetLabsByUser,
  GetAllLabUsers,
  GetLabUsersByLevel,
  GetLabsByUserLevel,
  GetLabUserRelation,
};

// O========================================================================================O
