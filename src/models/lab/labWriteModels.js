// O========================================================================================O

/*
    O=================================================================O
    |    Funções de models relacionadas a inserção de laboratórios    |
    O=================================================================O

    Funções de inserção de laboratórios no banco de dados:
    - [X] createLab;
    - [X] relateUserLab;
    - [X] removeUser;
    - [X] editLabName;
    - [X] editLabCapacity;
    - [X] editUserLabLevel;
*/

// O========================================================================================O

// Importando módulos:
const connection = require("../../utils/connection");

// O========================================================================================O

// Função de inserção de laboratórios no banco de dados:
const createLab = async (newLab, userId) => {
  const { Sala, Capacidade, ID_campus } = newLab;

  const query = "CALL CreateLab(?, ?, ?, ?)";
  const [results] = await connection.execute(query, [
    Sala,
    Capacidade,
    ID_campus,
    userId,
  ]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Laboratório cadastrado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao cadastrar laboratório!",
    };
  }
};

// O========================================================================================O

// Função para adicionar um usuário a um laboratório no banco de dados:
const relateUserLab = async (ID_lab, ID_usuario, AdminLevel) => {
  const query = "CALL RelateUserLab(?, ?, ?)";
  const [results] = await connection.execute(query, [
    ID_usuario,
    ID_lab,
    AdminLevel,
  ]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Usuário adicionado ao laboratório com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao adicionar usuário ao laboratório!",
    };
  }
};

// O========================================================================================O

// Função para remover um usuário de um laboratório no banco de dados:
const removeUser = async (ID_lab, ID_usuario) => {
  const query = "CALL UnrelateUserLab(?, ?)";
  const [results] = await connection.execute(query, [ID_usuario, ID_lab]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Usuário removido do laboratório com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao remover usuário do laboratório!",
    };
  }
};

// O========================================================================================O

// Função de edição do nome do laboratório no banco de dados:
const editLabName = async (ID_lab, NewName) => {
  const query = "CALL EditLabName(?, ?)";
  const [results] = await connection.execute(query, [
    ID_lab,
    NewName,
  ]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Nome do laboratório editado com sucesso!",
    };
  } else {
    return { status: false, message: "Erro ao editar nome do laboratório!" };
  }
};

// Função de edição da capacidade do laboratório no banco de dados:
const editLabCapacity = async (ID_lab, newCapacity) => {
  const query = "CALL EditLabCapacity(?, ?);";
  const [results] = await connection.execute(query, [
    ID_lab,
    newCapacity,
  ]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Capacidade do laboratório editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar capacidade do laboratório!",
    };
  }
};

// O========================================================================================O

// Função para adicionar um administrador a um laboratório no banco de dados:
const editUserLabLevel = async (ID_usuario, ID_lab, AdminLevel) => {
  const query = "CALL EditUserLabLevel(?, ?, ?)";
  const [results] = await connection.execute(query, [
    ID_usuario,
    ID_lab,
    AdminLevel,
  ]);

  if (results.affectedRows > 0) {
    return {
      status: true,
      message: "Usuário promovido a administrador do laboratório com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao promover usuário a administrador do laboratório!",
    };
  }
};

// O========================================================================================O

// Exportando funções:
module.exports = {
  createLab,
  relateUserLab,
  removeUser,
  editLabName,
  editLabCapacity,
  editUserLabLevel,
};

// O========================================================================================O
