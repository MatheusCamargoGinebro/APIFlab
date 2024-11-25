// O====================================================================================O

/*
    O============================================O
    |    Funções de Models relacionadas a get    |
    O============================================O

    Funções relacionadas a pegar informações de usuários:
    - [X] getUserById;
    - [X] getUserByEmail;
    - [X] getUserByName;
    - [X] getUsersByCampus;
    - [X] getUsersByLab;
    - [X] login;
*/

// O====================================================================================O

// Importando conexão com o banco de dados:
import { execute } from "../../utils/connection";

// O====================================================================================O

// Função para pegar informações do usuário pelo ID:
const getUserById = async (ID_usuario) => {
  // const query = "SELECT * FROM usuarios WHERE ID_usuario = ?;";
  const query = "CALL GetUserByID(?);";
  const [result] = await execute(query, [ID_usuario]);

  if (result.length > 0) {
    return { status: true, userData: result[0] };
  } else {
    return { status: false, userData: null };
  }
};

// O====================================================================================O

// Função para pegar informações do usuário pelo email:
const getUserByEmail = async (email) => {
  //const query = "SELECT * FROM usuarios WHERE Email = ?;";
  const query = "CALL GetUserByEmail(?);";
  const [result] = await execute(query, [email]);

  if (result.length > 0) {
    return { status: true, userData: result[0] };
  } else {
    return { status: false, userData: null };
  }
};

// O====================================================================================O

// Função para pegar informações do usuário pelo nome de usuário:
const getUserByName = async (username) => {
  // const query = "SELECT * FROM usuarios WHERE Nome = ?;";
  const query = "CALL GetUserByName(?);";
  const [result] = await execute(query, [username]);

  if (result.length > 0) {
    return { status: true, userData: result[0] };
  } else {
    return { status: false, userData: null };
  }
};

// O====================================================================================O

// Função para pegar todos os usuários de um campus:
const getUsersByCampus = async (ID_campus) => {
  const query = "CALL GetUsersByCampus(?);";
  const [result] = await execute(query, [ID_campus]);

  if (result.length > 0) {
    return { status: true, userData: result };
  } else {
    return { status: false, userData: null };
  }
};

// O====================================================================================O

// Função para pegar todos os usuários de um laboratório:
const getUsersByLab = async (ID_lab) => {
  const query = "CALL GetUsersByLab(?);";
  const [result] = await execute(query, [ID_lab]);

  if (result.length > 0) {
    return { status: true, userData: result };
  } else {
    return { status: false, userData: null };
  }
};

// O====================================================================================O

// Função para realizar login:
const login = async (email, senha) => {
  const query = "CALL Login(?, ?);";
  const [result] = await execute(query, [email, senha]);

  if (result.length > 0) {
    return { status: true, userData: result[0] };
  } else {
    return { status: false, userData: null };
  }
};

// O====================================================================================O

// Exportando funções:
export default {
  getUserById,
  getUserByEmail,
  getUserByName,
  getUsersByCampus,
  getUsersByLab,
  login,
};

// O====================================================================================O
