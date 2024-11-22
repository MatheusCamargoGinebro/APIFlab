// O========================================================================================O

/*
    O=======================================================================O
    |    Funções de models relacionadas a inserção de elementos químicos    |
    O=======================================================================O

    Funções de models relacionadas a inserção de elementos químicos:
    - [X] createElement;
    - [X] removeElement;
    - [X] editName;
    - [X] editQuantity;
    - [X] editDescription;
    - [X] editMolarMass;
    - [X] editCasNumber;
    - [X] editEcNumber;
    - [X] editPhysicalState;
    - [X] editImage;
    - [X] editElementExpiration;
    - [X] editElementSupervisorLevel;
*/

// O========================================================================================O

// Importando conexão com o banco de dados:
import { execute } from "../../utils/connection";

// O========================================================================================O

// Função para criar um elemento químico:
const createElement = async (newElement) => {
  const {
    nome,
    quantidade,
    descricao,
    peso_molecular,
    numero_cas,
    numero_ec,
    estado_fisico,
    imagem,
    validade,
    supervisorLevel,
    id_lab,
  } = newElement;
  const query = "CALL CreateElement(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  const data = [
    nome,
    quantidade,
    descricao,
    peso_molecular,
    numero_cas,
    numero_ec,
    estado_fisico,
    imagem,
    validade,
    supervisorLevel,
    id_lab,
  ];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return { status: true, message: "Elemento químico criado com sucesso!" };
  } else {
    return { status: false, message: "Erro ao criar elemento químico!" };
  }
};

// O========================================================================================O

// Função para remover um elemento químico:
const removeElement = async (elementId) => {
  const query = "CALL DeleteElement(?);";
  const data = [elementId];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return { status: true, message: "Elemento químico removido com sucesso!" };
  } else {
    return { status: false, message: "Erro ao remover elemento químico!" };
  }
};

// O========================================================================================O

// Função para editar o nome de um elemento químico:
const editName = async (elementId, name) => {
  const query = "CALL EditElementName(?, ?);";
  const data = [elementId, name];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Nome do elemento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar nome do elemento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar a quantidade de um elemento químico:
const editQuantity = async (elementId, quantity) => {
  const query = "CALL EditElementQuantity(?, ?);";
  const data = [elementId, quantity];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Quantidade do elemento químico editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar quantidade do elemento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar a descrição de um elemento químico:
const editDescription = async (elementId, description) => {
  const query = "CALL EditElementDescription(?, ?);";
  const data = [elementId, description];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Descrição do elemento químico editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar descrição do elemento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar o peso molecular de um elemento químico:
const editMolarMass = async (elementId, molarMass) => {
  const query = "CALL EditElementMolWeight(?, ?);";
  const data = [elementId, molarMass];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Peso molecular do elemento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar peso molecular do elemento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar o número CAS de um elemento químico:
const editCasNumber = async (elementId, casNumber) => {
  const query = "CALL EditElementCAS(?, ?);";
  const data = [elementId, casNumber];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Número CAS do elemento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar número CAS do elemento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar o número EC de um elemento químico:
const editEcNumber = async (elementId, ecNumber) => {
  const query = "CALL EditElementEC(?, ?);";
  const data = [elementId, ecNumber];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Número EC do elemento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar número EC do elemento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar o estado físico de um elemento químico:
const editPhysicalState = async (elementId, physicalState) => {
  const query = "CALL EditElementPhysicalState(?, ?);";
  const data = [elementId, physicalState];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Estado físico do elemento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar estado físico do elemento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar a imagem de um elemento químico:
const editImage = async (elementId, image) => {
  const query = "CALL EditElementImage(?, ?);";
  const data = [elementId, image];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Imagem do elemento químico editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar imagem do elemento químico!",
    };
  }
};

// O========================================================================================O

const editElementExpiration = async (elementId, expirationDate) => {
  const query = "CALL EditElementExpiration(?, ?);";
  const data = [elementId, expirationDate];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Validade do elemento químico editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar validade do elemento químico!",
    };
  }
};

// O========================================================================================O

const editElementSupervisorLevel = async (elementId, supervisorLevel) => {
  const query = "CALL EditElementSupervisorLevel(?, ?);";
  const data = [elementId, supervisorLevel];

  const [result] = await execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Nível de supervisão do elemento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar nível de supervisão do elemento químico!",
    };
  }
};

// O========================================================================================O

// Exportando módulos:
export default {
  createElement,
  removeElement,
  editName,
  editQuantity,
  editDescription,
  editMolarMass,
  editCasNumber,
  editEcNumber,
  editPhysicalState,
  editImage,
  editElementExpiration,
  editElementSupervisorLevel,
};

// O========================================================================================O
