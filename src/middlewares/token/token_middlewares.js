/*
    O==============================================================O
    |    Arquivo de verificação de Token relacionado a usuários    |
    O==============================================================O
*/

const JWT = require("jsonwebtoken");
const tokenModels = require("../../models/token/token_models");

const CheckToken = async (request, response, next) => {
    const token = request.headers["x-access-token"];

    if (
        !token ||
        token === undefined ||
        token === null ||
        token === "" ||
        token.length < 0
    ) {
        return response
            .status(401)
            .send({ message: "Token não fornecido", error_at: "token-header" });
    }

    if (typeof token !== "string") {
        return response.status(401).send({
            message: "Token deve ser uma String",
            error_at: "token-header",
        });
    }

    if (
        !token.match(/^[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_.+/=]+$/)
    ) {
        return response
            .status(401)
            .send({ message: "Token inválido", error_at: "token" });
    }

    // Verifica se o token é um token JWT válido:
    if (!JWT.decode(token)) {
        return response
            .status(401)
            .send({ message: "Não validado", error_at: "token" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return response
                .status(401)
                .send({ message: "Token inválido", error_at: "token" });
        }

        request.userID = decoded.userID;
    });

    const result = await tokenModels.checkBlacklist(token);

    if (result === true) {
        return response
            .status(401)
            .send({ message: "Token inválido", error_at: "token" });
    }

    next();
};

module.exports = {
    CheckToken,
};
