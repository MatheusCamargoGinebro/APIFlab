// O========================================================================================O

/*
  O======================================================O
  |    Funções de controle de sessões em laboratórios    |
  O======================================================O

  Lista de funções de controle de sessões em laboratórios:
    - [X] createSession;
    - [X] GetSessionsByLabId;
    - [X] startSession;
    - [X] endSession;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
const JWT = require("jsonwebtoken");

// Módulo dos Models Write de sessões:
const sessionWrite = require("../../models/session/sessionWriteModels");

// Módulo dos Models Read de sessões:
const sessionRead = require("../../models/session/sessionReadModels");

// Módulo de verificação de permissões de laboratório:
const labPermission = require("../../controllers/lab/labPermissionChecks");

// O========================================================================================O

// Função para criar uma nova sessão em um laboratório:
const createSession = async (req, res) => {};

// O========================================================================================O

// Função para recuperar todas as sessões de um laboratório:
const GetSessionsByLabId = async (req, res) => {};

// O========================================================================================O

// Função para iniciar uma sessão em um laboratório:
const startSession = async (req, res) => {};

// O========================================================================================O

// Função para encerrar uma sessão em um laboratório:
const endSession = async (req, res) => {};

// O========================================================================================O

// Exportando funções de controle de sessões em laboratórios:
module.exports = {
  createSession,
  GetSessionsByLabId,
  startSession,
  endSession,
};

// O========================================================================================O
