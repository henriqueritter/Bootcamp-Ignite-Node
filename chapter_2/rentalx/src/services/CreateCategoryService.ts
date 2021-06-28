import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [x] - Definir tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositorio
 */

class CreateCategoryService {
  // constructor criado para aplicar o DIP do SOLID
  constructor(private categoriesRepository: CategoriesRepository) { }
  // mesma coisa que :
  // private categoriesRepository: CategoriesRepository;
  // constructor(categoriesRepository: CategoriesRepository){
  //   this.categoriesRepository=categoriesRepository;
  // }

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
