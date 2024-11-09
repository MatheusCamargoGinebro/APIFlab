/*
    O===================================================O
    |   Funções de controle relacionadas aos modelos    |
    O===================================================O
*/

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");


// O========================================================================================O

// Exportando funções:
module.exports = {
  /* Registro */
  registerCampus,

  /* Gets */
  getCampusByID,
  getCampusByName,

  /* Admins */
  addAdmin,
  removeAdmin,

  /* Edit */
  editCampusName,
  editCampusState,
};

// O============================================================================================O
