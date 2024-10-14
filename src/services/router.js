/*
  O======================================================O
  |    Arquivo de configuração das rotas da aplicação    |
  O======================================================O
*/

// O========================================================================================O

// Importando o módulo de roteamento do express:
const express = require("express");
const router = express.Router();
module.exports = router;

// O========================================================================================O

/*
  O=================================================O
  |    Importação dos controllers e middlewares    |
  O=================================================O
*/

// O========================================================================================O

// Importando os controllers e middlewares de usuários:
const userControllers = require("../controllers/user/user_controllers");
const userMiddlewares = require("../middlewares/user/user_middlewares");

// Importando os controllers e middlewares de tokens:
const tokenMiddlewares = require("../middlewares/token/token_middlewares");
const tokenControllers = require("../controllers/token/token_controllers");

// Importando os controllers e middlewares de institutos:
const instituteMiddlewares = require("../middlewares/institute/institute_middlewares");
const instituteControllers = require("../controllers/institute/institute_controllers");

// Importando os controllers e middlewares de laboratórios:
const labMiddlewares = require("../middlewares/lab/lab_middlewares");
const labControllers = require("../controllers/lab/lab_controllers");


// O========================================================================================O

/*
  O===========================================O
  |    Configuração de sistemas de limpeza    |
  O===========================================O
*/

// O========================================================================================O

// A cada 30seg, limpar a blacklist de tokens:
setInterval(tokenControllers.clearBlackList, 1800000);

// A cada 24h, limpar os códigos de verificação de email:
setInterval(tokenControllers.clearMailCodeList, 86400000);

// O========================================================================================O

/*
  O==================================================O
  |    Configuração de rotas de usuários e tokens    |
  O==================================================O

  Usuário:
  - [X] Enviar código de verificação por email;
  - [X] Registrar usuário;
  - [X] Logar como usuário;
  - [X] Editar Informações do usuário:
    - [X] Editar nome;
    - [X] Editar email;
    - [X] Editar senha;
    - [X] Editar foto de perfil;
  - [X] Deslogar;
*/

// O========================================================================================O

// Rota de envio de código de verificação por email:
router.post(
  "/user/sendmailcode",
  userMiddlewares.user_email,
  userControllers.sendMailCode
);

// Rota de registro de usuário:
router.post(
  "/user/register",
  userMiddlewares.user_name,
  userMiddlewares.user_email,
  userMiddlewares.user_password,
  userMiddlewares.user_tipo,
  instituteMiddlewares.id_campus,
  userMiddlewares.user_mail_code,
  userControllers.userRegister
);

// Rota de login de usuário:
router.post(
  "/user/login",
  userMiddlewares.user_email,
  userMiddlewares.user_password,
  userControllers.userLogin
);

// Rota de logout de usuário:
router.post(
  "/user/logout",
  tokenMiddlewares.CheckToken,
  userControllers.userLogout
);

// Rota de edição do nome de usuário:
router.put(
  "/user/edit/name",
  tokenMiddlewares.CheckToken,
  userMiddlewares.user_name,
  userControllers.editUserName
);

// Rotas de edição de email de usuário:
router.put(
  "/user/edit/email",
  tokenMiddlewares.CheckToken,
  userMiddlewares.user_email,
  userMiddlewares.user_mail_code,
  userControllers.editUserEmail
);

// Rotas de edição de senha de usuário:
router.put(
  "/user/edit/password",
  tokenMiddlewares.CheckToken,
  userMiddlewares.user_password,
  userControllers.editUserPassword
);

// Rotas de edição de foto de perfil de usuário:
router.put(
  "/user/edit/picture",
  tokenMiddlewares.CheckToken,
  userMiddlewares.profile_picture,
  userControllers.editUserProfilePicture
);

// O========================================================================================O

/*
  O==================================================O
  |    Configuração de rotas de institutos e labs    |
  O==================================================O

  Instituto:
  - [X] Registrar instituto;
  - [X] Administradores:
    - [X] Adicionar administrador ao instituto;
    - [X] Remover administrador do instituto;
  - [X] Editar informações do instituto:
    - [X] Editar nome;
    - [X] Editar estado;
  - [~] Deletar instituto;
*/

