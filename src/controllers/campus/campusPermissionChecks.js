// O========================================================================================O

/*
    O==============================================================================O
    |   Funções de controle para verificar as permissões dos usuários em campus    |
    O==============================================================================O

    Lista de funções:  
    - [x] checkUsertoEdit;
    - [x] checkUserCampusRelation;
*/

// O========================================================================================O

// Importando módulos:

// Módulo dos Models Read de usuário:
import UserRead from "../../models/user/userOperations/userReadModels";

// O========================================================================================O

// Função para verificar se o usuário tem permissão para editar um campus:
const checkUserToEdit = async (userId) => {
  // Recuperando o nível de administração do usuário no campus:
  const user = await UserRead.getUserById(userId);

  // Verificando se o usuário existe e se ele tem permissão para editar um campus:
  if (user.status === false || user.userData.campusAdminLevel < 3) {
    return { status: false };
  }

  return {
    status: true,
    userData: user.userData,
  };
};

// O========================================================================================O

// Função para verificar se o usuário tem relação com o campus:
const checkUserCampusRelation = async (userId, campusId) => {
  // Recuperando o nível de administração do usuário no campus:
  const user = await UserRead.getUserById(userId);

  // Verificando se o usuário existe e se ele tem relação com o campus:
  if (user.status === false || user.userData.campusId !== campusId) {
    return { status: false };
  }

  return {
    status: true,
    userData: user.userData,
  };
};

// O========================================================================================O

export default {
  checkUserToEdit,
  checkUserCampusRelation,
};

// O========================================================================================O
