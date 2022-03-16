import { inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }
  }
}

export { DevolutionRentalUseCase };
