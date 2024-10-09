// Inicializa a aplicação express e exporta a mesma para
// ser utilizada em outros arquivos.
const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());
app.use(router);

module.exports = app;
