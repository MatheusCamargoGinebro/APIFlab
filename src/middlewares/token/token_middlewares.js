/*
    O==============================================================O
    |    Arquivo de verificação de Token relacionado a usuários    |
    O==============================================================O
*/

const JWT = require("jsonwebtoken");
const tokenModels = require("../../models/token/token_models");

const CheckToken = async (request, response, next) => {
    const token = request.headers["x-access-token"];

    // Verifica se o token está presente no header da requisição:
    if (!token || token === null || token === undefined || token === "") {
        return response.status(401).send({
            message: "Token não fornecido.",
            error_at: "token",
        });
    }

    // Verifica se o token é um token JWT válido:
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return response.status(401).send({
                message: "Token inválido ou expirado.",
                error_at: "token",
            });
        }

        next();
    });
};

module.exports = {
    CheckToken,
};
