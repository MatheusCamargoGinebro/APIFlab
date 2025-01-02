// O========================================================================================O

/* 
  O======================================================O
  |    Arquivo de configuração das rotas da aplicação    |
  O======================================================O

*/

// O========================================================================================O

// Importando o módulo de roteamento do express:
const express = require("express");
const router = express.Router();

// Configuração do CORS
router.use((__req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, Content-Type, Accept"
  );

  next();
});

module.exports = router;

// O========================================================================================O

// Importando Middlewares:

// Módulo de validação de dados de usuário:
const userMiddlewares = require("../middlewares/userMiddlewares");

// Módulo de validação de dados de laboratório:
const labMiddlewares = require("../middlewares/labMiddlewares");

// Módulo de validação de dados de campus:
const campusMiddlewares = require("../middlewares/campusMiddlewares");

// Módulo de validação de dados de equipamento:
const equipmentMiddlewares = require("../middlewares/equipmentMiddlewares");

// Módulo de validação de dados de elemento:
const elementMiddlewares = require("../middlewares/elementMiddlewares");

// Módulo de validação de dados de sessão:
const sessionMiddlewares = require("../middlewares/sessionMiddlewares");

// O========================================================================================O

// Importando Controllers:

// user:
// Módulo de controle de contas de usuário:
const accountCtrllrs = require("../controllers/user/userAccountControls");

// Módulo de controle de edição de usuário:
const userEditCtrllrs = require("../controllers/user/userEditControllers");

// Módulo de controle de registro de usuário:
const userRegisterCtrllrs = require("../controllers/user/userRegisterControllers");

// o----------------------------------------------------------------------------------o

// lab:
// Módulo de controle de criação de laboratório:
const labCreateCtrllrs = require("../controllers/lab/labCreateControllers");

// Módulo de controle de edição de laboratório:
const labEditCtrllrs = require("../controllers/lab/labEditControllers");

// Módulo de controle de leitura de laboratório:
const labReadCtrllrs = require("../controllers/lab/labReadControllers");

// o----------------------------------------------------------------------------------o

// institute:
// Módulo de controle de edição de campus:
const campusReadCtrllrs = require("../controllers/campus/campusReadControllers");

// Módulo de controle de edição de campus:
const campusWriteCtrllrs = require("../controllers/campus/campusWriteControllers");

// o----------------------------------------------------------------------------------o

// equipment:
// Módulo de controle de edição de equipamento:
const equipmentEditCtrllrs = require("../controllers/equipment/equipmentEditControllers");

// Módulo de controle de leitura de equipamento:
const equipmentReadCtrllrs = require("../controllers/equipment/equipmentReadControllers");

// Módulo de controle de escrita de equipamento:
const equipmentWriteCtrllrs = require("../controllers/equipment/equipmentWriteControllers");

// o----------------------------------------------------------------------------------o

// element:
// Módulo de controle de edição de elemento:
const elementEditCtrllrs = require("../controllers/element/elementEditControllers");

// Módulo de controle de leitura de elemento:
const elementReadCtrllrs = require("../controllers/element/elementReadControllers");

// Módulo de controle de escrita de elemento:
const elementWriteCtrllrs = require("../controllers/element/elementWriteControllers");

// o----------------------------------------------------------------------------------o

// session:
// Módulo de controle de sessão:
const sessionCtrllrs = require("../controllers/session/sessionControllers");

// O========================================================================================O

// Configuração de sistemas de limpeza:

// A cada 24h, limpar a blacklist de tokens, removendo os tokens já inválidos:
setInterval(accountCtrllrs.clearBlackList, 86400000);

// A cada 8h, limpar os códigos de verificação de email:
setInterval(accountCtrllrs.clearMailCodeList, 28800000);

// O========================================================================================O

/* 
  O=============================================O
  |    Tela 1 - Login e Registro de Usuários    |
  O=============================================O
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de campus:
router.get("/campus/list", campusReadCtrllrs.getAllCampus);

// -------------- //

/*
- Recuperar (para exibir) informações dos campi do banco de dados;
    Route: /campus/list
    Body: {}
*/

