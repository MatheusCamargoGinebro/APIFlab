// O========================================================================================O

/*
    O============================================================================O
    |   Funções de controle para verificar as permissões dos usuários em labs    |
    O============================================================================O

    Lista de funções:
    - [x] checkUserToCreate;    
    - [x] checkUserToManipulate;
*/

// O========================================================================================O

// Importando módulos:

// Módulo dos Models Read de usuário:
const UserRead = require("../../models/user/userOperations/userReadModels");

// Módulo dos Models Read de laboratório:
const LabRead = require("../../models/lab/labReadModels");

// O========================================================================================O

// Função para verificar se o usuário tem permissão para criar um laboratório:
const checkUserToCreate = async (userId) => {
  // Recuperando o nível de administração do usuário no campus:
  const user = await UserRead.getUserById(userId);

  // Verificando se o usuário existe e se ele tem permissão para criar um laboratório:
  if (user.status === false || user.userData.campusAdminLevel < 2) {
    return { status: false };
  }

  return { status: true, userData: user.userData[0] };
};

// O========================================================================================O

// Função para verificar se o usuário tem permissão para manipular um laboratório:
const checkUserToManipulate = async (userId, labId, allowedLevel) => {
  // Recuperando informações do usuário:
  const user = await UserRead.getUserById(userId);

  // Recuperando informações do laboratório:
  const lab = await LabRead.getLabById(labId);

  // Verificando se o usuário e o laboratório existem:
  if (user.status === false || lab.status === false) {
    return { status: false };
  }

  // Verificando se o usuário possui a permissão necessária:
  const userLab = await LabRead.getLabUserRelation(labId, userId);

  if (userLab.status === false || userLab.relation[0].userLevel < allowedLevel) {
    return { status: false };
  }

  return {
    status: true,
    userData: user.userData[0],
    labData: lab,
    relation: userLab.relation[0],
  };
};

// O========================================================================================O

module.exports = { checkUserToCreate, checkUserToManipulate };

// O========================================================================================O
