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
import jwt from "jsonwebtoken";

// Módulo dos Models Read de laboratório:
import labReadModels from "../../models/lab/labReadModels";

// Módulo dos Models Write de laboratório:
import labWriteModels from "../../models/lab/labWriteModels";

// Módulo dos Models Read de usuário:
import userReadModels from "../../models/user/userReadModels";

// Módulo dos Models Write de usuário:
import userWriteModels from "../../models/user/userWriteModels";

// O========================================================================================O

// Função que verifica condições para usuário realizar operações em um laboratório:
/*
    - Verifica existência do usuário;
    - Verifica existência do laboratório;
    - Verifica permissão do usuário;
*/
const checkUserPermission = async (userId, labId, allowedLevel) => {};

// O========================================================================================O
// Função para criar um laboratório:
const CreateLab = async (req, res) => {
  /*-----------------------------------------------------*/
  const { sala, capacity } = req.body;

  // Verificando se o usuário tem permissão para criar um laboratório:
  const token = req.headers["x-access-token"];
  const userId = jwt.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando se o usuário existe:
  const getUserByID = await userReadModels.GetUserByID(userId);

  if (getUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para criar um laboratório:
  if (getUserByID.userData.CampusAdminLevel === 1) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para criar o laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o laboratório já existe:
  const GetLabByName = await labReadModels.GetLabByName(sala);

  if (GetLabByName.status === true) {
    return res.status(400).json({
      status: false,
      message: "Laboratório já existe!",
    });
  }

  /*-----------------------------------------------------*/

  // Criando o laboratório:
  const CreateLab = await labWriteModels.CreateLab(
    {
      Sala: sala,
      Capacidade: capacity,
      ID_campus: getUserByID.userData.ID_campus,
    },
    userId
  );

  if (CreateLab.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao criar laboratório!",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Laboratório criado com sucesso!",
  });
};

// O========================================================================================O

const CreateLabUser = async (req, res) => {
  const { lab_id, user_id } = req.body;

  // Verificando se o usuário existe:
  const token = req.headers["x-access-token"];
  const userID = jwt.decode(token).userID;

  const GetUserByID = await userModels.getUserByID(userID);

  if (GetUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o laboratório existe:
  const GetLabByID = await labModels.GetLabById(lab_id);

  if (GetLabByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Laboratório não encontrado!",
    });
  }

  // Verificando permissão do usuário:
  const GetLabUser = await labModels.GetLabUser(lab_id, userID);

  if (
    GetLabUser.status === false ||
    GetLabUser.data.AdminLevel !== 3 ||
    GetUserByID.userData.ID_campus !== GetLabByID.data.ID_campus
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para adicionar um usuário!",
    });
  }

  // Verificando se o usuário existe:
  const GetNewUserData = await userModels.getUserByID(user_id);

  if (GetNewUserData.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o usuário já pertence ao laboratório:
  const GetNewUserRelation = await labModels.GetLabUser(lab_id, user_id);

  if (GetNewUserRelation.status === true) {
    return res.status(400).json({
      status: false,
      message: "Usuário já pertence ao laboratório!",
    });
  }

  // Verificando se o campus do usuário é o mesmo do laboratório:
  if (GetNewUserData.userData.ID_campus !== GetLabByID.data.ID_campus) {
    return res.status(400).json({
      status: false,
      message: "Usuário não pertence ao mesmo campus do laboratório!",
    });
  }

  // Adicionando o usuário ao laboratório:
  const AddUser = await labModels.AddUser(lab_id, user_id, 1);

  if (AddUser.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao adicionar usuário!",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Usuário adicionado com sucesso!",
  });
};
