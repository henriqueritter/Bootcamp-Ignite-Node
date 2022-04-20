import dayjs from "dayjs";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  let carExample: Car;

  beforeEach(async () => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsDateProvider
    );

    carExample = await carsRepositoryInMemory.create({
      name: "Impreza",
      brand: "Subaru",
      category_id: "1234",
      daily_rate: 150,
      description: "Vermelho",
      fine_amount: 20,
      license_plate: "HRQ1234",
    });
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: carExample.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open rent to the same user", async () => {
    // alguel duplicado para test
    await createRentalUseCase.execute({
      user_id: "1234",
      car_id: carExample.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234",
        car_id: carExample.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable."));
  });

  it("should not be able to create a new rental if there is another open rent to the same car", async () => {
    // alguel duplicado para test
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: carExample.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: carExample.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable."));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    // alguel duplicado para test
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: carExample.id,
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time."));
  });
});
