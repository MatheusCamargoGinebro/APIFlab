// O========================================================================================O

/*
    O====================================O
    |   Funções de controle de Campus    |
    O====================================O

    Funções relacionadas a Campus:
    - [X] registerCampus;
*/



// O========================================================================================O

/*
    O==========================================================O
    |    Funções de controle relacionadas a administradores    |
    O==========================================================O

    Funções relacionadas a administradores:
    - [X] addAdminUser;
    - [X] removeAdminUser;
*/

// ++==========================++ Editar administradores do campus ++==========================++

// Adicionar administrador ao campus:
const addAdminUser = async (request, response) => {
  const { user_id, campus_id } = request.body;

  // Verifica privilégios do usuário:
  const token = request.headers["x-access-token"];
  const userID = jwt.decode(token).userID;
  const user = await userModels.getUserByID(userID);

  if (user.status === false) {
    return response.status(400).json({
      status: false,
      message: "Erro ao verificar usuário!",
    });
  }

  if (
    user.userData.CampusAdminLevel !== 3 ||
    user.userData.ID_campus !== campus_id
  ) {
    return response.status(400).json({
      status: false,
      message: "Usuário não tem permissão para editar o campus!",
    });
  }

  // Verificar se o campus existe:
  const checkCampusID = await instituteModels.getCampusByID(campus_id);

  if (checkCampusID.status === false) {
    return response
      .status(400)
      .json({ status: false, message: "Campus informado não encontrado!" });
  }

  // Verificar se o usuário existe:
  const checkUserID = await userModels.getUserByID(user_id);

  if (checkUserID.status === false) {
    return response
      .status(400)
      .json({ status: false, message: "Usuário informado não encontrado!" });
  }

  // Verificar se o usuário já é administrador do campus:
  if (checkUserID.userData.CampusAdminLevel > 1) {
    return response.status(400).json({
      status: false,
      message: "Usuário já é administrador do campus!",
    });
  }

  // Adicionar administrador ao campus:
  const addAdmin = await instituteModels.addAdmin(user_id, campus_id);

  if (addAdmin.status === false) {
    return response.status(400).json(addAdmin);
  }

  return response.status(200).json(addAdmin);
};

// O========================================================================================O

// O========================================================================================O

// Remover administrador do campus:
const removeAdminUser = async (request, response) => {
  const { user_id, campus_id } = request.body;

  // Verifica privilégios do usuário:
  const token = request.headers["x-access-token"];
  const userID = jwt.decode(token).userID;
  const user = await userModels.getUserByID(userID);

  if (user.status === false) {
    return response.status(400).json({
      status: false,
      message: "Erro ao verificar usuário!",
    });
  }

  if (
    user.userData.CampusAdminLevel !== 3 ||
    user.userData.ID_campus !== campus_id
  ) {
    return response.status(400).json({
      status: false,
      message: "Usuário não tem permissão para editar o campus!",
    });
  }

  // Verificar se o campus existe:
  const checkCampusID = await instituteModels.getCampusByID(campus_id);

  if (checkCampusID.status === false) {
    return response
      .status(400)
      .json({ status: false, message: "Campus informado não encontrado!" });
  }

  // Verificar se o usuário existe:
  const checkUserID = await userModels.getUserByID(user_id);

  if (checkUserID.status === false) {
    return response
      .status(400)
      .json({ status: false, message: "Usuário informado não encontrado!" });
  }

  // Verificar se o usuário é administrador do campus:
  if (checkUserID.userData.CampusAdminLevel < 2) {
    return response.status(400).json({
      status: false,
      message: "Usuário não é administrador do campus!",
    });
  }

  if (checkUserID.userData.CampusAdminLevel === 3) {
    return response.status(400).json({
      status: false,
      message: "Não é possível remover o administrador principal!",
    });
  }

  // Remover administrador do campus:
  const removeAdmin = await instituteModels.removeAdmin(user_id, campus_id);

  if (removeAdmin.status === false) {
    return response.status(400).json(removeAdmin);
  }

  return response.status(200).json(removeAdmin);
};

// O========================================================================================O

module.exports = {
  /* Create */
  registerCampus,

  /* Edit */
  editCampusName,
  editCampusState,

  /* Admin */
  addAdminUser,
  removeAdminUser,
};

// O========================================================================================O
