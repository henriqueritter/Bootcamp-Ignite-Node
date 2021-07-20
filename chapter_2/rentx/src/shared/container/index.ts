import { container } from "tsyringe";

// users
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
// categories
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
// specifications
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

// o Singleton recebera o ICategoryRepository
container.registerSingleton<ICategoriesRepository>( // toda implementacao ICategory com injecao para o nome abaixo, entao instancia a classe CategoriesRepository
  "CategoriesRepository", // nome dado a este container
  CategoriesRepository // classe chamada quando chamar este container
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
// container registerSingleton Interface
container.registerSingleton<IUsersRepository>(
  "UsersRepository", // nome do container
  UsersRepository // classe chamada
);
