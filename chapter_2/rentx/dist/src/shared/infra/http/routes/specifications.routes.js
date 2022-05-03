"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationsRoutes = void 0;
var express_1 = require("express");
var CreateSpecificationController_1 = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");
// middlewares de autenticacao
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var specificationsRoutes = express_1.Router();
exports.specificationsRoutes = specificationsRoutes;
var createSpecificationController = new CreateSpecificationController_1.CreateSpecificationController();
specificationsRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createSpecificationController.handle);
