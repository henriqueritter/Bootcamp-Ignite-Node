import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) { }
  async execute(): Promise<void> { }
}

export { ListCarsUseCase };
