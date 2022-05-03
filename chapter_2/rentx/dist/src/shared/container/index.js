"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var UsersRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");
var UsersTokensRepository_1 = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
var CarsImagesRepository_1 = require("@modules/cars/infra/typeorm/repositories/CarsImagesRepository");
var CarsRepository_1 = require("@modules/cars/infra/typeorm/repositories/CarsRepository");
var CategoriesRepository_1 = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");
var SpecificationsRepository_1 = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");
var RentalsRepository_1 = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");
// import dos providers
require("@shared/container/providers");
tsyringe_1.container.registerSingleton("CarsRepository", CarsRepository_1.CarsRepository);
// o Singleton recebera o ICategoryRepository
tsyringe_1.container.registerSingleton(// toda implementacao ICategory com injecao para o nome abaixo, entao instancia a classe CategoriesRepository
"CategoriesRepository", // nome dado a este container
CategoriesRepository_1.CategoriesRepository // classe chamada quando chamar este container
);
tsyringe_1.container.registerSingleton("SpecificationsRepository", SpecificationsRepository_1.SpecificationsRepository);
// container registerSingleton Interface
tsyringe_1.container.registerSingleton("UsersRepository", // nome do container
UsersRepository_1.UsersRepository // classe chamada
);
tsyringe_1.container.registerSingleton("CarsImagesRepository", CarsImagesRepository_1.CarsImagesRepository);
tsyringe_1.container.registerSingleton("RentalsRepository", RentalsRepository_1.RentalsRepository);
tsyringe_1.container.registerSingleton("UsersTokensRepository", UsersTokensRepository_1.UsersTokensRepository);
