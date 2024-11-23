// O============================================================================================O

/*
    O==========================================================O
    |   Funções de verificação relacionadas aos laboratórios   |
    O==========================================================O

    Funções relacionadas a manipulação dos laboratórios:
    - [X] lab_name;
    - [X] lab_capacity;
    - [X] lab_id;
*/

// O============================================================================================O

// Função de verificação do nome do laboratório:
const lab_name = (request, response, next) => {
  if (
    request.body.lab_name === undefined ||
    request.body.lab_name === null ||
    !request.body.lab_name
  ) {
    return response.status(400).send({
      message: "Nome do laboratório é obrigatório",
      error_at: "lab_name",
    });
  }

  if (typeof request.body.lab_name !== "string") {
    return response.status(400).send({
      message: "Nome do laboratório deve ser uma string",
      error_at: "lab_name",
    });
  }

  if (request.body.lab_name.length < 1) {
    return response.status(400).send({
      message: "O nome do laboratório deve ter pelo menos 1 caracteres",
      error_at: "lab_name",
    });
  }

  if (request.body.lab_name.length > 16) {
    return response.status(400).send({
      message: "O nome do laboratório deve ter no máximo 16 caracteres",
      error_at: "lab_name",
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
    return response.status(400).send({
      message: "Capacidade é obrigatória",
      error_at: "lab_capacity",
    });
  }

  if (typeof request.body.lab_capacity !== "number") {
    return response.status(400).send({
      message: "Capacidade deve ser um número",
      error_at: "lab_capacity",
    });
  }

  if (request.body.lab_capacity < 1) {
    return response.status(400).send({
      message: "A capacidade deve ser de pelo menos 1 pessoa",
      error_at: "lab_capacity",
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
    return response.status(400).send({
      message: "ID do laboratório é obrigatório",
      error_at: "lab_id",
    });
  }

  if (typeof request.body.lab_id !== "number") {
    return response.status(400).send({
      message: "ID do laboratório deve ser um número",
      error_at: "lab_id",
    });
  }

  next();
};

// O============================================================================================O

export default {
  lab_name,
  lab_capacity,
  lab_id,
};

// O============================================================================================O
