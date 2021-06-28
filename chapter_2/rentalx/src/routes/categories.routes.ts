import { Router, Request, Response } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();

// instanciar repository de categories
const categoriesRepository = new CategoriesRepository();

// a rota é /categories porem ela esta vindo do path na chamada dentro do server.ts
categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  // instancia o service e passa o repositorio de categories utilizando do conceito de Dependency Inversion Principle
  const createCategoryService = new CreateCategoryService(categoriesRepository);

  // chama o metodo execute do service instanciado
  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

export { categoriesRoutes };