// +---------------------------------------------------------+

// Rota de registro de código de verificação de email:
router.post(
  "/user/sendmailcode",
  userMiddlewares.user_email,
  userRegisterCtrllrs.sendMailCode
);

// -------------- //

/* 
 - Registrar um código de verificação de email no banco de dados e enviar o código para o email do usuário;
    Route: /user/sendmailcode
    Body: 
    { 
      "user_email": <mail> 
    } 
*/

// +---------------------------------------------------------+

// Rota de validação de código de verificação de email:
router.post(
  "/user/validatemailcode",
  userMiddlewares.validationCode,
  userMiddlewares.user_email,
  userRegisterCtrllrs.validateMailCode
);

// +---------------------------------------------------------+

// Rota de registro de usuário:
router.post(
  "/user/register",
  userMiddlewares.user_name,
  userMiddlewares.user_email,
  userMiddlewares.user_password,
  userMiddlewares.user_type,
  userMiddlewares.user_campusId,
  userMiddlewares.validationCode,
  userRegisterCtrllrs.userRegister
);

// -------------- //

/* 
- Registrar um usuário no banco de dados;
    Route: /user/register
    Body: 
    {
      "user_name": <name>,
      "user_email": <mail>, 
      "user_password": <password>,
      "user_profpic": <profile_picture>, 
      "user_type": <type>, 
      "user_campusId": <campus_id>,
      "validationCode": <code> 
    } 
*/

// +---------------------------------------------------------+

// Rota de login de usuário:
router.post(
  "/user/login",
  userMiddlewares.user_email,
  userMiddlewares.user_password,
  accountCtrllrs.userLogin
);

// -------------- //

/* 
- Logar um usuário no sistema;
    Route: /user/login
    Body: 
    {
      "user_email": <mail>,
      "user_password": <password>
    }
*/

// +---------------------------------------------------------+

// O========================================================================================O

/* 
  O=====================================O
  |    Tela 2 - Tela base do sistema    |
  O=====================================O
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de recuperação de dados do usuário a partir do token:
router.get(
  "/user/data",
  userMiddlewares.checkToken,
  accountCtrllrs.getUserData
);

// -------------- //

/* 
- Recuperar dados do usuário a partir do token;
    Route: /user/data
    Body: {}
*/

// +---------------------------------------------------------+

// Rota de edição de nome de usuário:
router.put(
  "/user/edit/name",
  userMiddlewares.checkToken,
  userMiddlewares.user_name,
  userEditCtrllrs.editUserName
);

// -------------- //

/*
- Editar nome do usuário;
    Route: /user/edit/name
    Body:
    {
      "user_name": <name>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de email de usuário:
router.put(
  "/user/edit/email",
  userMiddlewares.checkToken,
  userMiddlewares.user_email,
  userMiddlewares.validationCode,
  userEditCtrllrs.editUserEmail
);

// -------------- //

/* 
- Editar email do usuário;
    Route: /user/edit/email
    Body:
    {
      "user_email": <mail>,
      "validationCode": <code>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de senha de usuário:
router.put(
  "/user/edit/password",
  userMiddlewares.checkToken,
  userMiddlewares.user_password,
  userEditCtrllrs.editUserPassword
);

// -------------- //

/* 
- Editar senha do usuário;
    Route: /user/edit/password
    Body:
    {
      "user_password": <password>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de foto de perfil de usuário:
router.put(
  "/user/edit/picture",
  userMiddlewares.checkToken,
  userMiddlewares.user_profpic,
  userEditCtrllrs.editUserPic
);

// -------------- //

/*
- Editar foto de perfil do usuário;
    Route: /user/edit/picture
    Body:
    {
      "user_profpic": <profile_picture>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de tipo de usuário:
router.put(
  "/user/edit/type",
  userMiddlewares.checkToken,
  userMiddlewares.user_type,
  userEditCtrllrs.editUserType
);

// -------------- //

/* 
- Editar tipo de usuário (professor, aluno ou outro);
    Route: /user/edit/type
    Body:
    {
      "user_type": <type>
    }
*/

// +---------------------------------------------------------+

// Rota de logout de usuário:
router.post(
  "/user/logout",
  userMiddlewares.checkToken,
  accountCtrllrs.userLogout
);

// -------------- //

/*
- Deslogar o usuário do sistema;
    Route: /user/logout
    Body: {}
*/

// +---------------------------------------------------------+

// O========================================================================================O

/*
  O======================================O
  |    Tela 3 - Lista de laboratórios    |
  O======================================O
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de laboratórios em que o usuário possui acesso:
router.get("/lab/list/all", userMiddlewares.checkToken, labReadCtrllrs.getLabs);

// -------------- //

/* 
- Listar laboratórios em que o usuário possui acesso;
    Route: /lab/list/all
    Body: {}
*/

// +---------------------------------------------------------+

// Rota de listagem de laboratório por ID:
router.post(
  "/lab/list/",
  userMiddlewares.checkToken,
  labMiddlewares.lab_id,
  labReadCtrllrs.getLabById
);

// -------------- //
/*
- Listar laboratório pelo ID;
    Route: /lab/list
    Body:
    {
      "lab_id": <id>
    }
*/

// Rota de listagem de laboratórios em que o usuário possui tal nível de acesso:
router.post(
  "/lab/list/level",
  userMiddlewares.checkToken,
  labMiddlewares.lab_adminLevel,
  labReadCtrllrs.getLabByUserLevel
);

// -------------- //

/* 
- Listar laboratórios em que o usuário possui tal nível de acesso;
    Route: /lab/list/level
    Body:
    {
      "lab_adminLevel": <level>
    }
*/

// +---------------------------------------------------------+

// Rota de registro de laboratório:
router.post(
  "/lab/register",
  userMiddlewares.checkToken,
  labMiddlewares.lab_name,
  labMiddlewares.lab_capacity,
  labCreateCtrllrs.createLab
);

// -------------- //

/* 
- Registrar um laboratório no banco de dados;
    Route: /lab/register
    Body:
    {
      "lab_name": <name>,
      "lab_capacity": <capacity>
    } 
*/

// +---------------------------------------------------------+

// Rota de edição de sala de laboratório:
router.put(
  "/lab/edit/name",
  userMiddlewares.checkToken,
  labMiddlewares.lab_name,
  labMiddlewares.lab_id,
  labEditCtrllrs.editLabName
);

// -------------- //

/* 
- Editar sala (nome) do laboratório;
    Route: /lab/edit/name
    Body:
    {
      "lab_name": <name>,
      "lab_id": <id>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de capacidade de laboratório:
router.put(
  "/lab/edit/capacity",
  userMiddlewares.checkToken,
  labMiddlewares.lab_capacity,
  labMiddlewares.lab_id,
  labEditCtrllrs.editLabCapacity
);

// -------------- //

/* 
- Editar capacidade do laboratório;
    Route: /lab/edit/capacity
    Body:
    {
      "lab_capacity": <capacity>,
      "lab_id": <id>
    }
*/

// +---------------------------------------------------------+

/* 
  o----------------------------o
  |   Sessões de laboratório   |
  o----------------------------o
*/

// +---------------------------------------------------------+

// Rota de marcação de sessão de uso de laboratório:
router.post(
  "/lab/session/register",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_labId,
  sessionMiddlewares.session_start_at,
  sessionMiddlewares.session_end_at,
  sessionCtrllrs.createSession
);

// -------------- //

/* 
- Marcar uma sessão de uso de laboratório no banco de dados;
    Route: /lab/session/register
    Body:
    {
      "session_labId": <lab_id>,
      "session_start_at": <start_time>,
      "session_end_at": <end_time>,

    }
*/

// +---------------------------------------------------------+

// Rota de listagem de sessões de uso de laboratório:
router.post(
  "/lab/session/list",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_labId,
  sessionCtrllrs.getSessionsByLabId
);

// -------------- //

