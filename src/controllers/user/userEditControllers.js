// O========================================================================================O

/*
    O=========================================================O
    |   Funções de controle relacionadas a edição de usuário  |
    O=========================================================O

    Funções relacionadas a edição de usuário:
    - [X] EditUserName;
    - [X] EditUserEmail;
    - [X] EditUserPassword;
    - [X] EditUserPic;
    - [] EditUserType;
    - [] EditUserCampusLevel; 
*/

// O========================================================================================O

// Importando módulos:

// Módulo de Token JWT:
import JWT from "jsonwebtoken";

// Módulo dos Models Write de usuário:
import UserWrite from "../../models/user/userOperations/userWriteModels";

// Módulo dos Models Read de usuário:
import UserRead from "../../models/user/userOperations/userReadModels";

// Módulo de tratamento de senhas:
import passwordTreat from "../../utils/password_treatment";

// O========================================================================================O

// Função para editar o nome de um usuário:
const editUserName = async (req, res) => {
  /*-----------------------------------------------------*/

  // Recuperando o token do usuário:
  const token = req.headers["x-access-token"];
  const userID = JWT.decode(token).userID;

  const { newName } = req.body;

  /*-----------------------------------------------------*/

  // Verificando se o nome de usuário já está cadastrado:
  const nameCheck = await userRead;

  if (nameCheck.status === true) {
    return res.status(400).json({
      status: false,
      message: "Nome de usuário já cadastrado",
    });
  }

  // Editando o nome do usuário:
  const result = await userModels.editUserName(userID, nome);

  if (result.status === true) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

// O========================================================================================O

// Exportando módulos:

// O========================================================================================O
