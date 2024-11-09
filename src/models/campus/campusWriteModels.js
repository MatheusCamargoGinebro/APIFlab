// O========================================================================================O

/*
    O=====================================================O
    |   Funções Models relacionadas a criar institutos    |
    O=====================================================O

    Funções relacionadas a criar institutos:
    - [X] registerCampus;
*/

// O========================================================================================O

// Importando módulos:
import { execute } from "../../utils/connection";

// O========================================================================================O

// Registrar um campus:
const registerCampus = async (newCampus) => {
  const { campus_name, campus_state } = newCampus;

  const query = "CALL CreateCampus(?, ?);";
  const [result] = await execute(query, [campus_name, campus_state]);

  if (result.affectedRows > 0) {
    return {
      status: true,
      campus_ID: result.insertId,
      message: "Campus registrado com sucesso!",
    };
  } else {
    return {
      status: false,
      campus_ID: null,
      message: "Erro ao registrar campus!",
    };
  }
};

// O========================================================================================O

/*
      O====================================================O
      |   Funções de edição relacionadas aos institutos    |
      O====================================================O
  
      Funções relacionadas a edição de institutos:
      - [X] editCampusName;
      - [X] editCampusState;
  */

// O========================================================================================O

// Editar nome do campus:
const editCampusName = async (ID_campus, newName) => {
  const query = "CALL EditCampusName(?, ?);";
  const [result] = await execute(query, [ID_campus, newName]);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Nome do campus editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar nome do campus!",
    };
  }
};

// O========================================================================================O

// Editar estado do campus:
const editCampusState = async (ID_campus, newName) => {
  const query = "CALL EditCampusState(?, ?);";
  const [result] = await execute(query, [ID_campus, newName]);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Estado do campus editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar estado do campus!",
    };
  }
};

// O========================================================================================O

// Exportando funções:
export { registerCampus, editCampusName, editCampusState };

// O========================================================================================O
