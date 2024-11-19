/*
    O=======================================================O
    |   Funções de controle relacionadas aos laboratórios   |
    O=======================================================O
*/

// Importando o modelo de laboratórios:
const labModels = require("../../models/lab/lab_models");
const userModels = require("../../models/user/user_models");
const instituteModels = require("../../models/institute/institute_models");
const jwt = require("jsonwebtoken");

// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a inserção de laboratórios    |
    O=================================================================O

    Funções relacionadas a inserção de laboratórios:
    - [X] CreateLab;
    - [X] CreateLabUser;
*/

// O========================================================================================O

// Função para criar um laboratório:
const CreateLab = async (req, res) => {
    const { sala, capacity } = req.body;

    // Verificando se o usuário tem permissão para criar um laboratório:
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const getUserByID = await userModels.getUserByID(userID);

    if (getUserByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    if (getUserByID.userData.CampusAdminLevel === 1 || getUserByID.userData.tipo === 1) {
        return res.status(400).json({
            status: false,
            message: "Usuário não tem permissão para criar o laboratório!"
        });
    }

    // Verificando se o campus existe:
    const GetCampusByID = await instituteModels.getCampusByID(getUserByID.userData.ID_campus);

    if (GetCampusByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Campus não encontrado!"
        });
    }

    // Verificando se o laboratório já existe:
    const GetLabByName = await labModels.GetLabByName(sala, getUserByID.userData.ID_campus);

    if (GetLabByName.status === true) {
        return res.status(400).json({
            status: false,
            message: "Laboratório já existe!"
        });
    }

    // Criando o laboratório:
    const CreateLab = await labModels.CreateLab(sala, capacity, getUserByID.userData.ID_campus);

    if (CreateLab.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao criar laboratório!"
        });
    }

    // Relacionando o laboratório com o usuário criador:
    const CreateLabUser = await labModels.AddUser(CreateLab.labID, userID, 3);

    if (CreateLabUser.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao relacionar usuário com laboratório!"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Laboratório criado com sucesso!"
    });
};

const CreateLabUser = async (req, res) => {
    const { lab_id, user_id } = req.body;

    // Verificando se o usuário existe:
    const token = req.headers["x-access-token"];
    const userID = jwt.decode(token).userID;

    const GetUserByID = await userModels.getUserByID(userID);

    if (GetUserByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o laboratório existe:
    const GetLabByID = await labModels.GetLabById(lab_id);

    if (GetLabByID.status === false) {
        return res.status(400).json({
            status: false,
            message: "Laboratório não encontrado!"
        });
    }

    // Verificando permissão do usuário:
    const GetLabUser = await labModels.GetLabUser(lab_id, userID);

    if (GetLabUser.status === false || GetLabUser.data.AdminLevel !== 3 || GetUserByID.userData.ID_campus !== GetLabByID.data.ID_campus) {
        return res.status(400).json({
            status: false,
            message: "Usuário não tem permissão para adicionar um usuário!"
        });
    }

    // Verificando se o usuário existe:
    const GetNewUserData = await userModels.getUserByID(user_id);

    if (GetNewUserData.status === false) {
        return res.status(400).json({
            status: false,
            message: "Usuário não encontrado!"
        });
    }

    // Verificando se o usuário já pertence ao laboratório:
    const GetNewUserRelation = await labModels.GetLabUser(lab_id, user_id);

    if (GetNewUserRelation.status === true) {
        return res.status(400).json({
            status: false,
            message: "Usuário já pertence ao laboratório!"
        });
    }

    // Verificando se o campus do usuário é o mesmo do laboratório:
    if (GetNewUserData.userData.ID_campus !== GetLabByID.data.ID_campus) {
        return res.status(400).json({
            status: false,
            message: "Usuário não pertence ao mesmo campus do laboratório!"
        });
    }

    // Adicionando o usuário ao laboratório:
    const AddUser = await labModels.AddUser(lab_id, user_id, 1);

    if (AddUser.status === false) {
        return res.status(400).json({
            status: false,
            message: "Erro ao adicionar usuário!"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Usuário adicionado com sucesso!"
    });
};

// O========================================================================================O

/*
    O=================================================================O
    |   Funções de control relacionadas a edição de laboratórios      |
    O=================================================================O
 
    Funções relacionadas a edição de laboratórios:	
    - [X] EditLabName;
    - [X] EditLabCapacity;
*/

// O========================================================================================O

// Função para editar o nome do laboratório:
const EditLabName = async (req, res) => {
  const { lab_id, sala } = req.body;

  // Verificando se o usuário existe:
  const token = req.headers["x-access-token"];
  const userID = jwt.decode(token).userID;

  const GetUserByID = await userModels.getUserByID(userID);

  if (GetUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o laboratório existe:
  const GetLabByID = await labModels.GetLabById(lab_id);

  if (GetLabByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Laboratório não encontrado!",
    });
  }

  // Verificando permissão do usuário:
  const GetLabUser = await labModels.GetLabUser(lab_id, userID);

  if (
    GetLabUser.status === false ||
    GetLabUser.data.AdminLevel === 1 ||
    GetUserByID.userData.ID_campus !== GetLabByID.data.ID_campus
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para editar o laboratório!",
    });
  }

  // Verificando se o novo nome já existe:
  const GetLabByName = await labModels.GetLabByName(
    sala,
    GetLabByID.data.ID_campus
  );

  if (GetLabByName.status === true) {
    return res.status(400).json({
      status: false,
      message: "Nome de laboratório já existe!",
    });
  }

  // Editando o nome do laboratório:
  const EditLabName = await labModels.EditLabName(lab_id, sala);

  if (EditLabName.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao editar nome do laboratório!",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Nome do laboratório editado com sucesso!",
  });
};

