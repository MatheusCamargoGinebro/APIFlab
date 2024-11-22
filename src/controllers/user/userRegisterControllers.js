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
import nodeMailer from "nodemailer";

// Módulo dos Models Write de usuário:
import UserWrite from "../../models/user/userOperations/userWriteModels";

// Módulo dos Models Read de usuário:
import UserRead from "../../models/user/userOperations/userReadModels";

// Módulo dos Models Read de Campus:
import campusReadModels from "../../models/campus/campusReadModels";

// Módulo dos Models de verificação de código de email:
import MailCodeModels from "../../models/user/accountValidation/mailCodesModels";

// Módulo de tratamento de senhas:
import passwordTreat from "../../utils/password_treatment";

// O========================================================================================O

// Função para enviar um código de confirmação de email:
const sendMailCode = async (req, res) => {
  const email = req.body.newMail;

  // Verificando se o email existe no banco de dados:
  const emailCheck = await UserRead.getUserByEmail(email);

  if (emailCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Email já cadastrado",
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
      to: email,
      subject: "Confirmação de email",
      text: "Seu código de confirmação é: " + code,
    })
    .catch((error) => {
      return res.status(500).json({
        status: false,
        message: "Houve algum erro interno",
        error: error,
      });
    });

  // Deletando código de confirmação antigo (caso haja):
  await MailCodeModels.deleteMailCode(email);

  // Salvando o novo código de confirmação no banco de dados:
  const result = await MailCodeModels.saveMailCode({ email, code });

  if (result.status === true) {
    return res.status(200).json({
      status: true,
      message: "Código de confirmação enviado com sucesso!",
    });
  } else {
    return res.status(500).json({
      status: false,
      message: "Erro ao enviar código de confirmação.",
    });
  }
};

// O========================================================================================O

// Função para registrar um novo usuário, com verificação de código de email criptografia de senha:
const userRegister = async (req, res) => {
  // Dados do corpo da requisição:
  const { newName, newMail, newPassword, userType, campusId, validationCode } =
    req.body;

  /*-----------------------------------------------------*/

  // Verifica se o código de confirmação é válido:
  const mailCodeCheck = await MailCodeModels.getMailCode(
    newMail,
    validationCode
  );

  if (mailCodeCheck.status === false) {
    return res.status(400).json({
      status: false,
      message: "Código de confirmação inválido",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o email já está cadastrado:
  const emailCheck = await UserRead.getUserByEmail(newMail);

  if (emailCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Email já cadastrado",
    });
  }

  /*-----------------------------------------------------*/

  // Verificando se o nome de usuário já está cadastrado:
  const nameCheck = await UserRead.getUserByName(newName);

  if (nameCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Nome de usuário já cadastrado",
    });
  }

  /*-----------------------------------------------------*/

  // Verifica se o instituto existe:
  const campusCheck = await campusReadModels.getCampusById(campusId);

  if (campusCheck.status === false) {
    return res.status(400).json({
      status: false,
      message: "Campus não encontrado",
    });
  }

  /*-----------------------------------------------------*/

  // Gerando o salt para a criptografia da senha:
  const salt = await passwordTreat.saltGenerator();

  // Criptografando a senha:
  const hashedPassword = await passwordTreat.hashPasswordGenerator(
    newPassword,
    salt
  );

  /*-----------------------------------------------------*/

  // Verificando quantos usuários já estão cadastrados no campus:
  const usersInCampus = await UserRead.getUsersByCampus(campusId);

  // Definindo o nível baseado na quantidadee obtida:
  const CampusAdminLevel = usersInCampus.status === false ? 3 : 1;

  /*-----------------------------------------------------*/

  // Registrando o usuário:
  const status = await UserWrite.registerUser({
    nome: newName,
    email: newMail,
    senha: hashedPassword,
    salt: salt,
    tipo: userType,
    campusId: campusId,
    CampusAdminLevel: CampusAdminLevel,
  });

  if (status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao cadastrar usuário",
    });
  }

  /*-----------------------------------------------------*/

  // Deletando o código de confirmação:
  const mailCodeDelete = await MailCodeModels.deleteMailCode(newMail);

  if (mailCodeDelete.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao deletar código de confirmação",
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
export default { sendMailCode, userRegister, clearMailCodeList };

// O========================================================================================O
