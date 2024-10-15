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

// Importando os controllers e middlewares de elementos:
const elementMiddlewares = require("../middlewares/element/element_middlewares");
const elementControllers = require("../controllers/element/element_controllers");
const e = require("express");

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
  - [X] Adicionar usuário ao laboratório;
  - [X] Editar informações do laboratório:
    - [X] Editar sala;
    - [X] Editar capacidade;
  - [X] Administradores:
    - [X] Adicionar administrador ao laboratório;
    - [X] Remover administrador do laboratório;
  - [X] Listar:
    - [X] Listar laboratórios em que o usuário possui acesso;
    - [X] Listar laboratórios em que o usuário possui tal nível de acesso;
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
    [] Remover elemento de laboratório;
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
*/

// O========================================================================================O

// Rota de registro de elemento:
router.post("/element/register",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkNome,
  elementMiddlewares.checkQuantidade,
  elementMiddlewares.checkDescricao,
  elementMiddlewares.checkPesoMolecular,
  elementMiddlewares.checkNumeroCAS,
  elementMiddlewares.checkNumeroEC,
  elementMiddlewares.checkEstadoFisico,
  elementMiddlewares.checkImage,
  elementControllers.createElement,
);

// Rota de remoção de elemento:
router.delete("/element/remove",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementControllers.removeElement,
);

// Rota de edição de nome de elemento:
router.put("/element/edit/name",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementMiddlewares.checkNome,
  elementControllers.editName,
);

// Rota de edição de quantidade de elemento:
router.put("/element/edit/quantity",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementMiddlewares.checkQuantidade,
  elementControllers.editQuantity,
);

// Rota de edição de peso molecular de elemento:
router.put("/element/edit/molarMass",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementMiddlewares.checkPesoMolecular,
  elementControllers.editMolarMass,
);

// Rota de edição de número CAS de elemento:
router.put("/element/edit/cas",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementMiddlewares.checkNumeroCAS,
  elementControllers.editCasNumber,
);

// Rota de edição de número EC de elemento:
router.put("/element/edit/ec",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementMiddlewares.checkNumeroEC,
  elementControllers.editEcNumber,
);

// Rota de edição de estado físico de elemento:
router.put("/element/edit/physicalstate",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementMiddlewares.checkEstadoFisico,
  elementControllers.editPhysicalState,
);

// Rota de edição de imagem de elemento:
router.put("/element/edit/image",
  tokenMiddlewares.CheckToken,
  labMiddlewares.checkLabId,
  elementMiddlewares.checkElementID,
  elementMiddlewares.checkImage,
  elementControllers.editImage,
);

// Rota de listagem de elementos de determinado laboratório:
router.get("/element/list",
  labMiddlewares.checkLabId,
  elementControllers.getElementsByLabId,
);

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
    [] Deletar equipamento;
*/

// O========================================================================================O