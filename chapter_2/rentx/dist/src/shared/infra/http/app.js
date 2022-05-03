"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors"); // para tratar os erros
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("dotenv/config"); // para carregar as variaveis de ambiente
require("@shared/container"); // para injecao de depencia com o tsyringe
// appError class criada para tratar os erros com message e statusCode
var upload_1 = __importDefault(require("@config/upload"));
var AppError_1 = require("@shared/errors/AppError");
var typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
var swagger_json_1 = __importDefault(require("../../../swagger.json"));
var routes_1 = require("./routes");
typeorm_1.default(); // cria a conexao com o banco de dados
var app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
// app.use("rota da documentacao"),  passa o swagger.serve e o setup com o arquivo json de configuracao
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// express static le a pasta
app.use("/avatar", express_1.default.static(upload_1.default.tmpFolder + "/avatar"));
app.use("/cars", express_1.default.static(upload_1.default.tmpFolder + "/cars"));
app.use(routes_1.router);
// middleware de erro, erro sempre vem primeiro
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error - " + err.message,
    });
});
