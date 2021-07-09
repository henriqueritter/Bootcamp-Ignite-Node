import { Router, Request, Response } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";

// import com multer
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

// a rota é /categories porem ela esta vindo do path na chamada dentro do server.ts
categoriesRoutes.post("/", (request: Request, response: Response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  (request: Request, response: Response) => {
    return importCategoryController.handle(request, response);
  }
);

export { categoriesRoutes };
