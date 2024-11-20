// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a edição de laboratórios      |
    O=================================================================O
 
    Funções relacionadas a edição de laboratórios:	
    - [X] EditLabName;
    - [X] EditLabCapacity;
    - [X] addAdmin;
    - [X] removeAdmin;
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

// Função para editar o nome do laboratório:
const EditLabName = async (req, res) => {
  /*-----------------------------------------------------*/
  const { labId, labName } = req.body;

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando se o tal usuário tem permissão para editar o nome do laboratório:
  const checkUserToManipulate = await labPermissionChecks.checkUserToManipulate(
    userId,
    labId,
    3
  );

  if (checkUserToManipulate.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para editar o nome do laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o laboratório já existe:
  const GetLabByName = await labRead.GetLabByName(
    labName,
    checkUserToManipulate.labData.campusID
  );

  if (GetLabByName.status === true) {
    return res.status(400).json({
      status: false,
      message: "Laboratório já existe!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nome do laboratório:
  const EditLabName = await labWrite.EditLabName(labId, labName);

  if (EditLabName.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao editar nome do laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Nome do laboratório editado com sucesso!",
  });
};

// O========================================================================================O

// Função para editar a capacidade do laboratório:
const EditLabCapacity = async (req, res) => {
  /*-----------------------------------------------------*/
  const { lab_id, capacity } = req.body;

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando se o tal usuário tem permissão para editar a capacidade do laboratório:
  const checkUserToManipulate = await labPermissionChecks.checkUserToManipulate(
    userId,
    lab_id,
    3
  );

  if (checkUserToManipulate.status === false) {
    return res.status(400).json({
      status: false,
      message:
        "Usuário não tem permissão para editar a capacidade do laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a capacidade do laboratório:
  const EditLabCapacity = await labWrite.EditLabCapacity(lab_id, capacity);

  if (EditLabCapacity.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao editar capacidade do laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Capacidade do laboratório editada com sucesso!",
  });
};

// O========================================================================================O

// Função para adicionar um administrador ao laboratório:
const addAdmin = async (req, res) => {
  /*-----------------------------------------------------*/
  const { labId, newUserId } = req.body;

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando se o tal usuário tem permissão para adicionar um administrador ao laboratório:
  const checkUserToManipulate = await labPermissionChecks.checkUserToManipulate(
    userId,
    labId,
    3
  );

  if (checkUserToManipulate.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para adicionar administrador!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário possui relação com o laboratório:
  const checkUserLabRelation = await labPermissionChecks.checkUserToManipulate(
    newUserId,
    labId,
    1
  );

  if (checkUserLabRelation.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não pertence ao laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário já é administrador:
  if (
    checkUserLabRelation.relationbData.userLevel === 3 ||
    checkUserLabRelation.relationbData.userLevel === 2
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuário já é administrador!",
    });
  }

  /*-----------------------------------------------------*/

  // Adicionando o usuário como administrador:
  const AddAdmin = await labWrite.EditUserLabLevel(newUserId, labId, 2);

  if (AddAdmin.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao adicionar administrador!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Administrador adicionado com sucesso!",
  });
};

// O========================================================================================O

// Função para remover um administrador do laboratório:
const removeAdmin = async (req, res) => {
  /*-----------------------------------------------------*/
  const { labId, newUserId } = req.body;

  // Verificando se o usuário existe:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Verificando se o tal usuário tem permissão para remover um administrador do laboratório:
  const checkUserToManipulate = await labPermissionChecks.checkUserToManipulate(
    userId,
    labId,
    3
  );

  if (checkUserToManipulate.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para remover administrador!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário possui relação com o laboratório:
  const checkUserLabRelation = await labPermissionChecks.checkUserToManipulate(
    newUserId,
    labId,
    1
  );

  if (checkUserLabRelation.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não pertence ao laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o usuário é administrador:
  if (checkUserLabRelation.relationbData.userLevel !== 2) {
    return res.status(400).json({
      status: false,
      message: "Usuário não é administrador!",
    });
  }

  /*-----------------------------------------------------*/

  // Removendo o usuário como administrador:
  const RemoveAdmin = await labWrite.EditUserLabLevel(newUserId, labId, 1);

  if (RemoveAdmin.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao remover administrador!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Administrador removido com sucesso!",
  });
};

// O========================================================================================O

// Exportando funções:
export default { EditLabName, EditLabCapacity, addAdmin, removeAdmin };

// O========================================================================================O
