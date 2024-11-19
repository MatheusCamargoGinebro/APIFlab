// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a edição de laboratórios      |
    O=================================================================O
 
    Funções relacionadas a edição de laboratórios:	
    - [X] EditLabName;
    - [X] EditLabCapacity;
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

// Exportando funções:
export default { EditLabName, EditLabCapacity };

// O========================================================================================O
