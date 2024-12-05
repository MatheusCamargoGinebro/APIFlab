// O============================================================================================O

/*
    O==========================================================O
    |   Funções de verificação relacionadas aos laboratórios   |
    O==========================================================O

    Funções relacionadas a manipulação dos laboratórios:
    - [X] lab_name;
    - [X] lab_capacity;
    - [X] lab_id;
    - [X] lab_adminLevel;
*/

// O============================================================================================O

// Função de verificação do nome do laboratório:
const lab_name = (request, response, next) => {
  if (
    request.body.lab_name === undefined ||
    request.body.lab_name === null ||
    !request.body.lab_name
  ) {
    return response.status(400).json({
      message: "Nome do laboratório é obrigatório",
      error_at: "lab_name",
      status: false
    });
  }

  if (typeof request.body.lab_name !== "string") {
    return response.status(400).json({
      message: "Nome do laboratório deve ser uma string",
      error_at: "lab_name",
      status: false
    });
  }

  if (request.body.lab_name.length < 1) {
    return response.status(400).json({
      message: "O nome do laboratório deve ter pelo menos 1 caracteres",
      error_at: "lab_name",
      status: false
    });
  }

  if (request.body.lab_name.length > 16) {
    return response.status(400).json({
      message: "O nome do laboratório deve ter no máximo 16 caracteres",
      error_at: "lab_name",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da capacidade do laboratório:
const lab_capacity = (request, response, next) => {
  if (
    request.body.lab_capacity === undefined ||
    request.body.lab_capacity === null ||
    !request.body.lab_capacity
  ) {
    return response.status(400).json({
      message: "Capacidade é obrigatória",
      error_at: "lab_capacity",
      status: false
    });
  }

  if (typeof request.body.lab_capacity !== "number") {
    return response.status(400).json({
      message: "Capacidade deve ser um número",
      error_at: "lab_capacity",
      status: false
    });
  }

  if (request.body.lab_capacity < 1) {
    return response.status(400).json({
      message: "A capacidade deve ser de pelo menos 1 pessoa",
      error_at: "lab_capacity",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do ID do laboratório:
const lab_id = (request, response, next) => {
  if (
    request.body.lab_id === undefined ||
    request.body.lab_id === null ||
    request.body.lab_id === "" ||
    !request.body.lab_id
  ) {
    return response.status(400).json({
      message: "ID do laboratório é obrigatório",
      error_at: "lab_id",
      status: false
    });
  }

  if (typeof request.body.lab_id !== "number") {
    return response.status(400).json({
      message: "ID do laboratório deve ser um número",
      error_at: "lab_id",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do nível de administração do laboratório:
const lab_adminLevel = (request, response, next) => {
  if (
    request.body.lab_adminLevel === undefined ||
    request.body.lab_adminLevel === null ||
    !request.body.lab_adminLevel
  ) {
    return response.status(400).json({
      message: "Nível de administração é obrigatório",
      error_at: "lab_adminLevel",
      status: false
    });
  }

  if (typeof request.body.lab_adminLevel !== "number") {
    return response.status(400).json({
      message: "Nível de administração deve ser um número",
      error_at: "lab_adminLevel",
      status: false
    });
  }

  if (request.body.lab_adminLevel < 1) {
    return response.status(400).json({
      message: "O nível de administração deve ser de pelo menos 1",
      error_at: "lab_adminLevel",
      status: false
    });
  }

  if (request.body.lab_adminLevel > 3) {
    return response.status(400).json({
      message: "O nível de administração deve ser de no máximo 3",
      error_at: "lab_adminLevel",
      status: false
    });
  }

  next();
};

// O============================================================================================O

module.exports = {
  lab_name,
  lab_capacity,
  lab_id,
  lab_adminLevel,
};

// O============================================================================================O
