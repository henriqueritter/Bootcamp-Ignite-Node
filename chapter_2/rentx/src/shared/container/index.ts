import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

// o Singleton recebera o ICategoryRepository
container.registerSingleton<ICategoriesRepository>( // toda implementacao ICategory com injecao para o nome abaixo, entao instancia a classe CategoriesRepository
  "CategoriesRepository", // nome dado a este container
  CategoriesRepository // classe chamada quando chamar este container
);
