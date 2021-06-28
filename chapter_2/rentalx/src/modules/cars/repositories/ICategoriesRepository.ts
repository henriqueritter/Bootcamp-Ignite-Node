import { Category } from "../model/Category";

// DTO do metodo de criacao
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

// Interface criada para atender ao Liskov Substitution Principle
interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
