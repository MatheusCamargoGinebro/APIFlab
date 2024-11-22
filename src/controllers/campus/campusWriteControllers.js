// O========================================================================================O

/*
    O====================================O
    |   Funções de controle de Campus    |
    O====================================O

    Funções relacionadas a Campus:
    - [X] registerCampus;
    - [X] editCampusName;
    - [X] editCampusState;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Read de instituto:
import campusRead from "../../models/campus/campusReadModels";

// Módulo dos Models Write de instituto:
import campusWrite from "../../models/campus/campusWriteModels";

// Módulo de verificação de permissões:
import campusPermissionChecks from "./campusPermissionChecks";

// O========================================================================================O

// Registrar um campus:
const registerCampus = async (req, res) => {
  /*-----------------------------------------------------*/

  // Informações do campus:
  const { newCampusName, newCampusState } = req.body;

  /*-----------------------------------------------------*/

  // Verificar se o nome do campus já existe:
  const checkCampusName = await campusRead.getCampusByName(newCampusName);

  if (checkCampusName.status === true) {
    return res
      .status(400)
      .json({ status: false, message: "Campus já existe!" });
  }

  /*-----------------------------------------------------*/

  // Registrar o campus:
  const registerCampus = await campusWrite.registerCampus({
    campus_name: newCampusName,
    campus_state: newCampusState,
  });

  if (registerCampus.status === false) {
    return res
      .status(400)
      .json({ status: false, message: "Erro ao registrar campus!" });
  }

  /*-----------------------------------------------------*/
  return res.status(200).json(registerCampus);
};

// O========================================================================================O

// Editar nome do campus:
const editCampusName = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = request.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do campus:
  const { newCampusName } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o campus:
  const checkUsertoEdit = await campusPermissionChecks.checkUserToEdit(userId);

  if (checkUsertoEdit.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para editar o campus!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificar se o nome do campus já existe:
  const checkCampusName = await campusRead.getCampusByName(newCampusName);

  if (checkCampusName.status === true) {
    return res
      .status(400)
      .json({ status: false, message: "Campus já existe!" });
  }

  /*-----------------------------------------------------*/

  // Editar nome do campus:
  const editCampusName = await campusWrite.editCampusName(
    checkUsertoEdit.userData.campusId,
    newCampusName
  );

  if (editCampusName.status === false) {
    return res
      .status(400)
      .json({ status: false, message: "Erro ao editar nome do campus!" });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(editCampusName);
};

// O========================================================================================O

// Editar Estado do campus:
const editCampusState = async (request, response) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = request.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { newCampusState } = request.body;

  /*-----------------------------------------------------*/

  // Verificar se o usuário tem permissão para editar o campus:
  const checkUser = await campusPermissionChecks.checkUserToEdit(userId);

  if (checkUser.status === false) {
    return response.status(400).json({
      status: false,
      message: "Usuário não tem permissão para editar o campus!",
    });
  }

  /*-----------------------------------------------------*/

  // Editar estado do campus:
  const editCampusState = await campusWrite.editCampusState(
    checkUser.userData.campusId,
    newCampusState
  );

  if (editCampusState.status === false) {
    return response
      .status(400)
      .json({ status: false, message: "Erro ao editar estado do campus!" });
  }

  /*-----------------------------------------------------*/

  return response.status(200).json(editCampusState);
};

// O========================================================================================O

// Exportação das funções:
export default {
  registerCampus,
  editCampusName,
  editCampusState,
};

// O========================================================================================O