// +------------------------------------------------------------------------------------------+

// Função para editar a capacidade do laboratório:
const EditLabCapacity = async (req, res) => {
  const { lab_id, capacity } = req.body;

  // Verificando se o usuário existe:
  const token = req.headers["x-access-token"];
  const userID = jwt.decode(token).userID;

  const GetUserByID = await userModels.getUserByID(userID);

  if (GetUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o laboratório existe:
  const GetLabByID = await labModels.GetLabById(lab_id);

  if (GetLabByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Laboratório não encontrado!",
    });
  }

  // Verificando permissão do usuário:
  const GetLabUser = await labModels.GetLabUser(lab_id, userID);

  if (
    GetLabUser.status === false ||
    GetLabUser.data.AdminLevel === 1 ||
    GetUserByID.userData.ID_campus !== GetLabByID.data.ID_campus
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para editar o laboratório!",
    });
  }

  // Editando a capacidade do laboratório:
  const EditLabCapacity = await labModels.EditLabCapacity(lab_id, capacity);

  if (EditLabCapacity.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao editar capacidade do laboratório!",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Capacidade do laboratório editada com sucesso!",
  });
};

// O========================================================================================O

/*
    O==================================================================O
    |   Funções de control relacionadas a adição e remoção de admins   |
    O==================================================================O
 
    Funções relacionadas a adição e remoção de administradores:
    - [X] addAdmin;
    - [X] removeAdmin;
*/

// O========================================================================================O

// Função para adicionar um administrador ao laboratório:
const addAdmin = async (req, res) => {
  const { lab_id, user_id } = req.body;

  // Verificando se o usuário existe:
  const token = req.headers["x-access-token"];
  const userID = jwt.decode(token).userID;

  const GetUserByID = await userModels.getUserByID(userID);

  if (GetUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o laboratório existe:
  const GetLabByID = await labModels.GetLabById(lab_id);

  if (GetLabByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Laboratório não encontrado!",
    });
  }

  // Verificando permissão do usuário:
  const GetLabUser = await labModels.GetLabUser(lab_id, userID);

  if (
    GetLabUser.status === false ||
    GetLabUser.data.AdminLevel !== 3 ||
    GetUserByID.userData.campus_id !== GetLabByID.data.campus_id
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para adicionar um administrador!",
    });
  }

  // Verificando se o usuário existe:
  const GetNewAdminData = await userModels.getUserByID(user_id);

  if (GetNewAdminData.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o usuário pertence ao laboratório:
  const GetNewAdminRelation = await labModels.GetLabUser(lab_id, user_id);

  if (GetNewAdminRelation.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não pertence ao laboratório!",
    });
  }

  if (GetNewAdminRelation.data.AdminLevel !== 1) {
    return res.status(400).json({
      status: false,
      message: "Usuário já é administrador!",
    });
  }

  // Adicionando o usuário como administrador:
  const AddAdmin = await labModels.AddAdmin(lab_id, user_id, 2);

  if (AddAdmin.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao adicionar administrador!",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Administrador adicionado com sucesso!",
  });
};

// +------------------------------------------------------------------------------------------+

