


// Importando conexão com o banco de dados:
const connection = require("../../utils/connection");

// Função para verificar se o login é válido:
const loginUser = async (email, senha) => {
    const query = "SELECT * FROM usuarios WHERE Email = ? AND Senha = ?;";
    const [result] = await connection.execute(query, [email, senha]);

    if (result.length > 0) {
        return { status: true, message: "Login é válido" };
    } else {
        return { status: false, message: "Email ou senha incorretos" };
    }
};