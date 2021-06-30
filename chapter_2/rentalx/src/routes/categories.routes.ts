import { Router, Request, Response } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// a rota é /categories porem ela esta vindo do path na chamada dentro do server.ts
categoriesRoutes.post("/", (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
