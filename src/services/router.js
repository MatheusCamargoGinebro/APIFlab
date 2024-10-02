const express = require("express");
const router = express.Router();
module.exports = router;

const userControllers = require("../controllers/user/user_controllers");

const userMiddlewares = require("../middlewares/user/user_middlewares");

const tokenMiddlewares = require("../middlewares/token/token_middlewares");

// Rotas:
/*
 - Usuário: OK
    - Registrar usuário
    - Logar como usuário
    - Editar proprias informações de usuário
    - Listar reservas do usuário
    
  -- Instituto:
    - Registrar instituto
    - Editar informações do instituto
    - Deletar instituto

  -- Laboratório:
    - Registrar laboratório
    - Editar informações do laboratório
    - Deletar laboratório
    - Listar
      - Listar laboratórios por instituto
      - Listar laboratórios em que o usuário é responsável
      - Listar laboratórios em que o usuário possui acesso
      - Listar reservas do laboratório
      - Listar elementos do laboratório
      - Listar equipamentos do laboratório
    - Reservar horário no laboratório
      - Verificar disponibilidade
      - Reservar elemento para ser utilizado no horário
      - Reservar equipamento para ser utilizado no horário
      - Cancelar reserva

  -- Equipamento:
    - Registrar equipamento em laboratório
    - Editar informações do equipamento
    - Deletar equipamento
    - Listar reservas do equipamento

  -- Elemento:
    - Registrar elemento em laboratório
    - Editar informações do elemento
    - Deletar elemento
    - Listar reservas do elemento
*/

// -=====================================================- Controle de usuários -=====================================================-
router.post(
    "/user/register",
    userMiddlewares.user_name,
    userMiddlewares.user_email,
    userMiddlewares.user_password,
    userMiddlewares.user_tipo,
    userMiddlewares.user_id_campus,
    userMiddlewares.user_mail_code,
    userControllers.userRegister
);

router.post(
    "/user/sendmailcode",
    userMiddlewares.user_email,
    userControllers.sendMailCode
);

router.post(
    "/user/login",
    userMiddlewares.user_email,
    userMiddlewares.user_password,
    userControllers.userLogin
);

router.post(
    "/user/logout",
    tokenMiddlewares.CheckToken,
    userControllers.userLogout
);

router.put(
    "/user/edit/name",
    tokenMiddlewares.CheckToken,
    userMiddlewares.user_name,
    userControllers.editUserName
);

router.put(
    "/user/edit/email",
    tokenMiddlewares.CheckToken,
    userMiddlewares.user_email,
    userMiddlewares.user_mail_code,
    userControllers.editUserEmail
);

router.put(
    "/user/edit/password",
    tokenMiddlewares.CheckToken,
    userMiddlewares.user_password,
    userControllers.editUserPassword
);

router.put(
    "/user/edit/picture",
    tokenMiddlewares.CheckToken,
    userMiddlewares.profile_picture,
    userControllers.editUserProfilePicture
);

// -=====================================================- Controle de institutos -=====================================================-
router.post(
    "/institute/register",
    tokenMiddlewares.CheckToken,
    campusMiddlewares.campus_name,
    campusMiddlewares.campus_telefone,
    campusMiddlewares.campus_email,
    campusControllers.registerCampus
);

router.post(
    "/institute/register/endereco",
    tokenMiddlewares.CheckToken,
    campusMiddlewares.numero,
    campusMiddlewares.rua,
    campusMiddlewares.complemento,
    campusMiddlewares.bairro,
    campusMiddlewares.cidade,
    campusMiddlewares.estado,
    campusMiddlewares.pais,
    campusMiddlewares.cep,
    campusMiddlewares.id_campus
);

router.put(
    "/institute/edit/name",
    tokenMiddlewares.CheckToken,
    campusMiddlewares.campus_name,
    campusMiddlewares.id_campus,
    campusControllers.editCampusName
);

router.put(
    "/institute/edit/telefone",
    tokenMiddlewares.CheckToken,
    campusMiddlewares.campus_telefone,
    campusMiddlewares.id_campus,
    campusControllers.editCampusTelefone
);

router.put(
    "/institute/edit/email",
    tokenMiddlewares.CheckToken,
    campusMiddlewares.campus_email,
    campusMiddlewares.id_campus,
    campusControllers.editCampusEmail
);

router.put(
    "/institute/edit/endereco",
    tokenMiddlewares.CheckToken,
    campusMiddlewares.numero,
    campusMiddlewares.rua,
    campusMiddlewares.complemento,
    campusMiddlewares.bairro,
    campusMiddlewares.cidade,
    campusMiddlewares.estado,
    campusMiddlewares.pais,
    campusMiddlewares.cep,
    campusMiddlewares.id_campus,
    campusControllers.editCampusAddress
);
