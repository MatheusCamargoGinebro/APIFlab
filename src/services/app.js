// Inicializa a aplicação express e exporta a mesma para
// ser utilizada em outros arquivos.
const express = require("express");
const router = require("./router");

// Habilitando CORS
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(router);
app.use(cors());

module.exports = app;
