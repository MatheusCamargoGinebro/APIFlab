// O========================================================================================O

/*
    O===============================================================================O
    |    Funções de controllers relacionadas a atualização de elementos químicos    |
    O===============================================================================O
 
    Funções de controllers relacionadas a atualização de elementos químicos:
    - [X] editName;
    - [X] editQuantity;
    - [X] editDescription;
    - [X] editMolarMass;
    - [X] editCasNumber;
    - [X] editEcNumber;
    - [X] editPhysicalState;
    - [X] editImage;
    - [X] editExpiration;
    - [X] editSupervisorLevel;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Write de elementos químicos:
import elementWrite from "../../models/element/elementWriteModels";

// Módulo dos Models Read de elementos químicos:
import elementRead from "../../models/element/elementReadModels";

// Módulo de verificação de permissões de laboratório:
import labPermission from "../../controllers/lab/labPermissionChecks";

// O========================================================================================O

// Função para editar o nome de um elemento químico:
const editName = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_name } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o nome de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nome do elemento químico:
  const result = await elementWrite.editName(element_id, element_name);

  if (result.status === false) {
    return res
      .status(500)
      .json({ status: false, message: "Erro ao editar nome do elemento!" });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar a quantidade de um elemento químico:
const editQuantity = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_quantity } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a quantidade de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a quantidade do elemento químico:
  const result = await elementWrite.editQuantity(element_id, element_quantity);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar quantidade do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar a descrição de um elemento químico:
const editDescription = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_description } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a descrição de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a descrição do elemento químico:
  const result = await elementWrite.editDescription(
    element_id,
    element_description
  );

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar descrição do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o peso molecular:
const editMolarMass = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_molar_mass } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o peso molecular de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o peso molecular do elemento químico:
  const result = await elementWrite.editMolarMass(
    element_id,
    element_molar_mass
  );

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar peso molecular do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o número CAS:
const editCasNumber = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_cas_number } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o número CAS de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o número CAS do elemento químico:
  const result = await elementWrite.editCasNumber(
    element_id,
    element_cas_number
  );

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar número CAS do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o número EC:
const editEcNumber = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_ec_number } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o número EC de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o número EC do elemento químico:
  const result = await elementWrite.editEcNumber(element_id, element_ec_number);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar número EC do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o estado físico:
const editPhysicalState = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_physical_state } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o estado físico de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o estado físico do elemento químico:
  const result = await elementWrite.editPhysicalState(
    element_id,
    element_physical_state
  );

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar estado físico do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar a imagem de um elemento químico:
const editImage = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_image } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a imagem de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a imagem do elemento químico:
  const result = await elementWrite.editImage(element_id, element_image);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar imagem do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar a data de validade:
const editExpiration = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_expiration } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a validade de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a validade do elemento químico:
  const result = await elementWrite.editExpiration(
    element_id,
    element_expiration
  );

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar validade do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para editar o nível de supervisão:
const editSupervisorLevel = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento:
  const { element_id, element_supervisorLevel } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o nível de supervisão de um elemento químico:
  const GetElementById = await elementRead.getElementById(element_id);

  if (GetElementById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Elemento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    GetElementById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nível de supervisão do elemento químico:
  const result = await elementWrite.editSupervisorLevel(
    element_id,
    element_supervisorLevel
  );

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar nível de supervisão do elemento!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Exportando funções:
export default {
  editName,
  editQuantity,
  editDescription,
  editMolarMass,
  editCasNumber,
  editEcNumber,
  editPhysicalState,
  editImage,
  editExpiration,
  editSupervisorLevel,
};

// O========================================================================================O
