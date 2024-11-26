// O============================================================================================O
/*
    O========================================================O
    |    Funções de verificação relacionadas aos usuários    |
    O========================================================O
    
    - Lista de middlewares de verificação de JSON relacionados a usuários:
    - [x] user_name;
    - [x] user_email;
    - [x] user_password;
    - [x] user_profpic;
    - [x] user_type;
    - [x] user_campusId;
    - [x] user_adminLevel;
    - [x] validationCode;
    - [x] user_id;
    - [X] checkToken;
*/

// O============================================================================================O

// Importando módulos:

// Modulo de verificação de token:
const JWT = require("jsonwebtoken");

// Modulo verificação da blacklist:
const tokenBlacklistModels = require("../models/user/accountValidation/tokenBlacklistModels");

// O============================================================================================O

// Função de verificação do campo Nome:
const user_name = (request, response, next) => {
  if (
    request.body.user_name === undefined ||
    request.body.user_name === null ||
    !request.body.user_name
  ) {
    return response
      .status(400)
      .send({ message: "Nome é obrigatório", error_at: "user_name" });
  }

  if (typeof request.body.user_name !== "string") {
    return response
      .status(400)
      .send({ message: "Nome deve ser uma string", error_at: "user_name" });
  }

  if (request.body.user_name.length < 3) {
    return response.status(400).send({
      message: "O nome deve ter pelo menos 3 caracteres!",
      error_at: "user_name",
    });
  }

  if (request.body.user_name.length > 128) {
    return response.status(400).send({
      message: "O nome deve ter no máximo 128 caracteres!",
      error_at: "user_name",
    });
  }

  if (typeof request.body.user_name !== "string") {
    return response
      .status(400)
      .send({ message: "Nome deve ser uma string!", error_at: "user_name" });
  }

  if (request.body.user_name === "") {
    return response
      .status(400)
      .send({ message: "Nome não pode ser vazio!", error_at: "user_name" });
  }
  
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ -]+$/.test(request.body.user_name)) {
    return response.status(400).send({
      message: "Nome deve conter apenas letras e espaços!",
      error_at: "user_name",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do campo Email:
const user_email = (request, response, next) => {
  if (
    !request.body.user_email ||
    request.body.user_email === undefined ||
    request.body.user_email === null
  ) {
    return response
      .status(400)
      .send({ message: "Email é obrigatório!", error_at: "user_email" });
  }

  if (typeof request.body.user_email !== "string") {
    return response
      .status(400)
      .send({ message: "Email deve ser uma string!", error_at: "user_email" });
  }

  if (request.body.user_email.length < 3) {
    return response.status(400).send({
      message: "O email deve ter pelo menos 3 caracteres!",
      error_at: "user_email",
    });
  }

  if (request.body.user_email.length > 256) {
    return response.status(400).send({
      message: "O email deve ter no máximo 256 caracteres!",
      error_at: "user_email",
    });
  }

  if (typeof request.body.user_email !== "string") {
    return response
      .status(400)
      .send({ message: "Email deve ser uma string!", error_at: "user_email" });
  }

  if (request.body.user_email === "") {
    return response
      .status(400)
      .send({ message: "Email não pode ser vazio!", error_at: "user_email" });
  }

  if (
    !/^[a-zA-Z0-9._-]+@aluno\.ifsp\.edu\.br$/.test(request.body.user_email) &&
    !/^[a-zA-Z0-9._-]+@ifsp\.edu\.br$/.test(request.body.email)
  ) {
    return response.status(400).send({
      message: "Email deve ser um email vinculado à instituição!",
      error_at: "user_email",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do campo Senha:
const user_password = (request, response, next) => {
  if (
    !request.body.user_password ||
    request.body.user_password === undefined ||
    request.body.user_password === null
  ) {
    return response
      .status(400)
      .send({ message: "Senha é obrigatória!", error_at: "user_password" });
  }

  if (typeof request.body.user_password !== "string") {
    return response.status(400).send({
      message: "Senha deve ser uma string!",
      error_at: "user_password",
    });
  }

  if (request.body.user_password.length < 8) {
    return response.status(400).send({
      message: "A senha deve ter pelo menos 8 caracteres!",
      error_at: "user_password",
    });
  }

  if (request.body.user_password.length > 256) {
    return response.status(400).send({
      message: "A senha deve ter no máximo 256 caracteres!",
      error_at: "user_password",
    });
  }

  if (typeof request.body.user_password !== "string") {
    return response.status(400).send({
      message: "Senha deve ser uma string!",
      error_at: "user_password",
    });
  }

  if (request.body.user_password === "") {
    return response.status(400).send({
      message: "Senha não pode ser vazia!",
      error_at: "user_password",
    });
  }

  if (!/(?=.*[a-z])/.test(request.body.user_password)) {
    return response.status(400).send({
      message: "A senha deve conter pelo menos uma letra minúscula!",
      error_at: "user_password",
    });
  }

  if (!/(?=.*[A-Z])/.test(request.body.user_password)) {
    return response.status(400).send({
      message: "A senha deve conter pelo menos uma letra maiúscula!",
      error_at: "user_password",
    });
  }

  if (!/(?=.*[0-9])/.test(request.body.user_password)) {
    return response.status(400).send({
      message: "A senha deve conter pelo menos um número!",
      error_at: "user_password",
    });
  }

  if (!/(?=.*[!@#\$%\^&\*])/.test(request.body.user_password)) {
    return response.status(400).send({
      message: "A senha deve conter pelo menos um caracter especial!",
      error_at: "user_password",
    });
  }

  if (!/(?=.{8,})/.test(request.body.user_password)) {
    return response.status(400).send({
      message: "A senha deve conter pelo menos 8 caracteres!",
      error_at: "user_password",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do campo Foto de Perfil:
const user_profpic = (request, response, next) => {
  if (typeof request.body.user_profpic !== "string") {
    return response.status(400).send({
      message: "Foto de perfil deve ser uma string!",
      error_at: "user_profpic",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do campo Tipo:
const user_type = (request, response, next) => {
  if (
    request.body.user_type === undefined ||
    request.body.user_type === null ||
    !request.body.user_type
  ) {
    return response
      .status(400)
      .send({ message: "Tipo é obrigatório!", error_at: "user_type" });
  }

  if (typeof request.body.user_type !== "number") {
    return response.status(400).send({
      message: "Tipo deve ser um número!",
      error_at: "user_type",
    });
  }

  if (
    request.body.user_type !== 1 &&
    request.body.user_type !== 2 &&
    request.body.user_type !== 3
  ) {
    return response.status(400).send({
      message: "O usuário deve ser do tipo Aluno, Professor ou Outro!",
      error_at: "user_type",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do campo ID do Campus:
const user_campusId = (request, response, next) => {
  if (
    request.body.user_campusId === undefined ||
    request.body.user_campusId === null ||
    !request.body.user_campusId
  ) {
    return response.status(400).send({
      message: "ID do campus é obrigatório!",
      error_at: "user_campusId",
    });
  }

  if (typeof request.body.user_campusId !== "number") {
    return response.status(400).send({
      message: "ID do campus deve ser um número!",
      error_at: "user_campusId",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do campo Nível de Administração:
const user_adminLevel = (request, response, next) => {
  if (
    request.body.user_adminLevel === undefined ||
    request.body.user_adminLevel === null ||
    !request.body.user_adminLevel
  ) {
    return response.status(400).send({
      message: "Nível de administração é obrigatório!",
      error_at: "user_adminLevel",
    });
  }

  if (typeof request.body.user_adminLevel !== "number") {
    return response.status(400).send({
      message: "Nível de administrador deve ser um número!",
      error_at: "user_adminLevel",
    });
  }

  if (request.body.user_adminLevel < 1 || request.body.user_adminLevel > 3) {
    return response.status(400).send({
      message: "Nível de administrador deve ser 1, 2 ou 3!",
      error_at: "user_adminLevel",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do código recebido para confirmação de email:
const validationCode = (request, response, next) => {
  if (
    request.body.validationCode === undefined ||
    request.body.validationCode === null ||
    !request.body.validationCode
  ) {
    return response.status(400).send({
      message: "Código de confirmação é obrigatório!",
      error_at: "validationCode",
    });
  }

  if (typeof request.body.validationCode !== "string") {
    return response.status(400).send({
      message: "Código de confirmação deve ser uma string!",
      error_at: "validationCode",
    });
  }

  if (request.body.validationCode.length !== 5) {
    return response.status(400).send({
      message: "Código de confirmação deve ter 5 caracteres!",
      error_at: "validationCode",
    });
  }

  if (!/^[0-9]*$/.test(request.body.validationCode)) {
    return response.status(400).send({
      message: "Código de confirmação deve conter apenas números!",
      error_at: "validationCode",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do campo ID:
const user_id = (request, response, next) => {
  if (
    request.body.user_id === undefined ||
    request.body.user_id === null ||
    !request.body.user_id
  ) {
    return response
      .status(400)
      .send({ message: "ID é obrigatório", error_at: "user_id" });
  }

  if (typeof request.body.user_id !== "number") {
    return response.status(400).send({
      message: "ID deve ser um número",
      error_at: "user_id",
    });
  }

  next();
};

// O============================================================================================O

// Função de verificação do token:
const checkToken = async (request, response, next) => {
  const token = request.headers["x-access-token"];

  // Verifica se o token está presente no header da requisição:
  if (!token || token === null || token === undefined || token === "") {
    return response.status(401).send({
      message: "Token não fornecido.",
      error_at: "token",
    });
  }

  // Verifica se o token está presente no banco de dados:
  const blackListedToken = await tokenBlacklistModels.getFromBlacklist(token);

  if (blackListedToken.status === true) {
    return response.status(401).send({
      message: "Token descartado.",
      error_at: "token",
    });
  }

  // Verifica se o token é válido:
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

// O============================================================================================O

// Exportação dos módulos:
module.exports = {
  user_name,
  user_email,
  user_password,
  user_profpic,
  user_type,
  user_campusId,
  user_adminLevel,
  validationCode,
  user_id,
  checkToken,
};

// O============================================================================================O
