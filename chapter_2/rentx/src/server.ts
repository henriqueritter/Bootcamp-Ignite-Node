import express from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container"; // para injecao de depencia com o tsyringe

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

// app.use("rota da documentacao"),  passa o swagger.serve e o setup com o arquivo json de configuracao
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is Up!"));
