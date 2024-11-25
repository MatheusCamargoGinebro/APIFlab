// O========================================================================================O

/*
    O===========================================O
    |   Funções Models de gets em Institutos    |
    O===========================================O

    Funções relacionadas a gets em institutos:
    - [X] getAllCampus;
    - [X] getCampusById;
    - [X] getCampusByName;
*/

// O========================================================================================O

// Importando módulos:
const connection = require("../../utils/connection");

// O========================================================================================O

// Ler todos os campus:
const getAllCampus = async () => {
  const query = "CALL GetAllCampus();";
  const [result] = await connection.execute(query);

  if (result.length > 0) {
    return { status: true, campusData: result };
  } else {
    return { status: false, campusData: null };
  }
};

// O========================================================================================O

// Procure um campus pelo ID:
const getCampusById = async (campus_ID) => {
  const query = "CALL GetCampusByID(?);";
  const [result] = await connection.execute(query, [campus_ID]);

  if (result.length > 0) {
    return { status: true, campusData: result[0] };
  } else {
    return { status: false, campusData: null };
  }
};

// O========================================================================================O

// Procure um campus pelo nome:
const getCampusByName = async (campus_name) => {
  const query = "CALL GetCampusByName(?);";
  const [result] = await connection.execute(query, [campus_name]);

  if (result.length > 0) {
    return { status: true, campusData: result[0] };
  } else {
    return { status: false, campusData: null };
  }
};

// O========================================================================================O

// Exportando funções:
module.exports = { getAllCampus, getCampusById, getCampusByName };

// O========================================================================================O
