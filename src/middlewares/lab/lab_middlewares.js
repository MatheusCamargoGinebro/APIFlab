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
        request.body.capacity === undefined ||
        request.body.capacity === null ||
        !request.body.capacity
    ) {
        return response.status(400).send({
            message: "Capacidade é obrigatória",
            error_at: "capacity",
        });
    }

    if (typeof request.body.capacity !== "number") {
        return response.status(400).send({
            message: "Capacidade deve ser um número",
            error_at: "capacity",
        });
    }

    if (request.body.capacity < 1) {
        return response.status(400).send({
            message: "A capacidade deve ser de pelo menos 1 pessoa",
            error_at: "capacity",
        });
    }

    next();
};

const checkLabId = async (request, response, next) => {
    if (
        request.params.lab_id === undefined ||
        request.params.lab_id === null ||
        request.params.lab_id === "" ||
        !request.params.lab_id
    ) {
        return response.status(400).send({
            message: "ID do laboratório é obrigatório",
            error_at: "lab_id",
        });
    }

    if (typeof request.params.lab_id !== "number") {
        return response.status(400).send({
            message: "ID do laboratório deve ser um número",
            error_at: "lab_id",
        });
    }

    next();
};

module.exports = {
    checkSala,
    checkCapacidade,
    checkLabId,
};
