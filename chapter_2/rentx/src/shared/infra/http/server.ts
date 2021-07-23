import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"; // para tratar os erros
import swaggerUi from "swagger-ui-express";

import "@shared/container"; // para injecao de depencia com o tsyringe
// appError class criada para tratar os erros com message e statusCode
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection(); // cria a conexao com o banco de dados
const app = express();

app.use(express.json());

// app.use("rota da documentacao"),  passa o swagger.serve e o setup com o arquivo json de configuracao
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// middleware de erro, erro sempre vem primeiro
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is Up!"));
