import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
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
  }: ICreateCarDTO): Promise<Car> {
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
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    // filtra se os carros estao disponiveis
    // .filter(
    //   (car) =>
    //     (brand && car.brand === brand) || // verifica se brand preenchido, se estiver preenchido entao procura por ele
    //     (category_id && car.category_id === category_id) ||
    //     (name && car.name === name) // mesma coisa, verifica se o name foi passado, se sim entao procura por ele
    // );

    return all;
  }
}

export { CarsRepositoryInMemory };
