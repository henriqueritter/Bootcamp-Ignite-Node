import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// criamos essa funcao para ter controller melhor para nao instanciar os repositorios sem a conexao com o bd
export default (): CreateCategoryController => {
  // instancia o repositorio
  const categoriesRepository = new CategoriesRepository();

  // instancia o useCase(service) passando o repositorio(injecao de dependencia)
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  // instancia o controller injetando o service(useCase) instanciado
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  // retorna o controller instanciado
  return createCategoryController;
};
