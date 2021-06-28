import { Category } from "../model/Category";

// Interface da classe para atender ao Liskov Substitution
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

// Implementa a Interface do tipo da classe
class CategoriesRepository implements ICategoriesRepository {
  // somente o repositorio terá acesso a "table" categories
  private categories: Category[];

  constructor() {
    // inicializa a "table" como array vazio
    this.categories = [];
  }

  // Recebe description e name com base no DTO criado, e retorna nada(void)
  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);
  }

  // metodo list, tem como retorno um array do tipo Category
  list(): Category[] {
    return this.categories;
  }
  // func que valida se existe categoria com o nome a ser criado
  // Funcao que recebe um name e retorna um objeto do tipo Category
  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository };
