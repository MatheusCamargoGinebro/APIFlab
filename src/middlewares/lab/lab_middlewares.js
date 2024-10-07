/*
    O==========================================================O
    |   Funções de verificação relacionadas aos laboratórios   |
    O==========================================================O
*/

const checkLabName = (request, response, next) => {
    if (
        request.body.sala === undefined ||
        request.body.sala === null ||
        request.body.sala === "" ||
        !request.body.sala
    ) {
        return response.status(400).send({
            message: "Nome da sala é obrigatório",
            error_at: "sala",
        });
    }

    if (typeof request.body.sala !== "string") {
        return response.status(400).send({
            message: "Nome da sala deve ser uma string",
            error_at: "sala",
        });
    }

    if (request.body.sala.length < 1) {
        return response.status(400).send({
            message: "O nome da sala deve ter pelo menos 1 caracter",
            error_at: "sala",
        });
    }

    if (request.body.sala.length > 16) {
        return response.status(400).send({
            message: "O nome da sala deve ter no máximo 16 caracteres",
            error_at: "sala",
        });
    }

    if (!/^[a-zA-Z0-9_-]*$/.test(request.body.sala)) {
        return response.status(400).send({
            message: "Nome da sala deve conter apenas letras, números, _ e -",
            error_at: "sala",
        });
    }

    next();
};

module.exports = {
    checkLabName,
};
