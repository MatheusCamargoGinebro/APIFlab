// O========================================================================================O

/*
    O=========================================================O
    |    Funções envolvidas na criação da conta do usuário    |
    O=========================================================O

    Lista de Funções:
    - [X] sendMailCode;
    - [X] registerUser;
    - [X] ClearMailCodeList;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de envio de emails:
const nodeMailer = require("nodemailer");

// Módulo dos Models Write de usuário:
const UserWrite = require("../../models/user/userOperations/userWriteModels");

// Módulo dos Models Read de usuário:
const UserRead = require("../../models/user/userOperations/userReadModels");

// Módulo dos Models Read de Campus:
const campusReadModels = require("../../models/campus/campusReadModels");

// Módulo dos Models de verificação de código de email:
const MailCodeModels = require("../../models/user/accountValidation/mailCodesModels");

// Módulo de tratamento de senhas:
const passwordTreat = require("../../utils/password_treatment");

// O========================================================================================O

// Função para enviar um código de confirmação de email:
const sendMailCode = async (req, res) => {
  const user_email = req.body.user_email;

  // Verificando se o email existe no banco de dados:
  const emailCheck = await UserRead.getUserByEmail(user_email);

  if (emailCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Email já cadastrado",
      error_at: "user_email",
    });
  }

  // Gerando um número aleatório de 10000 a 99999:
  const code = Math.floor(Math.random() * 89999 + 10000).toString();

  // Configurando e enviando o email:
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });

  transporter
    .sendMail({
      from: process.env.MAIL_USER,
      to: user_email,
      subject: "Confirmação de email",
      text: "Seu código de confirmação é: " + code,
    })
    .catch((error) => {
      return res.status(500).json({
        status: false,
        message: "Houve algum erro interno",
        error_at: "system_error",
        error: error,
      });
    });

  // Deletando código de confirmação antigo (caso haja):
  await MailCodeModels.deleteMailCode(user_email);

  // Salvando o novo código de confirmação no banco de dados:
  const result = await MailCodeModels.saveMailCode({
    email: user_email,
    code: code,
  });

  if (result.status === true) {
    return res.status(200).json({
      status: true,
      message: "Código de confirmação enviado com sucesso!",
    });
  } else {
    return res.status(500).json({
      status: false,
      message: "Erro ao enviar código de confirmação.",
      error_at: "system_error",
    });
  }
};

// O========================================================================================O

// Função para registrar um novo usuário, com verificação de código de email criptografia de senha:
const userRegister = async (req, res) => {
  // Dados do corpo da requisição:
  const {
    user_name,
    user_email,
    user_password,
    user_type,
    user_campusId,
    validationCode,
  } = req.body;

  /*-----------------------------------------------------*/

  // Verifica se o código de confirmação é válido:
  const mailCodeCheck = await MailCodeModels.getMailCode(
    user_email,
    validationCode
  );

  if (mailCodeCheck.status === false || mailCodeCheck.code !== validationCode) {
    return res.status(400).json({
      status: false,
      message: "Código de confirmação inválido",
      error_at: "validationCode",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o email já está cadastrado:
  const emailCheck = await UserRead.getUserByEmail(user_email);

  if (emailCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Email já cadastrado",
      error_at: "user_email",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o nome de usuário já está cadastrado:
  const nameCheck = await UserRead.getUserByName(user_name);

  if (nameCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Nome de usuário já cadastrado",
      error_at: "user_name",
    });
  }

  /*-----------------------------------------------------*/

  // Verifica se o instituto existe:
  const campusCheck = await campusReadModels.getCampusById(user_campusId);

  if (campusCheck.status === false) {
    return res.status(400).json({
      status: false,
      message: "Campus não encontrado",
      error_at: "user_campusId",
    });
  }

  /*-----------------------------------------------------*/

  // Gerando o salt para a criptografia da senha:
  const salt = await passwordTreat.saltGenerator();

  // Criptografando a senha:
  const hashedPassword = await passwordTreat.hashPasswordGenerator(
    user_password,
    salt
  );

  /*-----------------------------------------------------*/

  // Verificando quantos usuários já estão cadastrados no campus:
  const usersInCampus = await UserRead.getUsersByCampus(user_campusId);

  // Definindo o nível baseado na quantidadee obtida:
  const CampusAdminLevel = usersInCampus.status === false ? 3 : 1;

  /*-----------------------------------------------------*/

  // Criando o objeto do novo usuário:
  const newUser = {
    nome: user_name,
    email: user_email,
    senha: hashedPassword,
    salt: salt,
    tipo: user_type,
    campusId: user_campusId,
    CampusAdminLevel: CampusAdminLevel,
  };

  // Registrando o usuário:
  const status = await UserWrite.registerUser(newUser);

  if (status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao cadastrar usuário",
    });
  }

  /*-----------------------------------------------------*/

  // Deletando o código de confirmação:
  const mailCodeDelete = await MailCodeModels.deleteMailCode(user_email);

  if (mailCodeDelete.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao deletar código de confirmação",
      error_at: "system_error",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Usuário cadastrado com sucesso!",
  });

  /*-----------------------------------------------------*/
};

// O========================================================================================O

// Função para limpar a lista de códigos de email:
const clearMailCodeList = async () => {
  const result = await MailCodeModels.clearMailCodeList();

  return result;
};

// O========================================================================================O

// Exportação do módulo:
module.exports = { sendMailCode, userRegister, clearMailCodeList };

// O========================================================================================O
