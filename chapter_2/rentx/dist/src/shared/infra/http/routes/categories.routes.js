"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var CreateCategoryController_1 = require("@modules/cars/useCases/createCategory/CreateCategoryController");
var ImportCategoryController_1 = require("@modules/cars/useCases/importCategory/ImportCategoryController");
// import com multer
var ListCategoriesController_1 = require("@modules/cars/useCases/listCategories/ListCategoriesController");
// middlewares
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var categoriesRoutes = express_1.Router();
exports.categoriesRoutes = categoriesRoutes;
var upload = multer_1.default({
    dest: "./tmp",
});
var createCategoryController = new CreateCategoryController_1.CreateCategoryController();
var importCategoryController = new ImportCategoryController_1.ImportCategoryController();
var listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
// a rota é /categories porem ela esta vindo do path na chamada dentro do server.ts
// createCategoryController.handle é passado como se fosse um middleware pois ele recebe o request,response
categoriesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.single("file"), importCategoryController.handle);
