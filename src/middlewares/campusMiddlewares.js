// O============================================================================================O

/*
    O==============================================================O
    |   Arquivo de verificação de JSON relacionado a institutos    |
    O==============================================================O

    Listagem de funções:
    - [X] campus_name;
    - [X] campus_state;
    - [X] campus_id;
*/

// O============================================================================================O

// Função de verificação do nome do campus:
const campus_name = (request, response, next) => {
  if (
    request.body.campus_name === undefined ||
    request.body.campus_name === null ||
    !request.body.campus_name
  ) {
    return response.status(400).json({
      message: "Nome do campus é obrigatório",
      error_at: "campus_name",
      status: false
    });
  }

  if (typeof request.body.campus_name !== "string") {
    return response.status(400).json({
      message: "Nome do campus deve ser uma string",
      error_at: "campus_name",
      status: false
    });
  }

  if (request.body.campus_name.length < 3) {
    return response.status(400).json({
      message: "O nome do campus deve ter pelo menos 3 caracteres",
      error_at: "campus_name",
      status: false
    });
  }

  if (request.body.campus_name.length > 128) {
    return response.status(400).json({
      message: "O nome do campus deve ter no máximo 128 caracteres",
      error_at: "campus_name",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do estado do campus:
const campus_state = (request, response, next) => {
  if (
    request.body.campus_state === undefined ||
    request.body.campus_state === null ||
    !request.body.campus_state
  ) {
    return response.status(400).json({
      message: "Estado do campus é obrigatório",
      error_at: "campus_state",
      status: false
    });
  }

  if (typeof request.body.campus_state !== "string") {
    return response.status(400).json({
      message: "Estado do campus deve ser uma string",
      error_at: "campus_state",
      status: false
    });
  }

  if (request.body.campus_state === "") {
    return response.status(400).json({
      message: "Estado do campus não pode ser vazio",
      error_at: "campus_state",
      status: false
    });
  }

  if (request.body.campus_state.length != 2) {
    return response.status(400).json({
      message: "A sigla do estado deve ter 2 caracteres",
      error_at: "campus_state",
      status: false
    });
  }

  if (!/^[a-zA-Z]*$/.test(request.body.campus_state)) {
    return response.status(400).json({
      message: "Estado do campus deve conter apenas letras",
      error_at: "campus_state",
      status: false
    });
  }

  request.body.campus_state = request.body.campus_state.toUpperCase();

  if (
    ![
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ].includes(request.body.campus_state)
  ) {
    return response.status(400).json({
      message: "Estado do campus inválido",
      error_at: "campus_state",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do ID do campus:
const id_campus = (request, response, next) => {
  if (
    request.body.campus_id === undefined ||
    request.body.campus_id === null ||
    !request.body.campus_id
  ) {
    return response.status(400).json({
      message: "ID do campus é obrigatório",
      error_at: "campus_id",
      status: false
    });
  }

  if (typeof request.body.campus_id !== "number") {
    return response.status(400).json({
      message: "ID do campus deve ser um número",
      error_at: "campus_id",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Exportando funções:
module.exports = {
  campus_name,
  campus_state,
  id_campus,
};

// O============================================================================================O
