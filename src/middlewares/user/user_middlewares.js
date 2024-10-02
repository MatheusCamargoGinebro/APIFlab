/*
    O=============================================================O
    |    Arquivo de verificação de JSON relacionado a usuários    |
    O=============================================================O
*/

const { request } = require("express");

// O============================================================================================O

// Função de verificação do campo Nome:
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

    if (typeof request.body.nome !== "string") {
        return response
            .status(400)
            .send({ message: "Nome deve ser uma string", error_at: "1" });
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

// O============================================================================================O

// Função de verificação do campo Email:
const user_email = (request, response, next) => {
    if (
        !request.body.email ||
        request.body.email === undefined ||
        request.body.email === null
    ) {
        return response
            .status(400)
            .send({ message: "Email é obrigatório", error_at: "2" });
    }

    if (typeof request.body.email !== "string") {
        return response
            .status(400)
            .send({ message: "Email deve ser uma string", error_at: "2" });
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

// O============================================================================================O

// Função de verificação do campo Senha:
const user_password = (request, response, next) => {
    if (
        !request.body.senha ||
        request.body.senha === undefined ||
        request.body.senha === null
    ) {
        return response
            .status(400)
            .send({ message: "Senha é obrigatória", error_at: "3" });
    }

    if (typeof request.body.senha !== "string") {
        return response.status(400).send({
            message: "Senha deve ser uma string",
            error_at: "3",
        });
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

// O============================================================================================O

// Função de verificação do campo Tipo:
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

    if (typeof request.body.tipo !== "number") {
        return response.status(400).send({
            message: "Tipo deve ser um número",
            error_at: "4",
        });
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

// O============================================================================================O

// Função de verificação do campo ID do Campus:
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

// O============================================================================================O

// Função de verificação do código recebido para confirmação de email:
const user_mail_code = (request, response, next) => {
    const code = request.body.code;

    if (!code || code === undefined || code === null || code === "") {
        return response.status(400).send({
            message: "Código de confirmação é obrigatório",
            error_at: "6",
        });
    }

    if (typeof code !== "string") {
        return response.status(400).send({
            message: "Código de confirmação deve ser uma string",
            error_at: "6",
        });
    }

    if (code.length !== 5) {
        return response.status(400).send({
            message: "Código de confirmação deve ter 5 caracteres",
            error_at: "6",
        });
    }

    if (!/^[0-9]*$/.test(code)) {
        return response.status(400).send({
            message: "Código de confirmação deve conter apenas números",
            error_at: "6",
        });
    }

    next();
};

// O============================================================================================O

const profile_picture = (request, response, next) => {
    if (typeof request.body.profilePic !== "string") {
        return response.status(400).send({
            message: "Foto de perfil deve ser uma string",
            error_at: "7",
        });
    }

    next();
};

// Exportação dos módulos:
module.exports = {
    user_name,
    user_email,
    user_password,
    user_tipo,
    user_id_campus,
    user_mail_code,
    profile_picture,
};
