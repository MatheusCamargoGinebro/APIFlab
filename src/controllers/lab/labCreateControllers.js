// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a inserção de laboratórios    |
    O=================================================================O

    Funções relacionadas a inserção de laboratórios:
    - [X] createLab;
    - [X] createLabUser;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
const JWT = require("jsonwebtoken");

// Módulo dos Models Read de laboratório:
const labRead = require("../../models/lab/labReadModels");

// Módulo dos Models Write de laboratório:
const labWrite = require("../../models/lab/labWriteModels");

// Módulo de verificação de permissões:
const labPermissionChecks = require("./labPermissionChecks");

// O========================================================================================O

// Função para criar um laboratório:
const createLab = async (req, res) => {
  /*-----------------------------------------------------*/

  // Informações do laboratório:
  const { lab_name, lab_capacity } = req.body;

  /*-----------------------------------------------------*/

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando se o tal usuário tem permissão para criar um laboratório:
  const checkUserToCreate = await labPermissionChecks.checkUserToCreate(userId);

  if (checkUserToCreate.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para criar um laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o laboratório já existe:
  const GetLabByName = await labRead.getLabByName(
    lab_name,
    checkUserToCreate.userData.campusId
  );

  if (GetLabByName.status === true) {
    return res.status(400).json({
      status: false,
      message: "Laboratório já existe!",
    });
  }

  /*-----------------------------------------------------*/

  // Criando o laboratório:
  const CreateLab = await labWrite.createLab(
    {
      Sala: lab_name,
      Capacidade: lab_capacity,
      ID_campus: checkUserToCreate.userData.campusId,
    },
    userId
  );

  if (CreateLab.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao criar laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Recuperando ID do laboratório criado:
  const GetLabByNameAgain = await labRead.getLabByName(
    lab_name,
    checkUserToCreate.userData.campusId
  );

  if (GetLabByNameAgain.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao recuperar laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Relacionando o laboratório com o usuário criador:
  const RelateUserLab = await labWrite.relateUserLab(
    GetLabByNameAgain.lab.labId,
    userId,
    3
  );

  if (RelateUserLab.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao relacionar usuário ao laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Laboratório criado com sucesso!",
  });
};

// O========================================================================================O

const createLabUser = async (req, res) => {
  /*-----------------------------------------------------*/
  const { lab_id, user_id } = req.body;

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando permissões do usuário com o laboratório:
  const checkUserToManipulate = labPermissionChecks.checkUserToManipulate(
    userId,
    lab_id,
    3
  );

  if (checkUserToManipulate.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para adicionar um usuário!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário já pertence ao laboratório:
  const getNewUserRelation = await labRead.getLabUserRelation(lab_id, user_id);

  if (getNewUserRelation.status === true) {
    return res.status(400).json({
      status: false,
      message: "Usuário já pertence ao laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Adicionando o usuário ao laboratório:
  const AddUser = await labWrite.relateUserLab(lab_id, user_id, 1);

  if (AddUser.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao adicionar usuário ao laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Usuário adicionado com sucesso!",
  });
};

// O========================================================================================O

module.exports = { createLab, createLabUser };

// O========================================================================================O
