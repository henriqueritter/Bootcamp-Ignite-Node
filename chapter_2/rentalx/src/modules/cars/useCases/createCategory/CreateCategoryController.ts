import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  // importa/instancia useCase de Category
  constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

  // retorna um Response
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    // chama o metodo execute do useCase(service) instanciado no construtor
    this.createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