/* 
- Listar sessões de uso de laboratório;
    Route: /lab/session/list
    Body:
    {
      "session_labId": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de relacionamento de equipamento a sessão de uso de laboratório:
router.post(
  "/lab/session/equipment/add",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionMiddlewares.session_equipment,
  sessionCtrllrs.addEquipmentToSession
);

// -------------- //

/* 
- Relacionar um equipamento a uma sessão de uso de laboratório;
    Route: /lab/session/equipment/add
    Body:
    {
      "session_id": <id>,
      "session_equipment": 
      {
        "id": <id>,
        "quantity": <quantity>
      }
    }
*/

// +---------------------------------------------------------+

// Rota de listagem de equipamentos de sessão de uso de laboratório:
router.post(
  "/lab/session/equipment/list",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionCtrllrs.getEquipmentsbySession
);

// +---------------------------------------------------------+

// Rota para desrelacionar equipamento de sessão de uso de laboratório:
/* router.delete(
  "/lab/session/equipment/remove",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionMiddlewares.session_equipment,
  sessionCtrllrs.removeEquipmentFromSession
); */

// -------------- //

router.delete(
  "/lab/session/equipment/remove",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionMiddlewares.session_equipment,
  sessionCtrllrs.removeEquipmentFromSession
);

/*
- Desrelacionar um equipamento de uma sessão de uso de laboratório;
    Route: /lab/session/equipment/remove
    Body:
    {
      "session_id": <id>,
      "session_equipment": 
      {
        "id": <id>
      }
    }
*/

// +---------------------------------------------------------+

// Rota de relacionamento de elemento a sessão de uso de laboratório:

router.post(
  "/lab/session/element/add",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionMiddlewares.session_element,
  sessionCtrllrs.addElementToSession
);

// -------------- //

/* 
- Relacionar um elemento a uma sessão de uso de laboratório;
    Route: /lab/session/element/add
    Body:
    {
      "session_id": <id>,
      "session_element": 
      {
        "id": <id>,
        "quantity": <quantity>
      }
    }
*/

// +---------------------------------------------------------+

// Rota de listagem de elementos de sessão de uso de laboratório:
router.post(
  "/lab/session/element/list",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionCtrllrs.getElementsbySession
);

// -------------- //

/*
- Listar elementos de sessão de uso de laboratório;
    Route: /lab/session/element/list
    Body:
    {
      "session_id": <id>
    }
*/

// +---------------------------------------------------------+

// Rota para desrelacionar elemento de sessão de uso de laboratório:
router.delete(
  "/lab/session/element/remove",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionMiddlewares.session_element,
  sessionCtrllrs.removeElementFromSession
);

// +---------------------------------------------------------+

// Rota de início de sessão de uso de laboratório:

router.put(
  "/lab/session/start",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionCtrllrs.startSession
);

// -------------- //

/* 
- Iniciar uma sessão de uso de laboratório no banco de dados;
    Route: /lab/session/start
    Body:
    {
      "session_id": <id>
    }
*/

// +---------------------------------------------------------+

// Rota de finalização de sessão de uso de laboratório:

router.put(
  "/lab/session/end",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionCtrllrs.endSession
);

// -------------- //

/* 
- Finalizar uma sessão de uso de laboratório no banco de dados;
    Route: /lab/session/end
    Body:
    {
      "session_id": <id>
    }
*/

// +---------------------------------------------------------+

// Rota para cancelar sessão de uso de laboratório:
router.delete(
  "/lab/session/cancel",
  userMiddlewares.checkToken,
  sessionMiddlewares.session_id,
  sessionCtrllrs.cancelSession
);

// -------------- //

/*
- Cancelar uma sessão de uso de laboratório no banco de dados;
    Route: /lab/session/cancel
    Body:
    {
      "session_id": <id>
    }
*/

// +---------------------------------------------------------+
/* 
  o-------------------------------o
  |   Relatórios de laboratório   |
  o-------------------------------o
*/
// +---------------------------------------------------------+

// Rota de geração de relatório de acesso ao laboratório:

// -------------- //

/* 
- Gerar relatório de acesso ao laboratório;
    Route: /lab/report/access
    Body: 
    {
      "lab_id": <id>,
      "date_start": <start_date>,
      "date_end": <end_date>  
    }
*/

