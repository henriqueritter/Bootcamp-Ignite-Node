import { Category } from "@modules/cars/infra/typeorm/entities/Category";

// DTO do metodo de criacao
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

// Interface criada para atender ao Liskov Substitution Principle
interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
