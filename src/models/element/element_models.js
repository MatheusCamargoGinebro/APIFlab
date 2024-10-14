/*
    O=======================================================O
    |   Arquivo Models relacionado aos elementos químicos   |
    O=======================================================O
*/

// Importando o arquivo de conexão com o banco de dados:
const connection = require("../../utils/connection");

// O========================================================================================O

/*
    O=======================================================================O
    |    Funções de models relacionadas a inserção de elementos químicos    |
    O=======================================================================O

    Funções de models relacionadas a inserção de elementos químicos:
    - [] CreateElement;
    - [] RemoveElement;
*/

// O========================================================================================O

// Função para criar um elemento químico:
const CreateElement = async (nome, quantidade, descricao, peso_molecular, numero_cas, numero_ec, estado_fisico, imagem, id_lab) => {
    const query = `INSERT INTO elementos (nome, quantidade, descricao, peso_molecular, numero_cas, numero_ec, estado_fisico, image, ID_lab) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const data = [nome, quantidade, descricao, peso_molecular, numero_cas, numero_ec, estado_fisico, imagem, id_lab];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Elemento químico criado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao criar elemento químico!" };
    };
};

// Função para remover um elemento químico:
const RemoveElement = async (elementId) => {
    const query = `DELETE FROM elementos WHERE id = ?`;
    const data = [elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Elemento químico removido com sucesso!" };
    } else {
        return { status: false, message: "Erro ao remover elemento químico!" };
    };
};

// O========================================================================================O

/*
    O======================================================================O
    |    Funções de models relacionadas a edição de elementos químicos     |
    O======================================================================O
 
    Funções de models relacionadas a edição de elementos químicos:
    - [] EditName;
    - [] EditQuantity;
    - [] EditDescription;
    - [] EditMolarMass;
    - [] EditCasNumber;
    - [] EditEcNumber;
    - [] EditPhysicalState;
    - [] EditImage;
*/

// O========================================================================================O

// Função para editar o nome de um elemento químico:
const EditName = async (elementId, name) => {
    const query = `UPDATE elementos SET nome = ? WHERE id = ?`;
    const data = [name, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Nome do elemento químico editado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar nome do elemento químico!" };
    };
};

// Função para editar a quantidade de um elemento químico:
const EditQuantity = async (elementId, quantity) => {
    const query = `UPDATE elementos SET quantidade = ? WHERE id = ?`;
    const data = [quantity, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Quantidade do elemento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar quantidade do elemento químico!" };
    };
};

// Função para editar a descrição de um elemento químico:
const EditDescription = async (elementId, description) => {
    const query = `UPDATE elementos SET descricao = ? WHERE id = ?`;
    const data = [description, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Descrição do elemento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar descrição do elemento químico!" };
    };
};

// Função para editar o peso molecular de um elemento químico:
const EditMolarMass = async (elementId, molarMass) => {
    const query = `UPDATE elementos SET peso_molecular = ? WHERE id = ?`;
    const data = [molarMass, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Peso molecular do elemento químico editado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar peso molecular do elemento químico!" };
    };
};

// Função para editar o número CAS de um elemento químico:
const EditCasNumber = async (elementId, casNumber) => {
    const query = `UPDATE elementos SET numero_cas = ? WHERE id = ?`;
    const data = [casNumber, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Número CAS do elemento químico editado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar número CAS do elemento químico!" };
    };
};

// Função para editar o número EC de um elemento químico:
const EditEcNumber = async (elementId, ecNumber) => {
    const query = `UPDATE elementos SET numero_ec = ? WHERE id = ?`;
    const data = [ecNumber, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Número EC do elemento químico editado com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar número EC do elemento químico!" };
    };
};

// Função para editar o estado físico de um elemento químico:
const EditPhysicalState = async (elementId, physicalState) => {
    const query = `UPDATE elementos SET estado_fisico = ? WHERE id = ?`;
    const data = [physicalState, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return {
            status: true, message: "Estado físico do elemento químico editado com sucesso!"
        };
    } else {
        return { status: false, message: "Erro ao editar estado físico do elemento químico!" };
    };
};

// Função para editar a imagem de um elemento químico:
const EditImage = async (elementId, image) => {
    const query = `UPDATE elementos SET image = ? WHERE id = ?`;
    const data = [image, elementId];

    const [result] = await connection.execute(query, data);

    if (result.affectedRows > 0) {
        return { status: true, message: "Imagem do elemento químico editada com sucesso!" };
    } else {
        return { status: false, message: "Erro ao editar imagem do elemento químico!" };
    };
};

// O========================================================================================O

/*
    O====================================================================O
    |    Funções de models relacionadas a busca de elementos químicos    |
    O====================================================================O
 
    Funções de models relacionadas a busca de elementos químicos:
    - [] GetElementById;
    - [] GetElementsByLabId;
    - [] GetElementByName;
    - [] GetElementByCasNumber;
    - [] GetElementByEcNumber;
*/

// O========================================================================================O

// Função para buscar um elemento químico pelo ID:
const GetElementById = async (elementId) => {
    const query = `SELECT * FROM elementos WHERE id = ?`;
    const data = [elementId];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result[0] };
    } else {
        return { status: false, message: "Elemento químico não encontrado!" };
    };
};

// Função para buscar elementos químicos pelo ID do laboratório:
const GetElementsByLabId = async (ID_lab) => {
    const query = `SELECT * FROM elementos WHERE ID_lab = ?`;
    const data = [ID_lab];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result };
    } else {
        return { status: false, message: "Elementos químicos não encontrados!" };
    };
};

// Função para buscar um elemento químico pelo nome:
const GetElementByName = async (name, ID_lab) => {
    const query = `SELECT * FROM elementos WHERE nome = ? AND ID_lab = ?`;
    const data = [name, ID_lab];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result };
    } else {
        return { status: false, message: "Elemento químico não encontrado!" };
    };
};

// Função para buscar um elemento químico pelo número CAS:
const GetElementByCasNumber = async (casNumber, ID_lab) => {
    const query = `SELECT * FROM elementos WHERE numero_cas = ? AND ID_lab = ?`;
    const data = [casNumber, ID_lab];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result };
    } else {
        return { status: false, message: "Elemento químico não encontrado!" };
    };
};

// Função para buscar um elemento químico pelo número EC:
const GetElementByEcNumber = async (ecNumber, ID_lab) => {
    const query = `SELECT * FROM elementos WHERE numero_ec = ? AND ID_lab = ?`;
    const data = [ecNumber, ID_lab];

    const [result] = await connection.execute(query, data);

    if (result.length > 0) {
        return { status: true, data: result };
    } else {
        return { status: false, message: "Elemento químico não encontrado!" };
    };
};

// O========================================================================================O

module.exports = {
    /* Create */
    CreateElement,
    RemoveElement,

    /* Edit */
    EditName,
    EditQuantity,
    EditDescription,
    EditMolarMass,
    EditCasNumber,
    EditEcNumber,
    EditPhysicalState,
    EditImage,

    /* Get */
    GetElementById,
    GetElementsByLabId,
    GetElementByName,
    GetElementByCasNumber,
    GetElementByEcNumber,
};

// O========================================================================================O
