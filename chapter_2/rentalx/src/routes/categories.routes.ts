import { Router, Request, Response } from "express";
import { v4 as uuid } from "uuid";

const categoriesRoutes = Router();

const categories = [];

// a rota é /categories porem ela esta vindo do path na chamada dentro do server.ts
categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const category = {
    id: uuid(),
    name,
    description,
    created_at: new Date(),
  };
  categories.push(category);

  return response.status(201).json({ category });
});

export { categoriesRoutes };
