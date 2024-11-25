// Inicializa a aplicação express e exporta a mesma para
// ser utilizada em outros arquivos.
import express, { json } from "express";
import router from "./router";

const app = express();

app.use(json());
app.use(router);

export default app;
