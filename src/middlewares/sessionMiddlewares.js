// O============================================================================================O

/*
    O================================================================O
    |   Funções de verificação relacionadas aos elementos químicos   |
    O================================================================O

    Lista de funções:
    - [X] session_start_at;
    - [X] session_end_at;
    - [X] session_labId;
    - [X] session_equipment_list;
    - [X] session_element_list;
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

  if (dateString !== "number") {
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
    req.body.session_start_at === ""
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

  if (req.body.session_labId !== "number" || isNaN(req.body.session_labId)) {
    return res.status(400).json({
      status: false,
      message: "ID do laboratório inválido.",
      error_at: "session_labId",
    });
  }

  return next();
};

// O============================================================================================O

// Função para validar a lista de equipamentos:
const session_equipment_list = (req, res, next) => {
  if (
    req.body.session_equipment_list === undefined ||
    req.body.session_equipment_list === null ||
    req.body.session_equipment_list === ""
  ) {
    // Define a lista de equipamentos como um array vazio:
    req.body.session_equipment_list = [];

    return next();
  }

  if (!Array.isArray(req.body.session_equipment_list)) {
    req.body.session_equipment_list = [];

    return next();
  }

  for (let i = 0; i < req.body.session_equipment_list.length; i++) {
    if (
      req.body.session_equipment_list[i].equipment_id === undefined ||
      req.body.session_equipment_list[i].equipment_id === null ||
      req.body.session_equipment_list[i].equipment_id === ""
    ) {
      return res.status(400).json({
        status: false,
        message: "ID do equipamento não informado.",
        error_at: "session_equipment_list.equipment_id",
      });
    }

    if (
      req.body.session_equipment_list[i].equipment_id !== "number" ||
      isNaN(req.body.session_equipment_list[i].equipment_id)
    ) {
      return res.status(400).json({
        status: false,
        message: "ID do equipamento inválido.",
        error_at: "session_equipment_list.equipment_id",
      });
    }

    if (
      req.body.session_equipment_list[i].equipment_quantity === undefined ||
      req.body.session_equipment_list[i].equipment_quantity === null ||
      req.body.session_equipment_list[i].equipment_quantity === ""
    ) {
      return res.status(400).json({
        status: false,
        message: "Quantidade do equipamento não informada.",
        error_at: "session_equipment_list.equipment_quantity",
      });
    }

    if (
      req.body.session_equipment_list[i].equipment_quantity !== "number" ||
      isNaN(req.body.session_equipment_list[i].equipment_quantity)
    ) {
      return res.status(400).json({
        status: false,
        message: "Quantidade do equipamento inválida.",
        error_at: "session_equipment_list.equipment_quantity",
      });
    }

    if (req.body.session_equipment_list[i].equipment_quantity < 0) {
      return res.status(400).json({
        status: false,
        message: "Quantidade do equipamento inválida.",
        error_at: "session_equipment_list.equipment_quantity",
      });
    }
  }

  return next();
};

// O============================================================================================O

// Função para validar a lista de elementos químicos:
const session_element_list = (req, res, next) => {
  if (
    req.body.session_element_list === undefined ||
    req.body.session_element_list === null ||
    req.body.session_element_list === ""
  ) {
    // Define a lista de elementos químicos como um array vazio:
    req.body.session_element_list = [];

    return next();
  }

  if (!Array.isArray(req.body.session_element_list)) {
    req.body.session_element_list = [];

    return next();
  }

  for (let i = 0; i < req.body.session_element_list.length; i++) {
    if (
      req.body.session_element_list[i].element_id === undefined ||
      req.body.session_element_list[i].element_id === null ||
      req.body.session_element_list[i].element_id === ""
    ) {
      return res.status(400).json({
        status: false,
        message: "ID do elemento químico não informado.",
        error_at: "session_element_list.element_id",
      });
    }

    if (
      req.body.session_element_list[i].element_id !== "number" ||
      isNaN(req.body.session_element_list[i].element_id)
    ) {
      return res.status(400).json({
        status: false,
        message: "ID do elemento químico inválido.",
        error_at: "session_element_list.element_id",
      });
    }

    if (
      req.body.session_element_list[i].element_quantity === undefined ||
      req.body.session_element_list[i].element_quantity === null ||
      req.body.session_element_list[i].element_quantity === ""
    ) {
      return res.status(400).json({
        status: false,
        message: "Quantidade do elemento químico não informada.",
        error_at: "session_element_list.element_quantity",
      });
    }

    if (
      req.body.session_element_list[i].element_quantity !== "number" ||
      isNaN(req.body.session_element_list[i].element_quantity)
    ) {
      return res.status(400).json({
        status: false,
        message: "Quantidade do elemento químico inválida.",
        error_at: "session_element_list.element_quantity",
      });
    }

    if (req.body.session_element_list[i].element_quantity < 0) {
      return res.status(400).json({
        status: false,
        message: "Quantidade do elemento químico inválida.",
        error_at: "session_element_list.element_quantity",
      });
    }
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

  if (req.body.session_id !== "number" || NaN(req.body.session_id)) {
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
  session_equipment_list,
  session_element_list,
  session_id,
};

// O============================================================================================O
