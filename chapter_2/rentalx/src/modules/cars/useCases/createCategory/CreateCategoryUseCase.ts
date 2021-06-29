// importado Interface do tipo de repositorio
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [x] - Definir tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositorio
 */

class CreateCategoryUseCase {
  // constructor criado para aplicar o DIP do SOLID
  constructor(private categoriesRepository: ICategoriesRepository) { }
  // mesma coisa que :
  // private categoriesRepository: CategoriesRepository;
  // constructor(categoriesRepository: CategoriesRepository){
  //   this.categoriesRepository=categoriesRepository;
  // }

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists.");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
