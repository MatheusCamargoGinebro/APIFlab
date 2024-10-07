const express = require("express");
const router = express.Router();
module.exports = router;

const userControllers = require("../controllers/user/user_controllers");
const userMiddlewares = require("../middlewares/user/user_middlewares");

const tokenMiddlewares = require("../middlewares/token/token_middlewares");
const tokenControllers = require("../controllers/token/token_controllers");

const instituteMiddlewares = require("../middlewares/institute/institute_middlewares");
const instituteControllers = require("../controllers/institute/institute_controllers");

const labMiddlewares = require("../middlewares/lab/lab_middlewares");
const labControllers = require("../controllers/lab/lab_controllers");

// A cada 30seg, limpar a blacklist de tokens:
setInterval(tokenControllers.clearBlackList, 1800000);

// A cada 24h, limpar os códigos de verificação de email:
setInterval(tokenControllers.clearMailCodeList, 86400000);

// Rotas:
/*
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
/*
  Usuário:
    [X] Registrar usuário
    [X] Enviar código de verificação por email
    [X] Logar como usuário
    [X] Editar Informações do usuário
      [X] Editar nome
      [X] Editar email
      [X] Editar senha
      [X] Editar foto de perfil
    [X] Deslogar
*/

// +==========================+ Registro de usuário +==========================+ // OK
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

// +==========================+ Enviar código de verificação por email +==========================+ // OK
router.post(
    "/user/sendmailcode",
    userMiddlewares.user_email,
    userControllers.sendMailCode
);

// +==========================+ Logar como usuário +==========================+ // OK
router.post(
    "/user/login",
    userMiddlewares.user_email,
    userMiddlewares.user_password,
    userControllers.userLogin
);

// +==========================+ Deslogar +==========================+ // OK
router.post(
    "/user/logout",
    tokenMiddlewares.CheckToken,
    userControllers.userLogout
);

// +==========================+ Editar Informações do usuário +==========================+ // OK

// -==========================- Editar nome -==========================- // OK
router.put(
    "/user/edit/name",
    tokenMiddlewares.CheckToken,
    userMiddlewares.user_name,
    userControllers.editUserName
);

// -==========================- Editar email -==========================- // OK
router.put(
    "/user/edit/email",
    tokenMiddlewares.CheckToken,
    userMiddlewares.user_email,
    userMiddlewares.user_mail_code,
    userControllers.editUserEmail
);

// -==========================- Editar senha -==========================- // OK
router.put(
    "/user/edit/password",
    tokenMiddlewares.CheckToken,
    userMiddlewares.user_password,
    userControllers.editUserPassword
);

// -==========================- Editar foto de perfil -==========================- // OK
router.put(
    "/user/edit/picture",
    tokenMiddlewares.CheckToken,
    userMiddlewares.profile_picture,
    userControllers.editUserProfilePicture
);

// -=====================================================- Controle de institutos -=====================================================-
/*
  Instituto:
    [X] Registrar instituto;
    [] Administradores:
      [X] Adicionar administrador ao instituto;
      [X] Remover administrador do instituto;
    [X] Editar informações do instituto:
      X] Editar nome;
      [X] Editar estado;
    [-] Deletar instituto;
*/

// -==========================- Registrar instituto -==========================- // OK
router.post(
    "/institute/register",
    instituteMiddlewares.campus_name,
    instituteMiddlewares.campus_state,
    instituteControllers.registerCampus
);

// -==========================-  administradores -==========================-

// -==========================- Adicionar administrador ao instituto -==========================-
router.put(
    "/institute/admin/",
    tokenMiddlewares.CheckToken,
    instituteMiddlewares.id_campus,
    instituteMiddlewares.user_id,
    instituteControllers.addAdminUser
);

// -==========================- Remover administrador do instituto -==========================-
router.delete(
    "/institute/admin/",
    tokenMiddlewares.CheckToken,
    instituteMiddlewares.id_campus,
    instituteMiddlewares.user_id,
    instituteControllers.removeAdminUser
);

// +==========================+ Editar informações do instituto +==========================+

// -==========================- Editar nome -==========================-
router.put(
    "/institute/edit/name",
    tokenMiddlewares.CheckToken,
    instituteMiddlewares.campus_name,
    instituteMiddlewares.id_campus,
    instituteControllers.editCampusName
);

// -==========================- Editar estado -==========================-
router.put(
    "/institute/edit/state",
    tokenMiddlewares.CheckToken,
    instituteMiddlewares.campus_state,
    instituteMiddlewares.id_campus,
    instituteControllers.editCampusState
);

// -=====================================================- Controle de laboratório -=====================================================-
/*
  Laboratório:
    [] Registrar laboratório;
    [] Editar informações do laboratório:
      [] Editar código da sala;
      [] Editar capacidade;
    [] Listar:
      [] Listar laboratórios por instituto;
      [] Listar laboratórios em que o usuário é responsável;
      [] Listar laboratórios em que o usuário possui acesso;
      [] Listar elementos do laboratório;
      [] Listar equipamentos do laboratório;
    [-] Deletar laboratório;
*/

router.post(
    "/lab/register",
    /* tokenMiddlewares.CheckToken, */
    labMiddlewares.checkLabName,
    labControllers.registerLab
);

// -=====================================================- Controle de elementos -=====================================================-
/*
  Elemento:
    [] Registrar elemento em laboratório;
    [] Editar informações do elemento:
      [] Editar nome;
      [] Editar quantidade;
      [] Editar peso molecular;
      [] Editar numero_cas;
      [] Editar numero_ec;
      [] Editar estado_fisico;
      [] editar imagem;
    [] Listar:
      [] Listar elementos de determinado laboratório;
      [] Listar reservas do elemento;
    [] Deletar elemento;
*/

// -=====================================================- Controle de equipamentos -=====================================================-
/*
  Equipamento:
    [] Registrar equipamento em laboratório;
    [] Editar informações do equipamento: 
      [] Editar nome;
      [] Editar descrição;
      [] Editar QuantidadeTotal;
      [] Editar Qualidade;
      [] Editar imagem;
    [] Listar:
      [] Listar equipamentos de determinado laboratório;
      [] Listar reservas do equipamento;
    [] Deletar equipamento;
*/
