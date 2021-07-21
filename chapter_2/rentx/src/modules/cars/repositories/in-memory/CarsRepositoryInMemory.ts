import { ICreateCarDTO } from "@modules/cars/dtos/ICreatecarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    category_id,
    brand,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      category_id,
      brand,
      fine_amount,
      license_plate,
    });

    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };
