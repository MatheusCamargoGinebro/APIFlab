// O========================================================================================O

/*
    O================================================================O
    |   Funções de controle relacionadas a leitura de laboratórios   |
    O================================================================O
 
    Funções relacionadas a leitura de laboratórios:
    - [X] GetLabs;
    - [X] GetLabByUserLevel;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Read de laboratório:
import labRead from "../../models/lab/labReadModels";

// O========================================================================================O

// Função para listar os laboratórios em que o usuário está relacionado:
const GetLabs = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  /*-----------------------------------------------------*/

  // Listando os laboratórios em que o usuário está relacionado:
  const GetLabByUser = await labRead.GetLabsByUser(userId);

  if (GetLabByUser.status === false) {
    return res.status(400).json({
      status: false,
      message: "Não há laboratórios!",
    });
  }

  /*-----------------------------------------------------*/

  // Retornando os laboratórios encontrados:
  return res.status(200).json({
    status: true,
    labs: GetLabByUser.labs,
  });
};

// O========================================================================================O

// Função para listar os laboratórios em que o usuário possui determinado nível de acesso:
const GetLabByUserLevel = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando Id do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  const { adminLevel } = req.body;

  /*-----------------------------------------------------*/

  // Listando os laboratórios em que o usuário possui determinado nível de acesso:
  const GetLabByUserLevel = await labRead.GetLabsByUserLevel(
    userId,
    adminLevel
  );

  if (GetLabByUserLevel.status === false) {
    return res.status(400).json({
      status: false,
      message: "Não há laboratórios!",
    });
  }

  /*-----------------------------------------------------*/

  // Retornando os laboratórios encontrados:
  return res.status(200).json({
    status: true,
    labs: GetLabByUserLevel.labs,
  });
};

// O========================================================================================O

// Exportando funções:
export default { GetLabs, GetLabByUserLevel };

// O========================================================================================O
