/*
    O===================================================================O
    |   Funções de verificação relacionadas aos equipamentos químicos   |
    O===================================================================O
*/

// O============================================================================================O

const checkEquipmentID = (request, response, next) => {
    if (
        request.body.equipment_id === undefined ||
        request.body.equipment_id === null ||
        request.body.equipment_id === "" ||
        !request.body.equipment_id
    ) {
        return response.status(400).send({
            message: "ID do equipamento é obrigatório",
            error_at: "equipment_id",
        });
    }

    if (typeof request.body.equipment_id !== "number") {
        return response.status(400).send({
            message: "ID do equipamento deve ser um número",
            error_at: "equipment_id",
        });
    }

    next();
};

// O============================================================================================O

const checkEquipmentName = (request, response, next) => {
    if (
        request.body.equipment_name === undefined ||
        request.body.equipment_name === null ||
        request.body.equipment_name === "" ||
        !request.body.equipment_name
    ) {
        return response.status(400).send({
            message: "Nome do equipamento é obrigatório",
            error_at: "equipment_name",
        });
    }

    if (typeof request.body.equipment_name !== "string") {
        return response.status(400).send({
            message: "Nome do equipamento deve ser uma string",
            error_at: "equipment_name",
        });
    }

    if (request.body.equipment_name.length < 1) {
        return response.status(400).send({
            message: "O nome do equipamento deve ter pelo menos 1 caracter",
            error_at: "equipment_name",
        });
    }

    if (request.body.equipment_name.length > 128) {
        return response.status(400).send({
            message: "O nome do equipamento deve ter no máximo 128 caracteres",
            error_at: "equipment_name",
        });
    }

    next();
}

// O============================================================================================O

const checkEquipmentDescription = (request, response, next) => {
    if (
        request.body.equipment_description === undefined ||
        request.body.equipment_description === null ||
        request.body.equipment_description === "" ||
        !request.body.equipment_description
    ) {
        return response.status(400).send({
            message: "Descrição do equipamento é obrigatória",
            error_at: "equipment_description",
        });
    }

    if (typeof request.body.equipment_description !== "string") {
        return response.status(400).send({
            message: "Descrição do equipamento deve ser uma string",
            error_at: "equipment_description",
        });
    }

    if (request.body.equipment_description.length < 1) {
        return response.status(400).send({
            message: "A descrição do equipamento deve ter pelo menos 1 caracter",
            error_at: "equipment_description",
        });
    }

    next();
}

// O============================================================================================O

const checkEquipmentQuantity = (request, response, next) => {
    if (
        request.body.equipment_quantity === undefined ||
        request.body.equipment_quantity === null ||
        !request.body.equipment_quantity
    ) {
        return response.status(400).send({
            message: "Quantidade do equipamento é obrigatória",
            error_at: "equipment_quantity",
        });
    }

    if (typeof request.body.equipment_quantity !== "number") {
        return response.status(400).send({
            message: "Quantidade do equipamento deve ser um número",
            error_at: "equipment_quantity",
        });
    }

    if (request.body.equipment_quantity < 0) {
        return response.status(400).send({
            message: "Quantidade do equipamento não pode ser negativa",
            error_at: "equipment_quantity",
        });
    }

    next();
}

// O============================================================================================O

const checkEquipmentQuality = (request, response, next) => {
    if (
        request.body.equipment_quality === undefined ||
        request.body.equipment_quality === null ||
        request.body.equipment_quality === "" ||
        !request.body.equipment_quality
    ) {
        return response.status(400).send({
            message: "Qualidade do equipamento é obrigatória",
            error_at: "equipment_quality",
        });
    }

    if (typeof request.body.equipment_quality !== "number") {
        return response.status(400).send({
            message: "Qualidade do equipamento deve ser um número",
            error_at: "equipment_quality",
        });
    }

    if (request.body.equipment_quality < 0) {
        return response.status(400).send({
            message: "Qualidade do equipamento não pode ser negativa",
            error_at: "equipment_quality",
        });
    }

    if (request.body.equipment_quality > 5) {
        return response.status(400).send({
            message: "Qualidade do equipamento não pode ser maior que 5",
            error_at: "equipment_quality",
        });
    }

    next();
}

// O============================================================================================O

const checkEquipmentImage = (request, response, next) => {
    if (
        request.body.equipment_image === undefined ||
        request.body.equipment_image === null ||
        request.body.equipment_image === "" ||
        !request.body.equipment_image
    ) {
        request.body.imagem = "";
    }

    if (typeof request.body.equipment_image !== "string") {
        return response.status(400).send({
            message: "Imagem do equipamento deve ser uma string",
            error_at: "equipment_image",
        });
    }

    next();
}

// O============================================================================================O

module.exports = {
    checkEquipmentID,
    checkEquipmentName,
    checkEquipmentDescription,
    checkEquipmentQuantity,
    checkEquipmentQuality,
    checkEquipmentImage,
};