import { Request, Response } from "express";
// para injecao de depen
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  // retorna um Response
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    // tsyringe vai fazer a injecao de dependencia automatica do useCase
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    // chama o metodo execute do useCase(service) injetado acima
    await createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
