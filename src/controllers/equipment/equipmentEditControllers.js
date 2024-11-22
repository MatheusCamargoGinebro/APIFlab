// O========================================================================================O

/*
    O====================================================================O
    |    Funções de controllers relacionadas a edição de equipamentos    |
    O====================================================================O

    Funções de controllers relacionadas a edição de equipamentos em laboratórios específicos:
    - [X] editName;
    - [X] editDescription;
    - [X] editTotalQuantity;
    - [X] editQuality;
    - [X] editImage;
    - [X] editSupervisorLevel;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Write de equipamentos:
import equipmentWrite from "../../models/equipment/equipmentWriteModels";

// Módulo dos Models Read de equipamentos:
import equipmentRead from "../../models/equipment/equipmentReadModels";

// Módulo de verificação de permissões de laboratório:
import labPermission from "../../controllers/lab/labPermissionChecks";

// O========================================================================================O

// Função para editar o nome de um equipamento químico:
const editName = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do equipamento:
  const { equipment_id, equipment_name } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o nome do equipamento químico:
  const getEquipmentById = await equipmentRead.getEquipmentById(equipment_id);

  if (getEquipmentById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Equipamento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    getEquipmentById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nome do equipamento químico:
  const editName = await equipmentWrite.editName(equipment_id, equipment_name);

  if (editName.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar o nome do equipamento químico!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Nome do equipamento químico editado com sucesso!",
  });
};

// O========================================================================================O

// Função para editar a descrição de equipamento químico:
const editDescription = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do equipamento:
  const { equipment_id, equipment_description } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a descrição do equipamento químico:
  const getEquipmentById = await equipmentRead.getEquipmentById(equipment_id);

  if (getEquipmentById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Equipamento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    getEquipmentById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a descrição do equipamento químico:
  const editDescription = await equipmentWrite.editDescription(
    equipment_id,
    equipment_description
  );

  if (editDescription.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar a descrição do equipamento químico!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Descrição do equipamento químico editada com sucesso!",
  });
};

// O========================================================================================O

// Função para editar a quantidade total de um equipamento químico:
const editTotalQuantity = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do equipamento:
  const { equipment_id, equipment_totalQuantity } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a quantidade total do equipamento químico:
  const getEquipmentById = await equipmentRead.getEquipmentById(equipment_id);

  if (getEquipmentById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Equipamento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    getEquipmentById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a quantidade total do equipamento químico:
  const editTotalQuantity = await equipmentWrite.editTotalQuantity(
    equipment_id,
    equipment_totalQuantity
  );

  if (editTotalQuantity.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar a quantidade total do equipamento químico!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Quantidade total do equipamento químico editada com sucesso!",
  });
};

// O========================================================================================O

// Função para editar a qualidade de um equipamento químico:
const editQuality = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do equipamento:
  const { equipment_id, equipment_quality } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a qualidade do equipamento químico:
  const getEquipmentById = await equipmentRead.getEquipmentById(equipment_id);

  if (getEquipmentById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Equipamento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    getEquipmentById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a qualidade do equipamento químico:
  const editQuality = await equipmentWrite.editQuality(
    equipment_id,
    equipment_quality
  );

  if (editQuality.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar a qualidade do equipamento químico!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Qualidade do equipamento químico editada com sucesso!",
  });
};

// O========================================================================================O

// Função para editar a imagem de um equipamento químico:
const editImage = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do equipamento:
  const { equipment_id, equipment_image } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar a imagem do equipamento químico:
  const getEquipmentById = await equipmentRead.getEquipmentById(equipment_id);

  if (getEquipmentById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Equipamento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    getEquipmentById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando a imagem do equipamento químico:
  const editImage = await equipmentWrite.editImage(
    equipment_id,
    equipment_image
  );

  if (editImage.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar a imagem do equipamento químico!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Imagem do equipamento químico editada com sucesso!",
  });
};

// O========================================================================================O

// Função para editar o nível de supervisão de um equipamento químico:
const editSupervisorLevel = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do equipamento:
  const { equipment_id, equipment_supervisorLevel } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para editar o nível de supervisão do equipamento químico:
  const getEquipmentById = await equipmentRead.getEquipmentById(equipment_id);

  if (getEquipmentById.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Equipamento químico não encontrado!" });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    getEquipmentById.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado!",
    });
  }

  /*-----------------------------------------------------*/

  // Editando o nível de supervisão do equipamento químico:
  const editSupervisorLevel = await equipmentWrite.editSupervisorLevel(
    equipment_id,
    equipment_supervisorLevel
  );

  if (editSupervisorLevel.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao editar o nível de supervisão do equipamento químico!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Nível de supervisão do equipamento químico editado com sucesso!",
  });
};

// O========================================================================================O

// Exportação dos módulos:
export default {
  editName,
  editDescription,
  editTotalQuantity,
  editQuality,
  editImage,
  editSupervisorLevel,
};

// O========================================================================================O
