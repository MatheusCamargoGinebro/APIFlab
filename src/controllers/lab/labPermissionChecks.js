// O========================================================================================O

/*
    O============================================================================O
    |   Funções de controle para verificar as permissões dos usuários em labs    |
    O============================================================================O

    Lista de funções:
    - [] checkUserToCreate;    
    - [] checkUserToManipulate;
*/

// O========================================================================================O

// Importando módulos:

// Módulo dos Models Read de usuário:
import UserRead from "../../models/user/userOperations/userReadModels";

// Módulo dos Models Read de laboratório:
import LabRead from "../../models/lab/labReadModels";

// O========================================================================================O

// Função para verificar se o usuário tem permissão para criar um laboratório:
const checkUserToCreate = async (userId) => {
  // Recuperando o nível de administração do usuário no campus:
  const user = await UserRead.GetUserByID(userId);

  // Verificando se o usuário existe e se ele tem permissão para criar um laboratório:
  if (user.status === false || user.userData.campusAdminLevel < 2) {
    return { status: false };
  }

  return { status: true, userData: user.userData };
};

// O========================================================================================O

// Função para verificar se o usuário tem permissão para manipular um laboratório:
const checkUserToManipulate = async (userId, labId, allowedLevel) => {
  // Recuperando informações do usuário:
  const user = await UserRead.GetUserByID(userId);

  // Recuperando informações do laboratório:
  const lab = await LabRead.GetLabByID(labId);

  // Verificando se o usuário e o laboratório existem:

  if (user.status === false || lab.status === false) {
    return { status: false };
  }

  // Verificando se o usuário possui a permissão necessária:
  const userLab = await LabRead.GetLabUserRelation(userId, labId);

  if (userLab.status === false || userLab.relation.userLevel <= allowedLevel) {
    return { status: false };
  }

  return {
    status: true,
    userData: user.userData,
    labData: lab.lab,
    relationbData: userLab.relation,
  };
};

// O========================================================================================O

export { checkUserToCreate, checkUserToManipulate };

// O========================================================================================O
