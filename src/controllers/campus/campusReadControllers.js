// O========================================================================================O

/*
    O==========================================================O
    |   Funções de controle para ler informações dos campus    |
    O==========================================================O

    Lista de funções:  
    - [x] getAllCampus;
*/

// O========================================================================================O

// Importando módulos:

// Módulo dos Models Read de campus:
import CampusRead from "../../models/campus/campusReadModels";

// O========================================================================================O

// Função para ler todos os campus:
const getAllCampus = async (req, res) => {
  /*-----------------------------------------------------*/
  // Recuperando todos os campus:
  const campus = await CampusRead.getAllCampus();

  // Verificando se os campus foram recuperados:
  if (campus.status === false) {
    return res.status(500).json({
      status: false,
      message: "Erro ao recuperar os campus.",
    });
  }

  /*-----------------------------------------------------*/

  return res.status(200).json({
    status: true,
    campusData: campus.campusData,
  });
};

// O========================================================================================O

// Exportando funções:
export default {
  getAllCampus,
};

// O========================================================================================O