// +---------------------------------------------------------+

// Rota de geração de relatório de inventário do laboratório:

// -------------- //

/* 
- Gerar relatório de inventário do laboratório;
    Route: /lab/report/inventory
    Body:
    {
      "lab_id": <id>,
      "date_start": <start_date>,
      "date_end": <end_date>  
    }
*/

// +---------------------------------------------------------+

// O========================================================================================O

/*
  O=========================================================O
  |    Tela 4 - Inventário do laboratório - Equipamentos    |
  O=========================================================O
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de equipamentos do laboratório:
router.post(
  "/equipment/list",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_labId,
  equipmentReadCtrllrs.getEquipmentsByLabId
);

// -------------- //

/*
- Listar equipamentos do laboratório;
    Route: /equipment/list
    Body:
    {
      "equipment_labId": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de registro de equipamento:
router.post(
  "/equipment/register",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_name,
  equipmentMiddlewares.equipment_description,
  equipmentMiddlewares.equipment_totalQuantity,
  equipmentMiddlewares.equipment_quality,
  equipmentMiddlewares.equipment_image,
  equipmentMiddlewares.equipment_supervisorLevel,
  equipmentMiddlewares.equipment_labId,
  equipmentWriteCtrllrs.createEquipment
);

// -------------- //

/*
- Registrar um equipamento no banco de dados;
    Route: /equipment/register
    Body:
    {
      "equipment_name": <name>,
      "equipment_description": <description>,
      "equipment_totalQuantity": <total_quantity>,
      "equipment_quality": <quality>,
      "equipment_image": <image>,
      "equipment_supervisorLevel": <supervisor_level>,
      "equipment_labId": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de nome de equipamento:
router.put(
  "/equipment/edit/name",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_id,
  equipmentMiddlewares.equipment_name,
  equipmentEditCtrllrs.editName
);

// -------------- //

/*
- Editar nome do equipamento;
    Route: /equipment/edit/name
    Body:
    {
      "equipment_id": <id>,
      "equipment_name": <name>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de descrição de equipamento:
router.put(
  "/equipment/edit/description",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_id,
  equipmentMiddlewares.equipment_description,
  equipmentEditCtrllrs.editDescription
);

// -------------- //

/*
- Editar descrição do equipamento;
    Route: /equipment/edit/description
    Body:
    {
      "equipment_id": <id>,
      "equipment_description": <description>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de quantidade total de equipamento:
router.put(
  "/equipment/edit/quantity",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_id,
  equipmentMiddlewares.equipment_totalQuantity,
  equipmentEditCtrllrs.editTotalQuantity
);

// -------------- //

/*
- Editar quantidade total do equipamento;
    Route: /equipment/edit/quantity
    Body:
    {
      "equipment_id": <id>,
      "equipment_totalQuantity": <total_quantity>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de qualidade de equipamento:
router.put(
  "/equipment/edit/quality",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_id,
  equipmentMiddlewares.equipment_quality,
  equipmentEditCtrllrs.editQuality
);

// -------------- //

/*
- Editar qualidade do equipamento;
    Route: /equipment/edit/quality
    Body:
    {
      "equipment_id": <id>,
      "equipment_quality": <quality>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de imagem de equipamento:
router.put(
  "/equipment/edit/image",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_id,
  equipmentMiddlewares.equipment_image,
  equipmentEditCtrllrs.editImage
);

// -------------- //

/*
- Editar imagem do equipamento;
    Route: /equipment/edit/image
    Body:
    {
      "equipment_id": <id>,
      "equipment_image": <image>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de nível de supervisão de equipamento:
router.put(
  "/equipment/edit/supervisor",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_id,
  equipmentMiddlewares.equipment_supervisorLevel,
  equipmentEditCtrllrs.editSupervisorLevel
);

// -------------- //

/*
- Editar o nível de supervisão do equipamento;
    Route: /equipment/edit/supervisor
    Body:
    {
      "equipment_id": <id>,
      "equipment_supervisorLevel": <supervisor_level>
    }
*/

