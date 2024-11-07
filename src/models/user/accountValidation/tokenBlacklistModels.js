// O====================================================================================O
/*  
    O======================================================================O
    |    Funções de Models relacionadas manipulação da conta do usuário    |
    O======================================================================O

    Funções relacionadas a manipulação da conta do usuário:
    - [X] AddToBlacklist;
    - [X] GetFromBlacklist;
    - [X] GetAllBlacklist;
    - [X] RemoveFromBlacklist;
    - [X] RemoveAllBlacklist;
    
*/
// O====================================================================================O

// Importando conexão com o banco de dados:
import { execute } from "../../utils/connection";

// O====================================================================================O

// Função para adicionar token na blacklist:
const AddToBlacklist = async (token) => {
  const query = "CALL AddToBlacklist(?);";
  const [result] = await execute(query, [token]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Token adicionado na blacklist" };
  } else {
    return {
      status: false,
      message: "Erro ao adicionar token na blacklist",
    };
  }
};

// O====================================================================================O

// Função para verificar se o token está na blacklist:
const GetFromBlacklist = async (token) => {
  const query = "CALL GetFromBlacklist(?);";
  const [result] = await execute(query, [token]);

  if (result.length > 0) {
    return { status: true, message: "Token na blacklist" };
  } else {
    return { status: false, message: "Token não está na blacklist" };
  }
};

// O====================================================================================O

// Função para listar todos os tokens na blacklist:
const GetAllBlacklist = async () => {
  const query = "CALL GetAllBlacklist();";
  const [result] = await execute(query);

  return result;
};

// O====================================================================================O

// Função para remover token da blacklist:
const RemoveFromBlacklist = async (token) => {
  const query = "CALL RemoveFromBlacklist(?);";
  const [result] = await execute(query, [token]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Token removido da blacklist" };
  } else {
    return {
      status: false,
      message: "Erro ao remover token da blacklist",
    };
  }
};

// O====================================================================================O

// Função para remover todos os tokens da blacklist:
const RemoveAllBlacklist = async () => {
  const query = "CALL RemoveAllBlacklist();";
  const [result] = await execute(query);

  if (result.affectedRows > 0) {
    return { status: true, message: "Todos os tokens removidos da blacklist" };
  } else {
    return {
      status: false,
      message: "Erro ao remover todos os tokens da blacklist",
    };
  }
};

// O====================================================================================O

// Exportando funções de manipulação da conta do usuário:
export {
  AddToBlacklist,
  GetFromBlacklist,
  GetAllBlacklist,
  RemoveFromBlacklist,
  RemoveAllBlacklist,
};

// O====================================================================================O