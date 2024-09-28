const connection = require("../utils/connection");

const registerUser = async (nome, email, senha, tipo, salt, ID_campus) => {
    const checkdata = {
        email: false,
        nome: false,
        id_campus: false,
        saved: false,
        message: "No data to check!",
    };

    // Verificando se o email já está cadastrado:
    const queryEmail = "SELECT * FROM usuarios WHERE Email = ?;";
    const [emailResult] = await connection.execute(queryEmail, [email]);

    if (emailResult.length > 0) {
        checkdata.email = false;
        checkdata.message = "Email já cadastrado!";
    } else {
        checkdata.email = true;
    }

    // Verificando se o nome já está cadastrado:
    const queryName = "SELECT * FROM usuarios WHERE Nome = ?;";
    const [nameResult] = await connection.execute(queryName, [nome]);

    if (nameResult.length > 0) {
        checkdata.nome = false;
        checkdata.message = "Nome já cadastrado!";
    } else {
        checkdata.nome = true;
    }

    // Verificando se o ID do campus é válido:
    const queryCampus = "SELECT * FROM campus WHERE ID_campus = ?;";
    const [campusResult] = await connection.execute(queryCampus, [ID_campus]);

    if (campusResult.length === 0) {
        checkdata.id_campus = false;
        checkdata.message = "ID do campus inválido!";
    } else {
        checkdata.id_campus = true;
    }

    if (
        checkdata.email === true &&
        checkdata.nome === true &&
        checkdata.id_campus === true
    ) {
        // Salvando o usuário no banco de dados:
        const query =
            "INSERT INTO usuarios (Nome, Email, Senha, Tipo, Salt, ID_campus) VALUES (?, ?, ?, ?, ?, ?);";
        await connection.execute(query, [
            nome,
            email,
            senha,
            tipo,
            salt,
            ID_campus,
        ]);

        checkdata.saved = true;

        checkdata.message = "Usuário cadastrado com sucesso!";
    }

    return checkdata;
};

module.exports = {
    registerUser,
};
