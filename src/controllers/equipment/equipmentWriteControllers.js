// O========================================================================================O

/*
    O================================================================================================O
    |    Funções de controllers relacionadas a inserção de equipamentos em laboratórios específicos    |
    O================================================================================================O

    Funções de controllers relacionadas a inserção de equipamentos em laboratórios específicos:
    - [X] createEquipment;
    - [X] removeEquipment;
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

// Função para criar um novo equipamento químico:
const createEquipment = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do novo equipamento:
  const {
    equipment_name,
    equipment_description,
    equipment_totalQuantity,
    equipment_quality,
    equipment_image,
    equipment_supervisorLevel,
    equipment_labId,
  } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para criar um equipamento químico:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    equipment_labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message:
        "Usuário não autorizado a criar equipamentos químicos neste laboratório!",
    });
  }

  /*-----------------------------------------------------*/

  // Criando o novo equipamento químico:
  const result = await equipmentWrite.createEquipment({
    nome: equipment_name,
    descricao: equipment_description,
    quantidadeTotal: equipment_totalQuantity,
    qualidade: equipment_quality,
    image: equipment_image,
    supervisorLevel: equipment_supervisorLevel,
    labId: equipment_labId,
  });

  if (result.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao criar equipamento químico!",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Função para remover um equipamento químico:
const removeEquipment = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do equipamento químico:
  const { equipment_id } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para remover um equipamento químico:
  const equipment = await equipmentRead.getEquipmentById(equipment_id);

  if (equipment.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao remover equipamento químico.",
    });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    equipment.data.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Removendo o equipamento químico:
  const result = await equipmentWrite.removeEquipment(equipment_id);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao remover equipamento químico.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json(result);
};

// O========================================================================================O

// Exportação dos módulos:
export default {
  createEquipment,
  removeEquipment,
};
