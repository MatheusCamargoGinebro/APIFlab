// O========================================================================================O

/*
    O============================================================================O
    |    Funções de controllers relacionadas a inserção de elementos químicos    |
    O============================================================================O

    Funções de controllers relacionadas a inserção de elementos químicos:
    - [X] createElement;
    - [X] removeElement;
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Write de elementos químicos:
import elementWrite from "../../models/element/elementWriteModels";

// Módulo dos Models Read de elementos químicos:
import elementRead from "../../models/element/elementReadModels";

// Módulo de verificação de permissões de laboratório:
import labPermission from "../../controllers/lab/labPermissionChecks";

// O========================================================================================O

// Função para criar um novo elemento químico:
const createElement = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do novo elemento:
  const {
    element_name,
    element_quantity,
    element_description,
    element_molarMass,
    element_casNumber,
    element_ecNumber,
    element_physicalState,
    element_image,
    element_validity,
    element_supervisorLevel,
    element_labId,
  } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para criar um elemento químico:
  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    element_labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Criando o novo elemento químico:
  const result = await elementWrite.createElement({
    nome: element_name,
    quantidade: element_quantity,
    descricao: element_description,
    peso_molecular: element_molarMass,
    numero_cas: element_casNumber,
    numero_ec: element_ecNumber,
    estado_fisico: element_physicalState,
    imagem: element_image,
    validade: element_validity,
    supervisorLevel: element_supervisorLevel,
    id_lab: element_labId,
  });

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao criar elemento químico.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Elemento químico criado com sucesso.",
  });
};

// O========================================================================================O

// Função para remover um elemento químico:
const removeElement = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando informações do usuário:
  const token = req.headers["x-access-token"];
  const userId = JWT.decode(token).userId;

  // Informações do elemento químico:
  const { element_id } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o usuário tem permissão para remover um elemento químico:
  const element = await elementRead.getElementById(element_id);

  if (element.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao remover elemento químico.",
    });
  }

  const userCheck = await labPermission.checkUserToManipulate(
    userId,
    element.element.labId,
    2
  );

  if (userCheck.status === false) {
    return res.status(401).json({
      status: false,
      message: "Usuário não autorizado.",
    });
  }

  /*-----------------------------------------------------*/

  // Removendo o elemento químico:
  const result = await elementWrite.removeElement(element_id);

  if (result.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao remover elemento químico.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    message: "Elemento químico removido com sucesso.",
  });
};

// O========================================================================================O

// Exportando funções:
export default { createElement, removeElement };

// O========================================================================================O
