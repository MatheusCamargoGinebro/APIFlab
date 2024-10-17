/*
    O================================================================O
    |   Funções de verificação relacionadas aos elementos químicos   |
    O================================================================O
*/

// O============================================================================================O

const checkElementID = (request, response, next) => {
    if (
        request.body.element_id === undefined ||
        request.body.element_id === null ||
        request.body.element_id === "" ||
        !request.body.element_id
    ) {
        return response.status(400).send({
            message: "ID do elemento é obrigatório",
            error_at: "element_id",
        });
    }

    if (typeof request.body.element_id !== "number") {
        return response.status(400).send({
            message: "ID do elemento deve ser um número",
            error_at: "element_id",
        });
    }

    next();
};

// O============================================================================================O

const checkNome = (request, response, next) => {
    if (
        request.body.nome === undefined ||
        request.body.nome === null ||
        request.body.nome === "" ||
        !request.body.nome
    ) {
        return response.status(400).send({
            message: "Nome do elemento é obrigatório",
            error_at: "nome",
        });
    }

    if (typeof request.body.nome !== "string") {
        return response.status(400).send({
            message: "Nome do elemento deve ser uma string",
            error_at: "nome",
        });
    }

    if (request.body.nome.length < 1) {
        return response.status(400).send({
            message: "O nome do elemento deve ter pelo menos 1 caracter",
            error_at: "nome",
        });
    }

    if (request.body.nome.length > 128) {
        return response.status(400).send({
            message: "O nome do elemento deve ter no máximo 128 caracteres",
            error_at: "nome",
        });
    }

    next();
};

// O============================================================================================O

const checkQuantidade = (request, response, next) => {
    if (
        request.body.quantidade === undefined ||
        request.body.quantidade === null ||
        !request.body.quantidade
    ) {
        return response.status(400).send({
            message: "Quantidade do elemento é obrigatória",
            error_at: "quantidade",
        });
    }

    if (typeof request.body.quantidade !== "number") {
        return response.status(400).send({
            message: "Quantidade do elemento deve ser um número",
            error_at: "quantidade",
        });
    }

    if (request.body.quantidade < 0) {
        return response.status(400).send({
            message: "Quantidade do elemento não pode ser negativa",
            error_at: "quantidade",
        });
    }

    next();
};

// O============================================================================================O

const checkDescricao = (request, response, next) => {
    if (
        request.body.descricao === undefined ||
        request.body.descricao === null ||
        request.body.descricao === "" ||
        !request.body.descricao
    ) {
        request.body.descricao = "Sem descrição";
    }

    if (typeof request.body.descricao !== "string") {
        return response.status(400).send({
            message: "Descrição do elemento deve ser uma string",
            error_at: "descricao",
        });
    }

    if (request.body.descricao.length < 1) {
        return response.status(400).send({
            message: "A descrição do elemento deve ter pelo menos 1 caracter",
            error_at: "descricao",
        });
    }

    next();
};

// O============================================================================================O

const checkPesoMolecular = (request, response, next) => {
    if (
        request.body.peso_molecular === undefined ||
        request.body.peso_molecular === null ||
        !request.body.peso_molecular
    ) {
        return response.status(400).send({
            message: "Peso molecular do elemento é obrigatório",
            error_at: "peso_molecular",
        });
    }

    if (typeof request.body.peso_molecular !== "number") {
        return response.status(400).send({
            message: "Peso molecular do elemento deve ser um número",
            error_at: "peso_molecular",
        });
    }

    if (request.body.peso_molecular < 0) {
        return response.status(400).send({
            message: "Peso molecular do elemento não pode ser negativo",
            error_at: "peso_molecular",
        });
    }

    next();
};

// O============================================================================================O

