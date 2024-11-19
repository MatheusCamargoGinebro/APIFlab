// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a inserção de laboratórios    |
    O=================================================================O

    Funções relacionadas a inserção de laboratórios:
    - [X] CreateLab;
    - [X] CreateLabUser;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Read de laboratório:
import labRead from "../../models/lab/labReadModels";

// Módulo dos Models Write de laboratório:
import labWrite from "../../models/lab/labWriteModels";

// Módulo de verificação de permissões:
import labPermissionChecks from "./labPermissionChecks";

// O========================================================================================O

// Função para criar um laboratório:
const CreateLab = async (req, res) => {
  /*-----------------------------------------------------*/

  // Informações do laboratório:
  const { labName, capacity } = req.body;

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
  const GetLabByName = await labRead.GetLabByName(
    labName,
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
  const CreateLab = await labWrite.CreateLab(
    {
      Sala: labName,
      Capacidade: capacity,
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

  // Relacionando o laboratório com o usuário criador:
  const RelateUserLab = await labWrite.RelateUserLab(
    CreateLab.labId,
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

const CreateLabUser = async (req, res) => {
  /*-----------------------------------------------------*/
  const { labId, newUserId } = req.body;

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando permissões do usuário com o laboratório:
  const checkUserToManipulate = labPermissionChecks.checkUserToManipulate(
    userId,
    labId,
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
  const getNewUserRelation = await labRead.GetLabUserRelation(labId, newUserId);

  if (getNewUserRelation.status === true) {
    return res.status(400).json({
      status: false,
      message: "Usuário já pertence ao laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Adicionando o usuário ao laboratório:
  const AddUser = await labWrite.RelateUserLab(labId, newUserId, 1);

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

export default { CreateLab, CreateLabUser };

// O========================================================================================O
