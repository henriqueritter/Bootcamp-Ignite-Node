import cors from "cors";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"; // para tratar os erros
import swaggerUi from "swagger-ui-express";
import "dotenv/config"; // para carregar as variaveis de ambiente

import upload from "@config/upload";
// sentry
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import "@shared/container"; // para injecao de depencia com o tsyringe
// appError class criada para tratar os erros com message e statusCode

import { AppError } from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter"; // middleware
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection(); // cria a conexao com o banco de dados
const app = express();

app.use(rateLimiter); // middleware rate limiter
// sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

// app.use("rota da documentacao"),  passa o swagger.serve e o setup com o arquivo json de configuracao
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// express static le a pasta
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use(Sentry.Handlers.errorHandler());
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

export { app };
