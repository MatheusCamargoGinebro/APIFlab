const user_name = (request, response, next) => {
    if (
        request.body.nome === undefined ||
        request.body.nome === null ||
        !request.body.nome
    ) {
        return response
            .status(400)
            .send({ message: "Nome é obrigatório", error_at: "1" });
    }

    if (request.body.nome.length < 3) {
        return response.status(400).send({
            message: "O nome deve ter pelo menos 3 caracteres",
            error_at: "1",
        });
    }

    if (request.body.nome.length > 256) {
        return response.status(400).send({
            message: "O nome deve ter no máximo 256 caracteres",
            error_at: "1",
        });
    }

    if (typeof request.body.nome !== "string") {
        return response
            .status(400)
            .send({ message: "Nome deve ser uma string", error_at: "1" });
    }

    if (request.body.nome === "") {
        return response
            .status(400)
            .send({ message: "Nome não pode ser vazio", error_at: "1" });
    }

    if (!/^[a-zA-Z\s]*$/.test(request.body.nome)) {
        return response
            .status(400)
            .send({ message: "Nome deve conter apenas letras", error_at: "1" });
    }

    next();
};

const user_email = (request, response, next) => {
    if (!request.body.email) {
        return response
            .status(400)
            .send({ message: "Email é obrigatório", error_at: "2" });
    }

    if (request.body.email.length < 3) {
        return response.status(400).send({
            message: "O email deve ter pelo menos 3 caracteres",
            error_at: "2",
        });
    }

    if (request.body.email.length > 256) {
        return response.status(400).send({
            message: "O email deve ter no máximo 256 caracteres",
            error_at: "2",
        });
    }

    if (typeof request.body.email !== "string") {
        return response
            .status(400)
            .send({ message: "Email deve ser uma string", error_at: "2" });
    }

    if (request.body.email === "") {
        return response
            .status(400)
            .send({ message: "Email não pode ser vazio", error_at: "2" });
    }

    if (
        !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(request.body.email) &&
        !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(request.body.email)
    ) {
        return response.status(400).send({
            message: "Email deve ser um email vinculado à instituição",
            error_at: "2",
        });
    }

    next();
};

const user_password = (request, response, next) => {
    if (!request.body.senha) {
        return response
            .status(400)
            .send({ message: "Senha é obrigatória", error_at: "3" });
    }

    if (request.body.senha.length < 8) {
        return response.status(400).send({
            message: "A senha deve ter pelo menos 8 caracteres",
            error_at: "3",
        });
    }

    if (request.body.senha.length > 256) {
        return response.status(400).send({
            message: "A senha deve ter no máximo 256 caracteres",
            error_at: "3",
        });
    }

    if (typeof request.body.senha !== "string") {
        return response
            .status(400)
            .send({ message: "Senha deve ser uma string", error_at: "3" });
    }

    if (request.body.senha === "") {
        return response
            .status(400)
            .send({ message: "Senha não pode ser vazia", error_at: "3" });
    }

    // Verificação de caracteres inseridos na senha:
    if (!/(?=.*[a-z])/.test(request.body.senha)) {
        return response.status(400).send({
            message: "A senha deve conter pelo menos uma letra minúscula",
            error_at: "3",
        });
    }

    if (!/(?=.*[A-Z])/.test(request.body.senha)) {
        return response.status(400).send({
            message: "A senha deve conter pelo menos uma letra maiúscula",
            error_at: "3",
        });
    }

    if (!/(?=.*[0-9])/.test(request.body.senha)) {
        return response.status(400).send({
            message: "A senha deve conter pelo menos um número",
            error_at: "3",
        });
    }

    if (!/(?=.*[!@#\$%\^&\*])/.test(request.body.senha)) {
        return response.status(400).send({
            message: "A senha deve conter pelo menos um caracter especial",
            error_at: "3",
        });
    }

    if (!/(?=.{8,})/.test(request.body.senha)) {
        return response.status(400).send({
            message: "A senha deve conter pelo menos 8 caracteres",
            error_at: "3",
        });
    }

    next();
};

const user_tipo = (request, response, next) => {
    if (
        request.body.tipo === undefined ||
        request.body.tipo === null ||
        !request.body.tipo
    ) {
        return response
            .status(400)
            .send({ message: "Tipo é obrigatório", error_at: "4" });
    }

    if (
        request.body.tipo !== 1 &&
        request.body.tipo !== 2 &&
        request.body.tipo !== 3
    ) {
        return response.status(400).send({
            message: "O aluno deve ser do tipo Aluno, Professor ou Outro",
            error_at: "4",
        });
    }

    next();
};

const user_id_campus = (request, response, next) => {
    if (
        request.body.id_campus === undefined ||
        request.body.id_campus === null ||
        !request.body.id_campus
    ) {
        return response
            .status(400)
            .send({ message: "ID do campus é obrigatório", error_at: "5" });
    }

    if (typeof request.body.id_campus !== "number") {
        return response.status(400).send({
            message: "ID do campus deve ser um número",
            error_at: "5",
        });
    }

    if (request.body.id_campus < 1) {
        return response.status(400).send({
            message: "ID do campus deve ser maior que 0",
            error_at: "5",
        });
    }

    next();
};

module.exports = {
    user_name,
    user_email,
    user_password,
    user_tipo,
    user_id_campus,
};
