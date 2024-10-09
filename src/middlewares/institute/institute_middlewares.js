/*
    O==============================================================O
    |   Arquivo de verificação de JSON relacionado a institutos    |
    O==============================================================O
*/

const campus_name = (request, response, next) => {
    if (
        request.body.campus_name === undefined ||
        request.body.campus_name === null ||
        !request.body.campus_name
    ) {
        return response.status(400).send({
            message: "Nome do campus é obrigatório",
            error_at: "campus_name",
        });
    }

    if (typeof request.body.campus_name !== "string") {
        return response.status(400).send({
            message: "Nome do campus deve ser uma string",
            error_at: "campus_name",
        });
    }

    if (request.body.campus_name.length < 3) {
        return response.status(400).send({
            message: "O nome do campus deve ter pelo menos 3 caracteres",
            error_at: "campus_name",
        });
    }

    if (request.body.campus_name.length > 256) {
        return response.status(400).send({
            message: "O nome do campus deve ter no máximo 256 caracteres",
            error_at: "campus_name",
        });
    }

    next();
};

const campus_state = (request, response, next) => {
    if (
        request.body.campus_state === undefined ||
        request.body.campus_state === null ||
        !request.body.campus_state
    ) {
        return response.status(400).send({
            message: "Estado do campus é obrigatório",
            error_at: "campus_state",
        });
    }

    if (typeof request.body.campus_state !== "string") {
        return response.status(400).send({
            message: "Estado do campus deve ser uma string",
            error_at: "campus_state",
        });
    }

    if (request.body.campus_state === "") {
        return response.status(400).send({
            message: "Estado do campus não pode ser vazio",
            error_at: "campus_state",
        });
    }

    if (request.body.campus_state.length != 2) {
        return response.status(400).send({
            message: "A sigla do estado deve ter 2 caracteres",
            error_at: "campus_state",
        });
    }

    if (!/^[a-zA-Z]*$/.test(request.body.campus_state)) {
        return response.status(400).send({
            message: "Estado do campus deve conter apenas letras",
            error_at: "campus_state",
        });
    }

    request.body.campus_state = request.body.campus_state.toUpperCase();

    if (
        ![
            "AC",
            "AL",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MA",
            "MT",
            "MS",
            "MG",
            "PA",
            "PB",
            "PR",
            "PE",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SP",
            "SE",
            "TO",
        ].includes(request.body.campus_state)
    ) {
        return response.status(400).send({
            message: "Estado do campus inválido",
            error_at: "campus_state",
        });
    }

    next();
};

const id_campus = (request, response, next) => {
    if (
        request.body.campus_id === undefined ||
        request.body.campus_id === null ||
        !request.body.campus_id
    ) {
        return response.status(400).send({
            message: "ID do campus é obrigatório",
            error_at: "campus_id",
        });
    }

    if (typeof request.body.campus_id !== "number") {
        return response.status(400).send({
            message: "ID do campus deve ser um número",
            error_at: "campus_id",
        });
    }

    next();
};

module.exports = {
    campus_name,
    campus_state,
    id_campus,
};
// O============================================================================================O
