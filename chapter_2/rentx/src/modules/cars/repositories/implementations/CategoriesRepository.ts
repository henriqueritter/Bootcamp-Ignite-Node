import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
// Interface da classe para atender ao Liskov Substitution
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

// Implementa a Interface do tipo da classe
class CategoriesRepository implements ICategoriesRepository {
  // private vai dizer que o acesso a esse repository(contendo os metodos do Repository) e seus metodos serão restritos a classe
  private repository: Repository<Category>;

  // proibe de instanciar essa classe de fora
  constructor() {
    // vai criar o repository com os atributos do Repository só que mais restrito
    this.repository = getRepository(Category);
  }

  // Recebe description e name com base no DTO criado, e retorna nada(void)
  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  // metodo list, tem como retorno um array do tipo Category
  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }
  // func que valida se existe categoria com o nome a ser criado
  // Funcao que recebe um name e retorna um objeto do tipo Category
  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name }); // select * from categories Where name = 'name' limit 1
    return category;
  }
}

export { CategoriesRepository };
