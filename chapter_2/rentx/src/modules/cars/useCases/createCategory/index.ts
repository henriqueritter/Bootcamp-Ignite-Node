import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// instancia o repositorio
const categoriesRepository = CategoriesRepository.getInstance();

// instancia o useCase(service) passando o repositorio(injecao de dependencia)
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

// instancia o controller injetando o service(useCase) instanciado
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

// exporta o controller
export { createCategoryController };