// O========================================================================================O

// Rota de registro de instituto:
router.post(
  "/institute/register",
  instituteMiddlewares.campus_name,
  instituteMiddlewares.campus_state,
  instituteControllers.registerCampus
);

// Rota para adicionar um administrador ao instituto:
router.put(
  "/institute/admin/",
  tokenMiddlewares.CheckToken,
  instituteMiddlewares.id_campus,
  userMiddlewares.user_id,
  instituteControllers.addAdminUser
);

// Rota para remover um administrador do instituto:
router.delete(
  "/institute/admin/",
  tokenMiddlewares.CheckToken,
  instituteMiddlewares.id_campus,
  userMiddlewares.user_id,
  instituteControllers.removeAdminUser
);

// Rota para editar o nome do instituto:
router.put(
  "/institute/edit/name",
  tokenMiddlewares.CheckToken,
  instituteMiddlewares.campus_name,
  instituteMiddlewares.id_campus,
  instituteControllers.editCampusName
);

// Rota para editar o estado do instituto:
router.put(
  "/institute/edit/state",
  tokenMiddlewares.CheckToken,
  instituteMiddlewares.campus_state,
  instituteMiddlewares.id_campus,
  instituteControllers.editCampusState
);

// O========================================================================================O

/*
  O=============================================O
  |    Configuração de rotas de laboratórios    |
  O=============================================O

  Laboratório:
  - [X] Registrar laboratório;
  - [ ] Adicionar usuário ao laboratório;
  - [X] Editar informações do laboratório:
    - [X] Editar sala;
    - [X] Editar capacidade;
  - [] Administradores:
    - [] Adicionar administrador ao laboratório;
    - [] Remover administrador do laboratório;
  - [] Listar:
    - [] Listar laboratórios em que o usuário possui acesso;
    - [] Listar laboratórios em que o usuário possui tal nível de acesso;
  - [~] Deletar laboratório;

*/

// O========================================================================================O

// Rota de registro de laboratório:
router.post("/lab/register",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkSala,
  labMiddlewares.checkCapacidade,
  labControllers.CreateLab
);

router.post("/lab/adduser",
  tokenMiddlewares.CheckToken,
  userMiddlewares.user_id,
  labMiddlewares.checkLabId,
  labControllers.CreateLabUser
);

// Rota de edição de sala de laboratório:
router.put("/lab/edit/sala",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkSala,
  labMiddlewares.checkLabId,
  labControllers.EditLabName
);

// Rota de edição de capacidade de laboratório:
router.put("/lab/edit/capacidade",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkCapacidade,
  labMiddlewares.checkLabId,
  labControllers.EditLabCapacity
);

// Rota de adicionar administrador ao laboratório:
router.put("/lab/edit/admin",
  tokenMiddlewares.CheckToken,
  userMiddlewares.user_id,
  labMiddlewares.checkLabId,
  labControllers.addAdmin
);

// Rota de remover administrador do laboratório:
router.delete("/lab/edit/admin",
  tokenMiddlewares.CheckToken,
  userMiddlewares.user_id,
  labMiddlewares.checkLabId,
  labControllers.removeAdmin
);

// Rota de listar laboratórios em que o usuário possui acesso:
router.get("/lab/list/all",
  tokenMiddlewares.CheckToken,
  labControllers.GetLabs
);

// Rota de listar laboratórios em que o usuário possui tal nível de acesso:
router.get("/lab/list/level",
  tokenMiddlewares.CheckToken,
  userMiddlewares.adminLevel,
  labControllers.GetLabByUserLevel
);


// O========================================================================================O

/*
  O==========================================O
  |    Configuração de rotas de elementos    |
  O==========================================O

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

// O========================================================================================O

// O========================================================================================O

/*
  O=============================================O
  |    Configuração de rotas de equipamentos    |
  O=============================================O

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

// O========================================================================================O