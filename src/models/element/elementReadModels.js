// O========================================================================================O

/*
    O====================================================================O
    |    Funções de models relacionadas a busca de elementos químicos    |
    O====================================================================O
 
    Funções de models relacionadas a busca de elementos químicos:
    - [X] getElementsByLab;
    - [X] getElementById;
*/

// O========================================================================================O

// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

// O========================================================================================O

// Função para buscar elementos químicos pelo ID do laboratório:
const getElementsByLab = async (ID_lab) => {
  const query = "CALL GetElementsByLab(?);";
  const data = [ID_lab];

  const [result] = await connection.execute(query, data);

  if (result.length > 0) {
    return { status: true, data: result };
  } else {
    return { status: false, message: "Elementos químicos não encontrados!" };
  }
};

// O========================================================================================O

// Função para buscar um elemento químico pelo ID:
const getElementById = async (elementId) => {
  const query = "GetElementByID(?);";
  const data = [elementId];

  const [result] = await connection.execute(query, data);

  if (result.length > 0) {
    return { status: true, data: result[0] };
  } else {
    return { status: false, message: "Elemento químico não encontrado!" };
  }
};

// O========================================================================================O

// Exportando funções:
module.exports = {
  getElementsByLab,
  getElementById,
};

// O========================================================================================O