// +---------------------------------------------------------+

// Rota de remoção de equipamento:
router.delete(
  "/equipment/remove",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_id,
  equipmentWriteCtrllrs.removeEquipment
);

// -------------- //

/*
- Deletar um equipamento do banco de dados;
    Route: /equipment/remove
    Body:
    {
      "equipment_id": <id>
    }
*/

// O========================================================================================O

/*
  O======================================================O
  |    Tela 4 - Inventário do laboratório - Elementos    |
  O======================================================O
*/

// O========================================================================================O

// Rota de listagem de elementos do laboratório:
router.post(
  "/element/list",
  userMiddlewares.checkToken,
  elementMiddlewares.element_labId,
  elementReadCtrllrs.getElementsByLabId
);

// -------------- //

/*
- Listar elementos do laboratório;
    Route: /element/list
    Body:
    {
      "element_labId": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de registro de elemento:
router.post(
  "/element/register",
  userMiddlewares.checkToken,
  elementMiddlewares.element_name,
  elementMiddlewares.element_quantity,
  elementMiddlewares.element_description,
  elementMiddlewares.element_molarMass,
  elementMiddlewares.element_casNumber,
  elementMiddlewares.element_ecNumber,
  elementMiddlewares.element_physicalState,
  elementMiddlewares.element_image,
  elementMiddlewares.element_validity,
  elementMiddlewares.element_supervisorLevel,
  elementMiddlewares.element_labId,
  elementWriteCtrllrs.createElement
);

// -------------- //

/*
- Registrar um elemento no banco de dados;
    Route: /element/register
    Body:
    {
      "element_name": <name>,
      "element_quantity": <quantity>,
      "element_description": <description>,
      "element_molarMass": <molar_mass>,
      "element_casNumber": <cas_number>,
      "element_ecNumber": <ec_number>,
      "element_physicalState": <physical_state>,
      "element_image": <image>,
      "element_validity": <validity>,
      "element_supervisorLevel": <supervisor_level>,
      "element_labId": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de nome de elemento:
router.put(
  "/element/edit/name",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_name,
  elementEditCtrllrs.editName
);

// -------------- //

/*
- Editar nome do elemento;
    Route: /element/edit/name
    Body:
    {
      "element_id": <id>,
      "element_name": <name>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de quantidade de elemento:
router.put(
  "/element/edit/quantity",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_quantity,
  elementEditCtrllrs.editQuantity
);

// -------------- //

/*
- Editar quantidade do elemento;
    Route: /element/edit/quantity
    Body:
    {
      "element_id": <id>,
      "element_quantity": <quantity>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de descrição de elemento:
router.put(
  "/element/edit/description",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_description,
  elementEditCtrllrs.editDescription
);

// -------------- //

/*
- Editar descrição do elemento;
    Route: /element/edit/description
    Body:
    {
      "element_id": <id>,
      "element_description": <description>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de peso molecular de elemento:
router.put(
  "/element/edit/molarMass",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_molarMass,
  elementEditCtrllrs.editMolarMass
);

// -------------- //

/*
- Editar peso molecular do elemento;
    Route: /element/edit/molarMass
    Body:
    {
      "element_id": <id>,
      "element_molarMass": <molar_mass>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de número CAS de elemento:
router.put(
  "/element/edit/cas",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_casNumber,
  elementEditCtrllrs.editCasNumber
);

// -------------- //

/*
- Editar número CAS do elemento;
    Route: /element/edit/cas
    Body:
    {
      "element_id": <id>,
      "element_casNumber": <cas_number>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de número EC de elemento:
router.put(
  "/element/edit/ec",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_ecNumber,
  elementEditCtrllrs.editEcNumber
);

// -------------- //

/*
- Editar número EC do elemento;
    Route: /element/edit/ec
    Body:
    {
      "element_id": <id>,
      "element_ecNumber": <ec_number>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de estado físico de elemento:
router.put(
  "/element/edit/physicalState",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_physicalState,
  elementEditCtrllrs.editPhysicalState
);

// -------------- //

/*
- Editar estado físico do elemento;
    Route: /element/edit/physicalState
    Body:
    {
      "element_id": <id>,
      "element_physicalState": <physical_state>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de imagem de elemento:
router.put(
  "/element/edit/image",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_image,
  elementEditCtrllrs.editImage
);

// -------------- //

/*
- Editar imagem do elemento;
    Route: /element/edit/image
    Body:
    {
      "element_id": <id>,
      "element_image": <image>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de validade de elemento:
router.put(
  "/element/edit/validity",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_validity,
  elementEditCtrllrs.editExpiration
);

// -------------- //

/*
- Editar validade do elemento;
    Route: /element/edit/validity
    Body:
    {
      "element_id": <id>,
      "element_validity": <validity>
    }
*/

