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
module.exports = router;

// O========================================================================================O

// Importando Middlewares:

// user:
const userMiddlewares = require("../middlewares/userMiddlewares");

// lab:
const labMiddlewares = require("../middlewares/labMiddlewares");

// institute:
const campusMiddlewares = require("../middlewares/campusMiddlewares");

// equipment:
const equipmentMiddlewares = require("../middlewares/equipmentMiddlewares");

// element:
const elementMiddlewares = require("../middlewares/elementMiddlewares");

// O========================================================================================O

// Importando Controllers:

// user:
const accountCtrllrs = require("../controllers/user/userAccountControls");
const userEditCtrllrs = require("../controllers/user/userEditControllers");
const userRegisterCtrllrs = require("../controllers/user/userRegisterControllers");

// lab:
const labCreateCtrllrs = require("../controllers/lab/labCreateControllers");
const labEditCtrllrs = require("../controllers/lab/labEditControllers");
const labReadCtrllrs = require("../controllers/lab/labReadControllers");

// institute:
const campusReadCtrllrs = require("../controllers/campus/campusReadControllers");
const campusWriteCtrllrs = require("../controllers/campus/campusWriteControllers");

// equipment:
const equipmentEditCtrllrs = require("../controllers/equipment/equipmentEditControllers");
const equipmentReadCtrllrs = require("../controllers/equipment/equipmentReadControllers");
const equipmentWriteCtrllrs = require("../controllers/equipment/equipmentWriteControllers");

// element:
const elementEditCtrllrs = require("../controllers/element/elementEditControllers");
const elementReadCtrllrs = require("../controllers/element/elementReadControllers");
const elementWriteCtrllrs = require("../controllers/element/elementWriteControllers");

// O========================================================================================O

// Configuração de sistemas de limpeza:

// A cada 60 segundos, limpar a blacklist de tokens, removendo os tokens já inválidos:
/*setInterval(accountCtrllrs.clearBlackList, 60000); */

// A cada 24h, limpar os códigos de verificação de email:
setInterval(accountCtrllrs.clearMailCodeList, 86400000);

// O========================================================================================O

/* 
  O=============================================O
  |    Tela 1 - Login e Registro de Usuários    |
  O=============================================O

  - Registro:
    - [X] Recuperar (para exibir) informações dos campi do banco de dados;
    - [X] Registrar um código de verificação de email no banco de dados e enviar o código para o email do usuário;
    - [X] Registrar um usuário no banco de dados;

  - Login:
    - [X] Logar um usuário no sistema;
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de campi:
router.get("/campus/list", campusReadCtrllrs.getAllCampus);

/*
  Body:
  - Nenhum.
*/

// +---------------------------------------------------------+

// Rota de registro de código de verificação de email:
router.post(
  "/user/sendmailcode",
  userMiddlewares.user_email,
  userRegisterCtrllrs.sendMailCode
);

/*
  Body:
  {
    "user_email": "mail@aluno.ifsp.edu.br"
  }
*/

// +---------------------------------------------------------+

// Rota de registro de usuário:
router.post(
  "/user/register",
  userMiddlewares.user_name,
  userMiddlewares.user_email,
  userMiddlewares.user_password,
  userMiddlewares.user_profpic,
  userMiddlewares.user_type,
  userMiddlewares.user_campusId,
  userMiddlewares.validationCode,
  userRegisterCtrllrs.userRegister
);

/* 
  Body:
  {
    "user_name": "João",
    "user_email": "mail@aluno.ifsp.edu.br",
    "user_password": "J0@o_Passw0rd!123",
    "user_profpic": "",
    "user_type": 1,
    "user_campusId": 1,
    "validationCode": "12345"
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

/*
  Body:
  {
    "user_email": "mail@aluno.ifsp.edu.br",
    "user_password": "J0@o_Passw0rd!123"
  }
*/

// +---------------------------------------------------------+

// O========================================================================================O

/* 
  O=====================================O
  |    Tela 2 - Tela base do sistema    |
  O=====================================O

  - Usuário:
  - [X] Recuperar dados do usuário a partir do token;

  - Configurações de usuário:
    - [X] Editar nome do usuário;
    - [X] Editar email do usuário;
    - [X] Editar senha do usuário;
    - [X] Editar foto de perfil do usuário;
    - [X] Editar tipo de usuário (professor, aluno ou outro);

  - Logout:
    - [X] Deslogar o usuário do sistema;
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de recuperação de dados do usuário a partir do token:
router.get(
  "/user/data",
  userMiddlewares.checkToken,
  accountCtrllrs.getUserData
);

/*
  Body:
  - Nenhum.
*/

// +---------------------------------------------------------+

// Rota de edição de nome de usuário:
router.put(
  "/user/edit/name",
  userMiddlewares.checkToken,
  userMiddlewares.user_name,
  userEditCtrllrs.editUserName
);

/*
  Body:
  {
    "user_name": "João"
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

/*
  Body:
  {
    "user_email": "newmail@aluno.ifsp.edu.br",
    "validationCode": "12345"
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

/*
  Body:
  {
    "user_password": "New_P@ssw0rd!123"
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

/*
  Body:
  {
    "user_profpic": "<new_profile_picture_in_text_format>"
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

/*
  Body:
  {
    "user_type": 2
  }
*/

// +---------------------------------------------------------+

// Rota de logout de usuário:
router.post(
  "/user/logout",
  userMiddlewares.checkToken,
  accountCtrllrs.userLogout
);

/*
  Body:
  - Nenhum.
*/

// +---------------------------------------------------------+

// O========================================================================================O

/*
  O======================================O
  |    Tela 3 - Lista de laboratórios    |
  O======================================O

  - Inicio:
  - [X] Listar laboratórios em que o usuário possui acesso;
  - [X] Listar laboratórios em que o usuário possui tal nível de acesso;
  - [X] Registrar um laboratório no banco de dados;

  - Laboratório:
  - [] Gerar relatório de acesso ao laboratório;
  - [] Gerar relatório de inventário do laboratório;

  - Editar informações do laboratório:
    - [X] Editar sala (nome) do laboratório;
    - [X] Editar capacidade do laboratório;

  - Sessão:
    - [] Marcar uma sessão de uso de laboratório no banco de dados;
    - [] Listar sessões de uso de laboratório;
    - [] Finalizar uma sessão de uso de laboratório no banco de dados;
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de laboratórios em que o usuário possui acesso:
router.get("/lab/list/all", userMiddlewares.checkToken, labReadCtrllrs.getLabs);

/*
  Body:
  - Nenhum.
*/

// +---------------------------------------------------------+

// Rota de listagem de laboratórios em que o usuário possui tal nível de acesso:
router.get(
  "/lab/list/level",
  userMiddlewares.checkToken,
  labMiddlewares.lab_adminLevel,
  labReadCtrllrs.getLabByUserLevel
);

/*
  Body:
  {
    "lab_adminLevel": 2
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

/*
  Body:
  {
    "lab_name": "A106",
    "lab_capacity": 20
  }
*/

// +---------------------------------------------------------+

// Rota de geração de relatório de acesso ao laboratório:

// +---------------------------------------------------------+

// Rota de geração de relatório de inventário do laboratório:

// +---------------------------------------------------------+

// Rota de edição de sala de laboratório:
router.put(
  "/lab/edit/name",
  userMiddlewares.checkToken,
  labMiddlewares.lab_name,
  labMiddlewares.lab_id,
  labEditCtrllrs.editLabName
);

/*
  Body:
  {
    "lab_name": "A107",
    "lab_id": 1
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

/*
  Body:
  {
    "lab_capacity": 25,
    "lab_id": 1
  }
*/

// +---------------------------------------------------------+

// Rota para marcar uma sessão de uso de laboratório no banco de dados:

// +---------------------------------------------------------+

// Rota para listar sessões de uso de laboratório:

// +---------------------------------------------------------+

// Rota para finalizar uma sessão de uso de laboratório no banco de dados:

// +---------------------------------------------------------+

// O========================================================================================O

/*
  O==========================================O
  |    Tela 4 - Inventário do laboratório    |
  O==========================================O

  - Inicio:
  - [] Listar equipamentos do laboratório;
  - [] Listar elementos do laboratório;

  - Equipamento:
  - [] Registrar um equipamento no banco de dados;
  - Editar informações de um equipamento:
    - [] Editar nome do equipamento;
    - [] Editar descrição do equipamento;
    - [] Editar quantidade total do equipamento;
    - [] Editar qualidade do equipamento;
    - [] Editar imagem do equipamento;
    - [] Editar o nível de supervisão do equipamento;
  - [] Deletar um equipamento do banco de dados;

  - Elemento:
  - [] Registrar um elemento no banco de dados;
  - Editar informações de um elemento:
    - [] Editar nome do elemento;
    - [] Editar quantidade do elemento;
    - [] Editar descrição do elemento;
    - [] Editar peso molecular do elemento;
    - [] Editar número CAS do elemento;
    - [] Editar número EC do elemento;
    - [] Editar estado físico do elemento;
    - [] Editar imagem do elemento;
    - [] Editar a validade do elemento;
    - [] Editar o nível de supervisão do elemento;
  - [] Deletar um elemento do banco de dados;
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de equipamentos do laboratório:
router.get(
  "/equipment/list",
  userMiddlewares.checkToken,
  equipmentMiddlewares.equipment_labId,
  equipmentReadCtrllrs.getEquipmentsByLabId
);

/*
  Body:
  {
    "equipment_labId": 1
  }
*/

