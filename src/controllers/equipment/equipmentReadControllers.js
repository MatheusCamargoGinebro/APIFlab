// O========================================================================================O

/*
    O============================================================================O
    |    Funções de controllers relacionadas a busca de equipamentos químicos    |
    O============================================================================O

    Funções de controllers relacionadas a busca de equipamentos químicos:
    - [X] getEquipmentById;
    - [X] getEquipmentsByLabId;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
const JWT = require("jsonwebtoken");

// Módulo dos Models Read de equipamentos químicos:
const equipmentRead = require("../../models/equipment/equipmentReadModels");

// Módulo de verificação de permissões de laboratório:
const labPermission = require("../../controllers/lab/labPermissionChecks");

// O========================================================================================O

// Função para buscar um equipamento químico pelo ID:
const getEquipmentById = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // ID do equipamento químico:
  const { equipment_id } = req.body;

  /*-----------------------------------------------------*/

  // Recuperando informações do equipamento químico:
  const equipment = await equipmentRead.getEquipmentById(equipment_id);

  if (equipment.status === false) {
    return res
      .status(404)
      .json({ status: false, message: "Equipamento químico não encontrado!" });
  }

  // Verificando se o usuário tem permissão para acessar o equipamento químico:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    equipment.data.id_lab,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Retornando informações do equipamento químico:
  return res.status(200).json({
    status: true,
    data: equipment.data,
  });

  /*-----------------------------------------------------*/
};

// O========================================================================================O

// Função para buscar equipamentos químicos pelo ID do laboratório:
const getEquipmentsByLabId = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // ID do laboratório:
  const { lab_id } = req.body;

  /*-----------------------------------------------------*/

  // Recuperando informações dos equipamentos químicos:
  const equipments = await equipmentRead.getEquipmentsByLabId(lab_id);

  if (equipments.status === false) {
    return res.status(404).json({
      status: false,
      message: "Equipamentos químicos não encontrados!",
    });
  }

  // Verificando se o usuário tem permissão para acessar os equipamentos químicos:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    lab_id,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Retornando informações dos equipamentos químicos:
  return res.status(200).json({
    status: true,
    data: equipments.data,
  });
};

// O========================================================================================O

// Exportação dos módulos:
module.exports = {
  getEquipmentById,
  getEquipmentsByLabId,
};

// O========================================================================================O
