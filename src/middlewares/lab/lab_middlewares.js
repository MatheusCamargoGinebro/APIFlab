/*
    O==========================================================O
    |   Funções de verificação relacionadas aos laboratórios   |
    O==========================================================O
*/

// O============================================================================================O

const checkSala = (request, response, next) => {
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

// O============================================================================================O

const checkCapacidade = (request, response, next) => {
    if (
        request.body.capacidade === undefined ||
        request.body.capacidade === null ||
        !request.body.capacidade
    ) {
        return response.status(400).send({
            message: "Capacidade é obrigatória",
            error_at: "capacidade",
        });
    }

    if (typeof request.body.capacidade !== "number") {
        return response.status(400).send({
            message: "Capacidade deve ser um número",
            error_at: "capacidade",
        });
    }

    if (request.body.capacidade < 1) {
        return response.status(400).send({
            message: "A capacidade deve ser de pelo menos 1 pessoa",
            error_at: "capacidade",
        });
    }

    next();
};

module.exports = {
};
