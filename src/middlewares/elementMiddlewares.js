// O============================================================================================O

/*
    O================================================================O
    |   Funções de verificação relacionadas aos elementos químicos   |
    O================================================================O

    Lista de funções:
    - [X] element_name;
    - [X] element_quantity;
    - [X] element_description;
    - [X] element_molarMass;
    - [X] element_casNumber;
    - [X] element_ecNumber;
    - [X] element_physicalState;
    - [X] element_image;
    - [X] element_validity;
    - [X] element_supervisorLevel;
    - [X] element_labId;
    - [X] element_id;
*/

// O============================================================================================O

// Função de verificação do nome do elemento:
const element_name = (request, response, next) => {
  if (
    request.body.element_name === undefined ||
    request.body.element_name === null ||
    !request.body.element_name
  ) {
    return response.status(400).json({
      message: "Nome do elemento é obrigatório",
      error_at: "element_name",
      status: false
    });
  }

  if (typeof request.body.element_name !== "string") {
    return response.status(400).json({
      message: "Nome do elemento deve ser uma string",
      error_at: "element_name",
      status: false
    });
  }

  if (request.body.element_name.length < 1) {
    return response.status(400).json({
      message: "O nome do elemento deve ter pelo menos 1 caracter",
      error_at: "element_name",
      status: false
    });
  }

  if (request.body.element_name.length > 128) {
    return response.status(400).json({
      message: "O nome do elemento deve ter no máximo 128 caracteres",
      error_at: "element_name",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da quantidade do elemento:
const element_quantity = (request, response, next) => {
  if (
    request.body.element_quantity === undefined ||
    request.body.element_quantity === null ||
    !request.body.element_quantity
  ) {
    return response.status(400).json({
      message: "Quantidade do elemento é obrigatória",
      error_at: "element_quantity",
      status: false
    });
  }

  if (typeof request.body.element_quantity !== "number") {
    return response.status(400).json({
      message: "Quantidade do elemento deve ser um número",
      error_at: "element_quantity",
      status: false
    });
  }

  if (request.body.element_quantity < 0) {
    return response.status(400).json({
      message: "Quantidade do elemento não pode ser negativa",
      error_at: "element_quantity",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da descrição do elemento:
const element_description = (request, response, next) => {
  if (
    request.body.element_description === undefined ||
    request.body.element_description === null ||
    !request.body.element_description
  ) {
    request.body.element_description = "Sem descrição";
  }

  if (typeof request.body.element_description !== "string") {
    return response.status(400).json({
      message: "Descrição do elemento deve ser uma string",
      error_at: "element_description",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do peso molecular do elemento:
const element_molarMass = (request, response, next) => {
  if (
    request.body.element_molarMass === undefined ||
    request.body.element_molarMass === null ||
    !request.body.element_molarMass
  ) {
    return response.status(400).json({
      message: "Peso molecular do elemento é obrigatório",
      error_at: "element_molarMass",
      status: false
    });
  }

  if (typeof request.body.element_molarMass !== "number") {
    return response.status(400).json({
      message: "Peso molecular do elemento deve ser um número",
      error_at: "element_molarMass",
      status: false
    });
  }

  if (request.body.element_molarMass < 0) {
    return response.status(400).json({
      message: "Peso molecular do elemento não pode ser negativo",
      error_at: "element_molarMass",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do número CAS do elemento:
const element_casNumber = (request, response, next) => {
  if (
    request.body.element_casNumber === undefined ||
    request.body.element_casNumber === null ||
    !request.body.element_casNumber
  ) {
    return response.status(400).json({
      message: "Número CAS do elemento é obrigatório",
      error_at: "element_casNumber",
      status: false
    });
  }

  if (typeof request.body.element_casNumber !== "string") {
    return response.status(400).json({
      message: "Número CAS do elemento deve ser uma string",
      error_at: "element_casNumber",
      status: false
    });
  }

  if (request.body.element_casNumber.length < 1) {
    return response.status(400).json({
      message: "O número CAS do elemento deve ter pelo menos 1 caracter",
      error_at: "element_casNumber",
      status: false
    });
  }

  if (request.body.element_casNumber.length > 32) {
    return response.status(400).json({
      message: "O número CAS do elemento deve ter no máximo 32 caracteres",
      error_at: "element_casNumber",
      status: false
    });
  }

  if (!/^[a-zA-Z0-9-]*$/.test(request.body.element_casNumber)) {
    return response.status(400).json({
      message:
        "Número CAS do elemento deve conter apenas letras, números e hífens",
      error_at: "element_casNumber",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do número EC do elemento:
const element_ecNumber = (request, response, next) => {
  if (
    request.body.element_ecNumber === undefined ||
    request.body.element_ecNumber === null ||
    !request.body.element_ecNumber
  ) {
    return response.status(400).json({
      message: "Número EC do elemento é obrigatório",
      error_at: "element_ecNumber",
      status: false
    });
  }

  if (typeof request.body.element_ecNumber !== "string") {
    return response.status(400).json({
      message: "Número EC do elemento deve ser uma string",
      error_at: "element_ecNumber",
      status: false
    });
  }

  if (request.body.element_ecNumber.length < 1) {
    return response.status(400).json({
      message: "O número EC do elemento deve ter pelo menos 1 caracter",
      error_at: "element_ecNumber",
      status: false
    });
  }

  if (request.body.element_ecNumber.length > 32) {
    return response.status(400).json({
      message: "O número EC do elemento deve ter no máximo 32 caracteres",
      error_at: "element_ecNumber",
      status: false
    });
  }

  if (!/^[a-zA-Z0-9-]*$/.test(request.body.element_ecNumber)) {
    return response.status(400).json({
      message:
        "Número EC do elemento deve conter apenas letras, números e hífens",
      error_at: "element_ecNumber",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do estado físico do elemento:
const element_physicalState = (request, response, next) => {
  if (
    request.body.element_physicalState === undefined ||
    request.body.element_physicalState === null ||
    !request.body.element_physicalState
  ) {
    return response.status(400).json({
      message: "Estado físico do elemento é obrigatório",
      error_at: "element_physicalState",
      status: false
    });
  }

  if (typeof request.body.element_physicalState !== "number") {
    return response.status(400).json({
      message: "Estado físico do elemento deve ser um número",
      error_at: "element_physicalState",
      status: false
    });
  }

  if (
    request.body.element_physicalState !== 1 &&
    request.body.element_physicalState !== 2 &&
    request.body.element_physicalState !== 3
  ) {
    return response.status(400).json({
      message:
        "Estado físico do elemento deve ser 1 (sólido), 2 (líquido) ou 3 (gasoso)",
      error_at: "element_physicalState",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da imagem do elemento:
const element_image = (request, response, next) => {
  if (
    request.body.element_image === undefined ||
    request.body.element_image === null ||
    !request.body.element_image
  ) {
    request.body.element_image = "";
  }

  if (typeof request.body.element_image !== "string") {
    return response.status(400).json({
      message: "Imagem do elemento deve ser uma string",
      error_at: "element_image",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da validade do elemento:
const element_validity = (request, response, next) => {
  if (
    request.body.element_validity === undefined ||
    request.body.element_validity === null ||
    !request.body.element_validity
  ) {
    return response.status(400).json({
      message: "Validade do elemento é obrigatória",
      error_at: "element_validity",
      status: false
    });
  }

  if (typeof request.body.element_validity !== "number") {
    return response.status(400).json({
      message: "Validade do elemento deve ser um timestamp",
      error_at: "element_validity",
      status: false
    });
  }

  if (request.body.element_validity < 0) {
    return response.status(400).json({
      message: "Validade do elemento não pode ser negativa",
      error_at: "element_validity",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do nível de supervisão do elemento:
const element_supervisorLevel = (request, response, next) => {
  if (
    request.body.element_supervisorLevel === undefined ||
    request.body.element_supervisorLevel === null
  ) {
    return response.status(400).json({
      message: "Nível de supervisão do elemento é obrigatório",
      error_at: "element_supervisorLevel",
      status: false
    });
  }

  if (typeof request.body.element_supervisorLevel !== "number") {
    return response.status(400).json({
      message: "Nível de supervisão do elemento deve ser um número",
      error_at: "element_supervisorLevel",
      status: false
    });
  }

  if (
    request.body.element_supervisorLevel !== 0 &&
    request.body.element_supervisorLevel !== 1 &&
    request.body.element_supervisorLevel !== 2
  ) {
    return response.status(400).json({
      message:
        "Nível de supervisão do elemento deve ser 0 (baixo), 1 (médio) ou 2 (alto)",
      error_at: "element_supervisorLevel",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do ID do laboratório do elemento:
const element_labId = (request, response, next) => {
  if (
    request.body.element_labId === undefined ||
    request.body.element_labId === null ||
    !request.body.element_labId
  ) {
    return response.status(400).json({
      message: "ID do laboratório do elemento é obrigatório",
      error_at: "element_labId",
      status: false
    });
  }

  if (typeof request.body.element_labId !== "number") {
    return response.status(400).json({
      message: "ID do laboratório do elemento deve ser um número",
      error_at: "element_labId",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do ID do elemento:
const element_id = (request, response, next) => {
  if (
    request.body.element_id === undefined ||
    request.body.element_id === null ||
    request.body.element_id === "" ||
    !request.body.element_id
  ) {
    return response.status(400).json({
      message: "ID do elemento é obrigatório",
      error_at: "element_id",
      status: false
    });
  }

  if (typeof request.body.element_id !== "number") {
    return response.status(400).json({
      message: "ID do elemento deve ser um número",
      error_at: "element_id",
      status: false
    });
  }

  next();
};

// O============================================================================================O

// Exportando funções:
module.exports = {
  element_name,
  element_quantity,
  element_description,
  element_molarMass,
  element_casNumber,
  element_ecNumber,
  element_physicalState,
  element_image,
  element_validity,
  element_supervisorLevel,
  element_labId,
  element_id,
};

// O============================================================================================O
