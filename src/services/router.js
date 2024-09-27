const express = require("express");

const router = express.Router();

const AccountControllers = require("../controllers/AccountControllers");

module.exports = router;

router.get("/", (__req, res) => {
  res.send("Hello, World!");
});

// Rotas:
/*
 - Usuário:
    - Registrar usuário
    - Logar como usuário
    - Editar proprias informações de usuário
    - Deletar próprio usuário
    - Listar reservas do usuário
    
  -- Instituto:
    - Registrar instituto
    - Editar informações do instituto
    - Deletar instituto

  -- Laboratório:
    - Registrar laboratório
    - Editar informações do laboratório
    - Deletar laboratório
    - Listar
      - Listar laboratórios por instituto
      - Listar laboratórios em que o usuário é responsável
      - Listar laboratórios em que o usuário possui acesso
      - Listar reservas do laboratório
      - Listar elementos do laboratório
      - Listar equipamentos do laboratório
    - Reservar horário no laboratório
      - Verificar disponibilidade
      - Reservar elemento para ser utilizado no horário
      - Reservar equipamento para ser utilizado no horário
      - Cancelar reserva

  -- Equipamento:
    - Registrar equipamento em laboratório
    - Editar informações do equipamento
    - Deletar equipamento
    - Listar reservas do equipamento

  -- Elemento:
    - Registrar elemento em laboratório
    - Editar informações do elemento
    - Deletar elemento
    - Listar reservas do elemento
*/
