/*
    O==========================================================O
    |   Arquivo Models relacionado aos equipamentos químicos   |
    O==========================================================O
*/

// Importando o arquivo de conexão com o banco de dados:
const connection = require("../../utils/connection");

// O========================================================================================O

/*
    O==========================================================================O
    |    Funções de models relacionadas a inserção de equipamentos químicos    |
    O==========================================================================O

    Funções de models relacionadas a inserção de equipamentos químicos:
    - [X] CreateEquipment;
    - [X] RemoveEquipment;
*/

// O========================================================================================O

// Função para criar um equipamento químico:
const CreateEquipment = async (nome, descricao, quantidadeTotal, qualidade, imagem, id_lab) => {
    const query = `INSERT INTO equipamentos (Nome, Descricao, QuantidadeTotal, QuantidadeDisponivel, Qualidade, Imagem, ID_lab) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const data = [nome, descricao, quantidadeTotal, quantidadeTotal, qualidade, imagem, id_lab];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Equipamento químico criado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao criar equipamento químico!" };
    };
};

// Função para remover um equipamento químico:
const RemoveEquipment = async (equipmentId) => {
    const query = `DELETE FROM equipamentos WHERE ID_equip = ?`;
    const data = [equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Equipamento químico removido com sucesso!" };
    } else {
        return { status: false, message: "Erro ao remover equipamento químico!" };
    };
};

// O========================================================================================O

/*
    O=======================================================================O
    |    Funções de models relacionadas a edição de equipamentos químicos   |
    O=======================================================================O
 
    Funções de models relacionadas a edição de equipamentos químicos:
    - [X] EditName;
    - [X] EditDescription;
    - [X] EditTotalQuantity;
    - [X] EditAvailableQuantity;
    - [X] EditQuality;
    - [X] EditImage;
*/

// O========================================================================================O

// Função para editar o nome de um equipamento químico:
const EditName = async (equipmentId, name) => {
    const query = `UPDATE equipamentos SET Nome = ? WHERE ID_equip = ?`;
    const data = [name, equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Nome do equipamento químico editado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar nome do equipamento químico!" };
    };
};

// Função para editar a descrição de um equipamento químico:
const EditDescription = async (equipmentId, description) => {
    const query = `UPDATE equipamentos SET Descricao = ? WHERE ID_equip = ?`;
    const data = [description, equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Descrição do equipamento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar descrição do equipamento químico!" };
    };
}

// Função para editar a quantidade total de um equipamento químico:
const EditTotalQuantity = async (equipmentId, totalQuantity) => {
    const query = `UPDATE equipamentos SET QuantidadeTotal = ? WHERE ID_equip = ?`;
    const data = [totalQuantity, equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Quantidade total do equipamento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar quantidade total do equipamento químico!" };
    };
};

// Função para editar a quantidade disponível de um equipamento químico:
const EditAvailableQuantity = async (equipmentId, availableQuantity) => {
    const query = `UPDATE equipamentos SET QuantidadeDisponivel = ? WHERE ID_equip = ?`;
    const data = [availableQuantity, equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Quantidade disponível do equipamento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar quantidade disponível do equipamento químico!" };
    };
};

// Função para editar a qualidade de um equipamento químico:
const EditQuality = async (equipmentId, quality) => {
    const query = `UPDATE equipamentos SET Qualidade = ? WHERE ID_equip = ?`;
    const data = [quality, equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Qualidade do equipamento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar qualidade do equipamento químico!" };
    }
};

// Função para editar a imagem de um equipamento químico:
const EditImage = async (equipmentId, image) => {
    const query = `UPDATE equipamentos SET Imagem = ? WHERE ID_equip = ?`;
    const data = [image, equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Imagem do equipamento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar imagem do equipamento químico!" };
    };
};

// O========================================================================================O

/*
    O======================================================================O
    |    Funções de models relacionadas a busca de equipamentos químicos   |
    O======================================================================O
 
    Funções de models relacionadas a busca de equipamentos químicos:
    - [X] GetEquipmentById;
    - [X] GetEquipmentsByLabId;
    - [X] GetEquipmentByName;
*/

// O========================================================================================O

// Função para buscar um equipamento químico pelo ID:
const GetEquipmentById = async (equipmentId) => {
    const query = `SELECT * FROM equipamentos WHERE ID_equip = ?`;
    const data = [equipmentId];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result[0] };
    } else {
        return { status: false, message: "Equipamento químico não encontrado!" };
    };
};

// Função para buscar equipamentos químicos pelo ID do laboratório:
const GetEquipmentsByLabId = async (ID_lab) => {
    const query = `SELECT * FROM equipamentos WHERE ID_lab = ?`;
    const data = [ID_lab];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result };
    } else {
        return { status: false, message: "Equipamentos químicos não encontrados!" };
    }
}

// Função para buscar um equipamento químico pelo nome:
const GetEquipmentByName = async (name, ID_lab) => {
    const query = `SELECT * FROM equipamentos WHERE Nome = ? AND ID_lab = ?`;
    const data = [name, ID_lab];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result };
    } else {
        return { status: false, message: "Equipamento químico não encontrado!" };
    };
};

// O========================================================================================O

module.exports = {
    /* Create */
    CreateEquipment,
    RemoveEquipment,

    /* Edit */
    EditName,
    EditDescription,
    EditTotalQuantity,
    EditAvailableQuantity,
    EditQuality,
    EditImage,

    /* Get */
    GetEquipmentById,
    GetEquipmentsByLabId,
    GetEquipmentByName
};

// O========================================================================================O