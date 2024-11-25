// O============================================================================================O

/*
    O===================================================================O
    |   Funções de verificação relacionadas aos equipamentos químicos   |
    O===================================================================O

    Funções relacionadas a manipulação dos equipamentos:
    - [X] equipment_name;
    - [X] equipment_description;
    - [X] equipment_totalQuantity;
    - [X] equipment_quality;
    - [X] equipment_image;
    - [X] equipment_supervisorLevel;
    - [X] equipment_labId;
    - [X] equipment_id;
*/

// O============================================================================================O

// Função de verificação do nome do equipamento:
const equipment_name = (request, response, next) => {
  if (
    request.body.equipment_name === undefined ||
    request.body.equipment_name === null ||
    !request.body.equipment_name
  ) {
    return response.status(400).send({
      message: "Nome do equipamento é obrigatório",
      error_at: "equipment_name",
    });
  }

  if (typeof request.body.equipment_name !== "string") {
    return response.status(400).send({
      message: "Nome do equipamento deve ser uma string",
      error_at: "equipment_name",
    });
  }

  if (request.body.equipment_name.length < 1) {
    return response.status(400).send({
      message: "O nome do equipamento deve ter pelo menos 1 caracter",
      error_at: "equipment_name",
    });
  }

  if (request.body.equipment_name.length > 128) {
    return response.status(400).send({
      message: "O nome do equipamento deve ter no máximo 128 caracteres",
      error_at: "equipment_name",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da descrição do equipamento:
const equipment_description = (request, response, next) => {
  if (
    request.body.equipment_description === undefined ||
    request.body.equipment_description === null ||
    !request.body.equipment_description
  ) {
    return response.status(400).send({
      message: "Descrição do equipamento é obrigatória",
      error_at: "equipment_description",
    });
  }

  if (typeof request.body.equipment_description !== "string") {
    return response.status(400).send({
      message: "Descrição do equipamento deve ser uma string",
      error_at: "equipment_description",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da quantidade total do equipamento:
const equipment_totalQuantity = (request, response, next) => {
  if (
    request.body.equipment_totalQuantity === undefined ||
    request.body.equipment_totalQuantity === null ||
    !request.body.equipment_totalQuantity
  ) {
    return response.status(400).send({
      message: "Quantidade total do equipamento é obrigatória",
      error_at: "equipment_totalQuantity",
    });
  }

  if (typeof request.body.equipment_totalQuantity !== "number") {
    return response.status(400).send({
      message: "Quantidade total do equipamento deve ser um número",
      error_at: "equipment_totalQuantity",
    });
  }

  if (request.body.equipment_totalQuantity < 0) {
    return response.status(400).send({
      message: "Quantidade total do equipamento não pode ser negativa",
      error_at: "equipment_totalQuantity",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da qualidade do equipamento:
const equipment_quality = (request, response, next) => {
  if (
    request.body.equipment_quality === undefined ||
    request.body.equipment_quality === null ||
    !request.body.equipment_quality
  ) {
    return response.status(400).send({
      message: "Qualidade do equipamento é obrigatória",
      error_at: "equipment_quality",
    });
  }

  if (typeof request.body.equipment_quality !== "number") {
    return response.status(400).send({
      message: "Qualidade do equipamento deve ser um número",
      error_at: "equipment_quality",
    });
  }

  if (request.body.equipment_quality < 0) {
    return response.status(400).send({
      message: "Qualidade do equipamento não pode ser negativa",
      error_at: "equipment_quality",
    });
  }

  if (request.body.equipment_quality > 5) {
    return response.status(400).send({
      message: "Qualidade do equipamento não pode ser maior que 5",
      error_at: "equipment_quality",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação da imagem do equipamento:
const equipment_image = (request, response, next) => {
  if (
    request.body.equipment_image === undefined ||
    request.body.equipment_image === null ||
    !request.body.equipment_image
  ) {
    request.body.equipment_image = "";
  }

  if (typeof request.body.equipment_image !== "string") {
    return response.status(400).send({
      message: "Imagem do equipamento deve ser uma string",
      error_at: "equipment_image",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do nível de supervisão do equipamento:
const equipment_supervisorLevel = (request, response, next) => {
  if (
    request.body.equipment_supervisorLevel === undefined ||
    request.body.equipment_supervisorLevel === null ||
    !request.body.equipment_supervisorLevel
  ) {
    return response.status(400).send({
      message: "Nível de supervisão do equipamento é obrigatório",
      error_at: "equipment_supervisorLevel",
    });
  }

  if (typeof request.body.equipment_supervisorLevel !== "number") {
    return response.status(400).send({
      message: "Nível de supervisão do equipamento deve ser um número",
      error_at: "equipment_supervisorLevel",
    });
  }

  if (request.body.equipment_supervisorLevel < 0) {
    return response.status(400).send({
      message: "Nível de supervisão do equipamento não pode ser negativo",
      error_at: "equipment_supervisorLevel",
    });
  }

  if (request.body.equipment_supervisorLevel > 3) {
    return response.status(400).send({
      message: "Nível de supervisão do equipamento não pode ser maior que 3",
      error_at: "equipment_supervisorLevel",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do ID do laboratório do equipamento:
const equipment_labId = (request, response, next) => {
  if (
    request.body.equipment_labId === undefined ||
    request.body.equipment_labId === null ||
    !request.body.equipment_labId
  ) {
    return response.status(400).send({
      message: "ID do laboratório do equipamento é obrigatório",
      error_at: "equipment_labId",
    });
  }

  if (typeof request.body.equipment_labId !== "number") {
    return response.status(400).send({
      message: "ID do laboratório do equipamento deve ser um número",
      error_at: "equipment_labId",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do ID do equipamento:
const equipment_id = (request, response, next) => {
  if (
    request.body.equipment_id === undefined ||
    request.body.equipment_id === null ||
    !request.body.equipment_id
  ) {
    return response.status(400).send({
      message: "ID do equipamento é obrigatório",
      error_at: "equipment_id",
    });
  }

  if (typeof request.body.equipment_id !== "number") {
    return response.status(400).send({
      message: "ID do equipamento deve ser um número",
      error_at: "equipment_id",
    });
  }

  next();
};

// O============================================================================================O

// Exportando funções:
module.exports = {
  equipment_name,
  equipment_description,
  equipment_totalQuantity,
  equipment_quality,
  equipment_image,
  equipment_supervisorLevel,
  equipment_labId,
  equipment_id,
};

// O============================================================================================O
