// O====================================================================================O
/*  
    O=========================================================O
    |    Funções de Models relacionadas a código de emails    |
    O=========================================================O

    Funções relacionadas a códigos de email:
    - [X] saveMailCode;
    - [X] getMailCode;
    - [X] deleteMailCode;
    - [X] clearMailCodeList;
*/
// O====================================================================================O

// Importando conexão com o banco de dados:
import { execute } from "../../utils/connection";

// O====================================================================================O

// Função para salvar o código de confirmação de email no banco de dados:
const saveMailCode = async (MailCode) => {
  const { email, code } = MailCode;

  // const query = "INSERT INTO email_codes (Email, Checkcode) VALUES (?, ?);";
  const query = "CALL CreateMailCode(?, ?);";
  const [result] = await execute(query, [email, code]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Código de confirmação salvo" };
  } else {
    return {
      status: false,
      message: "Erro ao salvar código de confirmação",
    };
  }
};

// O====================================================================================O

// Função para recuperar o código de confirmação de email do banco de dados:
const getMailCode = async (email) => {
  // const query = "SELECT Checkcode FROM email_codes WHERE Email = ?;";
  const query = "CALL GetMailCode(?);";
  const [result] = await execute(query, [email]);

  if (result.length > 0) {
    return { code: result[0].Checkcode, status: true };
  } else {
    return { code: null, status: false };
  }
};

// O====================================================================================O

// Função para deletar o código de confirmação já utilizado ou cancelado no banco de dados:
const deleteMailCode = async (email) => {
  // const query = "DELETE FROM email_codes WHERE Email = ?;";
  const query = "CALL DeleteMailCode(?);";
  const [result] = await execute(query, [email]);

  if (result.affectedRows > 0) {
    return { status: true, message: "Código de confirmação deletado" };
  } else {
    return {
      status: false,
      message: "Erro ao deletar código de confirmação",
    };
  }
};

// O====================================================================================O

// Função para limpar a tabela de códigos de email:
const clearMailCodeList = async () => {
  const query = "CALL ClearMailCodes();";

  await connection.execute(query);

  return { status: true, message: "Códigos de verificação de email deletados" };
};

// O====================================================================================O

// Exportando funções de códigos de email:
export default { saveMailCode, getMailCode, deleteMailCode, clearMailCodeList };

// O====================================================================================O