const checkNumeroCAS = (request, response, next) => {
    if (
        request.body.numero_cas === undefined ||
        request.body.numero_cas === null ||
        request.body.numero_cas === "" ||
        !request.body.numero_cas
    ) {
        return response.status(400).send({
            message: "Número CAS do elemento é obrigatório",
            error_at: "numero_cas",
        });
    }

    if (typeof request.body.numero_cas !== "string") {
        return response.status(400).send({
            message: "Número CAS do elemento deve ser uma string",
            error_at: "numero_cas",
        });
    }

    if (request.body.numero_cas.length < 1) {
        return response.status(400).send({
            message: "O número CAS do elemento deve ter pelo menos 1 caracter",
            error_at: "numero_cas",
        });
    }

    if (request.body.numero_cas.length > 32) {
        return response.status(400).send({
            message: "O número CAS do elemento deve ter no máximo 32 caracteres",
            error_at: "numero_cas",
        });
    }

    if (!/^[a-zA-Z0-9-]*$/.test(request.body.numero_cas)) {
        return response.status(400).send({
            message: "Número CAS do elemento deve conter apenas letras, números e hífens",
            error_at: "numero_cas",
        });
    }

    next();
}

// O============================================================================================O

const checkNumeroEC = (request, response, next) => {
    if (
        request.body.numero_ec === undefined ||
        request.body.numero_ec === null ||
        request.body.numero_ec === "" ||
        !request.body.numero_ec
    ) {
        return response.status(400).send({
            message: "Número EC do elemento é obrigatório",
            error_at: "numero_ec",
        });
    }

    if (typeof request.body.numero_ec !== "string") {
        return response.status(400).send({
            message: "Número EC do elemento deve ser uma string",
            error_at: "numero_ec",
        });
    }

    if (request.body.numero_ec.length < 1) {
        return response.status(400).send({
            message: "O número EC do elemento deve ter pelo menos 1 caracter",
            error_at: "numero_ec",
        });
    }

    if (request.body.numero_ec.length > 32) {
        return response.status(400).send({
            message: "O número EC do elemento deve ter no máximo 32 caracteres",
            error_at: "numero_ec",
        });
    }

    if (!/^[a-zA-Z0-9-]*$/.test(request.body.numero_ec)) {
        return response.status(400).send({
            message: "Número EC do elemento deve conter apenas letras, números e hífens",
            error_at: "numero_ec",
        });
    }

    next();
}

// O============================================================================================O

const checkEstadoFisico = (request, response, next) => {
    if (
        request.body.estado_fisico === undefined ||
        request.body.estado_fisico === null ||
        request.body.estado_fisico === "" ||
        !request.body.estado_fisico
    ) {
        return response.status(400).send({
            message: "Estado físico do elemento é obrigatório",
            error_at: "estado_fisico",
        });
    }

    if (typeof request.body.estado_fisico !== "number") {
        return response.status(400).send({
            message: "Estado físico do elemento deve ser um número",
            error_at: "estado_fisico",
        });
    }

    if (request.body.estado_fisico !== 1 && request.body.estado_fisico !== 2 && request.body.estado_fisico !== 3) {
        return response.status(400).send({
            message: "Estado físico do elemento deve ser 1 (sólido), 2 (líquido) ou 3 (gasoso)",
            error_at: "estado_fisico",
        });
    }

    next();
}

// O============================================================================================O

const checkImage = (request, response, next) => {
    if (
        request.body.imagem === undefined ||
        request.body.imagem === null ||
        request.body.imagem === "" ||
        !request.body.imagem
    ) {
        request.body.imagem = "";
    }

    if (typeof request.body.imagem !== "string") {
        return response.status(400).send({
            message: "Imagem do elemento deve ser uma string",
            error_at: "imagem",
        });
    }

    next();
}

module.exports = {
    checkElementID,
    checkNome,
    checkQuantidade,
    checkDescricao,
    checkPesoMolecular,
    checkNumeroCAS,
    checkNumeroEC,
    checkEstadoFisico,
    checkImage,
};