import { ICreateCarDTO } from "@modules/cars/dtos/ICreatecarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  create(data: ICreateCarDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CarsRepositoryInMemory };