// +---------------------------------------------------------+

// Rota de listagem de elementos do laboratório:
router.get(
  "/element/list",
  userMiddlewares.checkToken,
  elementMiddlewares.element_labId,
  elementReadCtrllrs.getElementsByLabId
);

/*
  Body:
  {
    "element_labId": 1
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

/*
  Body:
  {
    "equipment_name": "Béquer",
    "equipment_description": "Béquer de 250mL",
    "equipment_totalQuantity": 10,
    "equipment_quality": 5,
    "equipment_image": "",
    "equipment_supervisorLevel": 2,
    "equipment_labId": 1
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

/*
  Body:
  {
    "equipment_id": 1,
    "equipment_name": "Béquer de 500mL"
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

/*
  Body:
  {
    "equipment_id": 1,
    "equipment_description": "Béquer de 500mL com graduação"
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

/*
  Body:
  {
    "equipment_id": 1,
    "equipment_totalQuantity": 15
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

/*
  Body:
  {
    "equipment_id": 1,
    "equipment_quality": 4
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

/*
  Body:
  {
    "equipment_id": 1,
    "equipment_image": "<new_image_in_text_format>"
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

/*
  Body:
  {
    "equipment_id": 1,
    "equipment_supervisorLevel": 1
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

/*
  Body:
  {
    "equipment_id": 1
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

/*
  Body:
  {
    "element_name": "Água",
    "element_quantity": 1000,
    "element_description": "Água destilada",
    "element_molarMass": 18.01528,
    "element_casNumber": "7732-18-5",
    "element_ecNumber": "231-791-2",
    "element_physicalState": 1,
    "element_image": "",
    "element_validity": "2023-12-31",
    "element_supervisorLevel": 1,
    "element_labId": 1
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

/*
  Body:
  {
    "element_id": 1,
    "element_name": "Água Destilada"
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

/*
  Body:
  {
    "element_id": 1,
    "element_quantity": 2000
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

/*
  Body:
  {
    "element_id": 1,
    "element_description": "Água destilada para uso em laboratório"
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

/*
  Body:
  {
    "element_id": 1,
    "element_molarMass": 8.01528
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

/*
  Body:
  {
    "element_id": 1,
    "element_casNumber": "7732-18-6"
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

/*
  Body:
  {
    "element_id": 1,
    "element_ecNumber": "231-791-3"
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

/*
  Body:
  {
    "element_id": 1,
    "element_physicalState": 2
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

/*
  Body:
  {
    "element_id": 1,
    "element_image": "<new_image_in_text_format>"
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

/*
  Body:
  {
    "element_id": 1,
    "element_validity": "2023-12-31"
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

/*
  Body:
  {
    "element_id": 1,
    "element_supervisorLevel": 2
  }
*/

// +---------------------------------------------------------+

// O========================================================================================O

/*
  O================================================================O
  |    Tela 5 - Controle de administração de usuários de um lab    |
  O================================================================O

  Inicio:
  - [] Listar usuários de um laboratório;
  - [] Relacionar usuários a um laboratório;
  - [] Desrelacionar usuários de um laboratório;
  - [] Adicionar usuário como admin de um laboratório;
  - [] Remover usuário como admin de um laboratório;
*/

// O========================================================================================O

// +---------------------------------------------------------+

// Rota de listagem de usuários de um laboratório:
router.get(
  "/lab/users",
  userMiddlewares.checkToken,
  labMiddlewares.lab_id,
  accountCtrllrs.getUsersFromLab
);

/*
  Body:
  {
    "lab_id": 1
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

/*
  Body:
  {
    "user_id": 1,
    "lab_id": 1
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

// +---------------------------------------------------------+

// Rota de adição de usuário como admin de um laboratório:
router.put(
  "/lab/addadmin",
  userMiddlewares.checkToken,
  userMiddlewares.user_id,
  labMiddlewares.lab_id,
  labEditCtrllrs.addAdmin
);

/*
  Body:
  {
    "user_id": 1,
    "lab_id": 1
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

/*
  Body:
  {
    "user_id": 1,
    "lab_id": 1
  }
*/

// +---------------------------------------------------------+

// O========================================================================================O
