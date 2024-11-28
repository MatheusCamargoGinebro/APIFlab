// O========================================================================================O

/*
    O==========================================================================O
    |    Funções de models relacionadas a inserção de equipamentos químicos    |
    O==========================================================================O

    Funções de models relacionadas a inserção de equipamentos químicos:
    - [X] createEquipment;
    - [X] removeEquipment;
    - [X] editName;
    - [X] editDescription;
    - [X] editTotalQuantity;
    - [X] editQuality;
    - [X] editImage;
    - [X] editSupervisorLevel;
*/

// O========================================================================================O

// Importação de módulos:
const connection = require("../../utils/connection");

// O========================================================================================O

// Função para criar um equipamento químico:
const createEquipment = async (newEquipment) => {
  const {
    nome,
    descricao,
    quantidadeTotal,
    qualidade,
    image,
    supervisorLevel,
    labId,
  } = newEquipment;

  const query = "CALL CreateEquipment(?, ?, ?, ?, ?, ?, ?, ?);";
  const data = [
    nome,
    descricao,
    quantidadeTotal,
    quantidadeTotal,
    qualidade,
    image,
    supervisorLevel,
    labId,
  ];
  const [result] = await connection.execute(query, data);

  if (result.affectedRows > 0) {
    return { status: true, message: "Equipamento químico criado com sucesso!" };
  } else {
    return { status: false, message: "Erro ao criar equipamento químico!" };
  }
};

// O========================================================================================O

// Função para remover um equipamento químico:
const removeEquipment = async (equipmentId) => {
  const query = "CALL DeleteEquipment(?);";
  const data = [equipmentId];

  const [result] = await connection.execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Equipamento químico removido com sucesso!",
    };
  } else {
    return { status: false, message: "Erro ao remover equipamento químico!" };
  }
};

// O========================================================================================O

// Função para editar o nome de um equipamento químico:
const editName = async (equipmentId, newName) => {
  const query = "CALL EditEquipmentName(?, ?);";
  const data = [equipmentId, newName];

  const [result] = await connection.execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Nome do equipamento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar nome do equipamento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar a descrição de um equipamento químico:
const editDescription = async (equipmentId, newDescription) => {
  const query = "CALL EditEquipmentDescription(?, ?);";
  const data = [equipmentId, newDescription];

  const [result] = await connection.execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Descrição do equipamento químico editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar descrição do equipamento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar a quantidade total de um equipamento químico:
const editTotalQuantity = async (equipmentId, NewtotalQuantity) => {
  const query = "CALL EditEquipmentTotalQuantity(?, ?);";
  const data = [equipmentId, NewtotalQuantity];

  await connection.execute(query, data);

  return {
    status: true,
    message: "Quantidade total do equipamento químico editada com sucesso!",
  };
};

// O========================================================================================O

// Função para editar a qualidade de um equipamento químico:
const editQuality = async (equipmentId, newQuality) => {
  const query = "CALL EditEquipmentQuality(?, ?);";
  const data = [equipmentId, newQuality];

  const [result] = await connection.execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Qualidade do equipamento químico editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar qualidade do equipamento químico!",
    };
  }
};

// O========================================================================================O

// Função para editar a imagem de um equipamento químico:
const editImage = async (equipmentId, Newimage) => {
  const query = "CALL EditEquipmentImage(?, ?);";
  const data = [equipmentId, Newimage];

  const [result] = await connection.execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message: "Imagem do equipamento químico editada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar imagem do equipamento químico!",
    };
  }
};

const editSupervisorLevel = async (equipmentId, newSupervisorLevel) => {
  const query = "CALL EditEquipmentSupervisorLevel(?, ?);";
  const data = [equipmentId, newSupervisorLevel];

  const [result] = await connection.execute(query, data);

  if (result.affectedRows > 0) {
    return {
      status: true,
      message:
        "Nível de supervisor do equipamento químico editado com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Erro ao editar nível de supervisor do equipamento químico!",
    };
  }
};

// O========================================================================================O

// Exportação dos módulos:
module.exports = {
  createEquipment,
  removeEquipment,
  editName,
  editDescription,
  editTotalQuantity,
  editQuality,
  editImage,
  editSupervisorLevel,
};

// O========================================================================================O
