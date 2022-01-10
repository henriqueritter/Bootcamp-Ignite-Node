import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) { }

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentHour = 24;
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable.");
    }

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There is already a rental in progress for user.");
    }

    // converte nossa data para padrao UTC
    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    // converte data atual
    const dateNow = dayjs().utc().local().format();

    // retorna diferenca de horas
    const compare = dayjs(expected_return_date).diff(dateNow, "hours");

    // se o tempo de alguel for menor que 24h estoura um erro
    if (compare < minimumRentHour) {
      throw new AppError("Invalid return time.");
    }

    // O Aluguel deve ter duração mínima de 24 horas.
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
