// O========================================================================================O

/*
    O======================================================================O
    |    Funções de models relacionadas a busca de equipamentos químicos   |
    O======================================================================O
 
    Funções de models relacionadas a busca de equipamentos químicos:
    - [X] getEquipmentById;
    - [X] getEquipmentsByLabId;
*/

// O========================================================================================O

// Importação de módulos:
const connection = require("../../utils/connection");

// O========================================================================================O

// Função para buscar um equipamento químico pelo ID:
const getEquipmentById = async (equipmentId) => {
  const query = "CALL GetEquipmentByID(?);";
  const data = [equipmentId];

  const [result] = await connection.execute(query, data);

  if (result[0].length > 0) {
    return { status: true, data: result[0][0] };
  } else {
    return { status: false, message: "Equipamento químico não encontrado!" };
  }
};

// O========================================================================================O

// Função para buscar equipamentos químicos pelo ID do laboratório:
const getEquipmentsByLabId = async (labId) => {
  const query = "CALL GetEquipmentsByLab(?);";
  const data = [labId];

  const [result] = await connection.execute(query, data);

  if (result[0].length > 0) {
    return { status: true, data: result[0] };
  } else {
    return { status: false, message: "Equipamentos químicos não encontrados!" };
  }
};

// O========================================================================================O

// Exportação dos módulos:
module.exports = {
  getEquipmentById,
  getEquipmentsByLabId,
};

// O========================================================================================O
