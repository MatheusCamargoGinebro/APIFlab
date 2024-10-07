/*
    O=================================================O
    |   Arquivo Models relacionado aos laboratórios   |
    O=================================================O
*/

const connection = require("../../utils/connection");

/*
    O=======================================================O
    |    Funções de Models relacionadas aos laboratórios    |
    O=======================================================O
*/

// Função para verificar se o nome da sala já está cadastrado no banco de dados:
const checkLabName = async (sala) => {
    const query = "SELECT * FROM laboratorios WHERE Sala = ?;";

    const [result] = await connection.execute(query, [sala]);

    console.log(result);

    if (result.length > 0) {
        return { status: true, message: "Sala existe", result };
    } else {
        return { status: false, message: "Sala não existe", result };
    }
};

// O========================================================================================O

module.exports = {
    checkLabName,
};

// O========================================================================================O