// +---------------------------------------------------------+

// Rota de edição de nível de supervisão de elemento:
router.put(
  "/element/edit/supervisor",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementMiddlewares.element_supervisorLevel,
  elementEditCtrllrs.editSupervisorLevel
);

// -------------- //

/*
- Editar o nível de supervisão do elemento;
    Route: /element/edit/supervisor
    Body:
    {
      "element_id": <id>,
      "element_supervisorLevel": <supervisor_level>
    }
*/

// +---------------------------------------------------------+

// Rota de remoção de elemento:
router.delete(
  "/element/remove",
  userMiddlewares.checkToken,
  elementMiddlewares.element_id,
  elementWriteCtrllrs.removeElement
);

// -------------- //

/*
- Deletar um elemento do banco de dados;
    Route: /element/remove
    Body:
    {
      "element_id": <id>
    }
*/

// +---------------------------------------------------------+

// O========================================================================================O

/*
  O================================================================O
  |    Tela 5 - Controle de administração de usuários de um lab    |
  O================================================================O
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de usuários de um laboratório:
router.post(
  "/lab/users",
  userMiddlewares.checkToken,
  labMiddlewares.lab_id,
  accountCtrllrs.getUsersFromLab
);

// -------------- //

/*
- Listar usuários de um laboratório;
    Route: /lab/users
    Body:
    {
      "lab_id": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de relacionamento de usuário a um laboratório:
router.post(
  "/lab/adduser",
  userMiddlewares.checkToken,
  userMiddlewares.user_id,
  labMiddlewares.lab_id,
  labCreateCtrllrs.createLabUser
);

// -------------- //

/*
- Relacionar um usuário a um laboratório;
    Route: /lab/adduser
    Body:
    {
      "user_id": <user_id>,
      "lab_id": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de desrelacionamento de usuário de um laboratório:
router.delete(
  "/lab/removeuser",
  userMiddlewares.checkToken,
  userMiddlewares.user_id,
  labMiddlewares.lab_id,
  labCreateCtrllrs.removeLabUser
);

// -------------- //

/*
- Desrelacionar um usuário de um laboratório;
    Route: /lab/removeuser
    Body:
    {
      "user_id": <user_id>,
      "lab_id": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de adição de usuário como admin de um laboratório:
router.put(
  "/lab/addadmin",
  userMiddlewares.checkToken,
  userMiddlewares.user_id,
  labMiddlewares.lab_id,
  labEditCtrllrs.addAdmin
);

// -------------- //

/*
- Adicionar um usuário como admin de um laboratório;
    Route: /lab/addadmin
    Body:
    {
      "user_id": <user_id>,
      "lab_id": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota de remoção de usuário como admin de um laboratório:
router.put(
  "/lab/removeadmin",
  userMiddlewares.checkToken,
  userMiddlewares.user_id,
  labMiddlewares.lab_id,
  labEditCtrllrs.removeAdmin
);

// -------------- //

/*
- Remover um usuário como admin de um laboratório;
    Route: /lab/removeadmin
    Body:
    {
      "user_id": <user_id>,
      "lab_id": <lab_id>
    }
*/

// +---------------------------------------------------------+

// Rota para listar todos os usuários do campus do usuário logado:
router.post(
  "/campus/users",
  userMiddlewares.checkToken,
  accountCtrllrs.getUsersFromCampus
);

// O========================================================================================O
