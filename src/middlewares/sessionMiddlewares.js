// O============================================================================================O

/*
    O================================================================O
    |   Funções de verificação relacionadas aos elementos químicos   |
    O================================================================O

    Lista de funções:
    - [X] session_start_at;
    - [X] session_end_at;
    - [X] session_labId;
    - [X] session_element;
    - [X] session_equipment;
    - [X] session_id;
*/

// O============================================================================================O

// Função de validação de data:
function validateDate(dateString) {
  // Verifica se o valor informado é um timestamp:
  if (isNaN(dateString)) {
    return false;
  }

  // Verifica se o valor informado é um número inteiro:
  if (!Number.isInteger(dateString)) {
    return false;
  }

  // Verifica se o valor informado é um número inteiro positivo:
  if (dateString < 0) {
    return false;
  }

  // Verifica se o valor informado é um número inteiro positivo maior que zero:
  if (dateString <= 0) {
    return false;
  }

  return true;
}

// O============================================================================================O

// Função para validar a data de início da sessão:
const session_start_at = (req, res, next) => {
  if (
    req.body.session_start_at === undefined ||
    req.body.session_start_at === null ||
    !req.body.session_start_at
  ) {
    return res.status(400).json({
      status: false,
      message: "Data de início da sessão não informada.",
      error_at: "session_start_at",
    });
  }

  if (!validateDate(req.body.session_start_at)) {
    return res.status(400).json({
      status: false,
      message: "Data de início da sessão inválida.",
      error_at: "session_start_at",
    });
  }

  return next();
};

// O============================================================================================O

// Função para validar a data de término da sessão:
const session_end_at = (req, res, next) => {
  if (
    req.body.session_end_at === undefined ||
    req.body.session_end_at === null ||
    req.body.session_end_at === ""
  ) {
    return res.status(400).json({
      status: false,
      message: "Data de término da sessão não informada.",
      error_at: "session_end_at",
    });
  }

  if (!validateDate(req.body.session_end_at)) {
    return res.status(400).json({
      status: false,
      message: "Data de término da sessão inválida.",
      error_at: "session_end_at",
    });
  }

  return next();
};

// O============================================================================================O

// Função para validar o ID do laboratório:
const session_labId = (req, res, next) => {
  if (
    req.body.session_labId === undefined ||
    req.body.session_labId === null ||
    req.body.session_labId === ""
  ) {
    return res.status(400).json({
      status: false,
      message: "ID do laboratório não informado.",
      error_at: "session_labId",
    });
  }

  if (isNaN(req.body.session_labId)) {
    return res.status(400).json({
      status: false,
      message: "ID do laboratório inválido.",
      error_at: "session_labId",
    });
  }

  return next();
};

// O============================================================================================O

// Função para validar elementos químicos da sessão:
const session_element = (req, res, next) => {
  // Testando ID do elemento químico:
  if (
    req.body.element.id === undefined ||
    req.body.element.id === null ||
    !req.body.element.id
  ) {
    return res.status(400).json({
      status: false,
      message: "ID do elemento químico não informado.",
      error_at: "element.id",
    });
  }

  if (isNaN(req.body.element.id)) {
    return res.status(400).json({
      status: false,
      message: "ID do elemento químico inválido.",
      error_at: "element.id",
    });
  }

  // Testando quantidade do elemento químico:
  if (
    req.body.element.quantity === undefined ||
    req.body.element.quantity === null ||
    !req.body.element.quantity
  ) {
    return res.status(400).json({
      status: false,
      message: "Quantidade do elemento químico não informada.",
      error_at: "element.quantity",
    });
  }

  if (isNaN(req.body.element.quantity)) {
    return res.status(400).json({
      status: false,
      message: "Quantidade do elemento químico inválida.",
      error_at: "element.quantity",
    });
  }

  return next();
};

// O============================================================================================O

// Função para validar equipamentos da sessão:
const session_equipment = (req, res, next) => {
  // Testando ID do equipamento:
  if (
    req.body.equipment.id === undefined ||
    req.body.equipment.id === null ||
    !req.body.equipment.id
  ) {
    return res.status(400).json({
      status: false,
      message: "ID do equipamento não informado.",
      error_at: "equipment.id",
    });
  }

  if (isNaN(req.body.equipment.id)) {
    return res.status(400).json({
      status: false,
      message: "ID do equipamento inválido.",
      error_at: "equipment.id",
    });
  }

  // Testando quantidade do equipamento:
  if (
    req.body.equipment.quantity === undefined ||
    req.body.equipment.quantity === null ||
    !req.body.equipment.quantity
  ) {
    return res.status(400).json({
      status: false,
      message: "Quantidade do equipamento não informada.",
      error_at: "equipment.quantity",
    });
  }

  if (isNaN(req.body.equipment.quantity)) {
    return res.status(400).json({
      status: false,
      message: "Quantidade do equipamento inválida.",
      error_at: "equipment.quantity",
    });
  }

  return next();
};

// O============================================================================================O

// Função para validar o ID da sessão:
const session_id = (req, res, next) => {
  if (
    req.body.session_id === undefined ||
    req.body.session_id === null ||
    req.body.session_id === ""
  ) {
    return res.status(400).json({
      status: false,
      message: "ID da sessão não informado.",
      error_at: "session_id",
    });
  }

  if (isNaN(req.body.session_id)) {
    return res.status(400).json({
      status: false,
      message: "ID da sessão inválido.",
      error_at: "session_id",
    });
  }

  return next();
};

// O============================================================================================O

// Exportando módulos:
module.exports = {
  session_start_at,
  session_end_at,
  session_labId,
  session_element,
  session_equipment,
  session_id,
};

// O============================================================================================O
