import { inject, injectable } from "tsyringe";

// importado Interface do tipo de repositorio
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  // constructor criado para aplicar o DIP do SOLID
  constructor(
    @inject("CategoriesRepository") // nome do container criado no src/shared/container
    private categoriesRepository: ICategoriesRepository
  ) { }
  // mesma coisa que :
  // private categoriesRepository: CategoriesRepository;
  // constructor(categoriesRepository: CategoriesRepository){
  //   this.categoriesRepository=categoriesRepository;
  // }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists.");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