// Função para remover um administrador do laboratório:
const removeAdmin = async (req, res) => {
  const { lab_id, user_id } = req.body;

  // Verificando se o usuário existe:
  const token = req.headers["x-access-token"];
  const userID = jwt.decode(token).userID;

  const GetUserByID = await userModels.getUserByID(userID);

  if (GetUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o laboratório existe:
  const GetLabByID = await labModels.GetLabById(lab_id);

  if (GetLabByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Laboratório não encontrado!",
    });
  }

  // Verificando permissão do usuário:
  const GetLabUser = await labModels.GetLabUser(lab_id, userID);

  if (
    GetLabUser.status === false ||
    GetLabUser.data.AdminLevel !== 3 ||
    GetUserByID.userData.campus_id !== GetLabByID.data.campus_id
  ) {
    return res.status(400).json({
      status: false,
      message: "Usuário não tem permissão para remover o administrador!",
    });
  }

  // Verificando se o usuário existe:
  const GetNewAdminData = await userModels.getUserByID(user_id);

  if (GetNewAdminData.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Verificando se o usuário pertence ao laboratório:
  const GetNewAdminRelation = await labModels.GetLabUser(lab_id, user_id);

  if (GetNewAdminRelation.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não pertence ao laboratório!",
    });
  }

  if (GetNewAdminRelation.data.AdminLevel !== 2) {
    return res.status(400).json({
      status: false,
      message: "Usuário não é administrador!",
    });
  }

  // Removendo o usuário como administrador:
  const RemoveAdmin = await labModels.RemoveAdmin(lab_id, user_id);

  if (RemoveAdmin.status === false) {
    return res.status(400).json({
      status: false,
      message: "Erro ao remover administrador!",
    });
  }

  return res.status(200).json({
    status: true,
    message: "Administrador removido com sucesso!",
  });
};

// O========================================================================================O

/*
    O================================================================O
    |   Funções de controle relacionadas a leitura de laboratórios   |
    O================================================================O
 
    Funções relacionadas a leitura de laboratórios:
    - [X] GetLabs; // Laboratórios em que o usuário está relacionado
    - [X] GetLabByUserLevel; // Laboratórios em que o usuário possui determinado nível de acesso
*/

// O========================================================================================O

// Função para listar os laboratórios em que o usuário está relacionado:
const GetLabs = async (req, res) => {
  const token = req.headers["x-access-token"];
  const userID = jwt.decode(token).userID;

  // Verificando se o usuário existe:
  const GetUserByID = await userModels.getUserByID(userID);

  if (GetUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  // Listando os laboratórios em que o usuário está relacionado:
  const GetLabByUser = await labModels.GetLabsByUserId(userID);

  if (GetLabByUser.status === false) {
    return res.status(400).json({
      status: false,
      message: "Não há laboratórios!",
    });
  }

  // Pegando os dados de todos os laboratórios encontrados:
  let labs = [];

  for (let i = 0; i < GetLabByUser.data.length; i++) {
    const GetLabByID = await labModels.GetLabById(GetLabByUser.data[i].ID_lab);

    labs.push(GetLabByID.data);
  }

  return res.status(200).json({
    status: true,
    data: labs,
  });
};

// Função para listar os laboratórios em que o usuário possui determinado nível de acesso:
const GetLabByUserLevel = async (req, res) => {
  const token = req.headers["x-access-token"];
  const userID = jwt.decode(token).userID;

  // Verificando se o usuário existe:
  const GetUserByID = await userModels.getUserByID(userID);

  if (GetUserByID.status === false) {
    return res.status(400).json({
      status: false,
      message: "Usuário não encontrado!",
    });
  }

  const { adminLevel } = req.body;

  // Listando os laboratórios em que o usuário possui determinado nível de acesso:
  const GetLabByUserLevel = await labModels.GetLabByUserLevel(
    userID,
    adminLevel
  );

  if (GetLabByUserLevel.status === false) {
    return res.status(400).json({
      status: false,
      message: "Não há laboratórios!",
    });
  }

  // Pegando os dados de todos os laboratórios encontrados:
  let labs = [];

  for (let i = 0; i < GetLabByUserLevel.data.length; i++) {
    const GetLabByID = await labModels.GetLabById(
      GetLabByUserLevel.data[i].ID_lab
    );

    labs.push(GetLabByID.data);
  }

  return res.status(200).json({
    status: true,
    data: labs,
  });
};

// O========================================================================================O

module.exports = {
  /* Create */
  CreateLab,
  CreateLabUser,

  /* Edit */
  EditLabName,
  EditLabCapacity,

  /* Admins */
  addAdmin,
  removeAdmin,

  /* Gets */
  GetLabs,
  GetLabByUserLevel,
};

// O========================================================================================O
