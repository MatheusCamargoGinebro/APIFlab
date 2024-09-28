const express = require("express");
const router = express.Router();
module.exports = router;

const userControllers = require("../controllers/user_controllers");
const userMiddlewares = require("../middlewares/user_middlewares");

router.get("/", (__req, res) => {
    res.send("string");
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

// Rotas de usuário:
router.post(
    "/user/register",
    userMiddlewares.user_name,
    userMiddlewares.user_email,
    userMiddlewares.user_password,
    userMiddlewares.user_tipo,
    userMiddlewares.user_id_campus,
    userControllers.userRegister
);

router.post("/user/login", (req, res) => {
    res.send("Login Route!");
});

router.put("/user/edit", (req, res) => {
    res.send("Edit Route!");
});

router.delete("/user/delete", (req, res) => {
    res.send("Delete Route!");
});

router.get("/user/reservations", (req, res) => {
    res.send("List reservations Route!");
});
