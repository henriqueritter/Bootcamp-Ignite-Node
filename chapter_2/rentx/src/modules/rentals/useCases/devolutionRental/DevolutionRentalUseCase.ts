import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    // recupera o aluguel do banco de dados
    const rental = await this.rentalsRepository.findById(id);

    // quantidade minima de diarias
    const minimum_daily = 1;

    // caso o aluguel nao exista retorna um erro
    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    // recupera o carro usado no aluguel
    const car = await this.carsRepository.findById(rental.car_id);

    // verifica o tempo do aluguel
    const dateNow = this.dateProvider.dateNow();

    // verifica quantas diarias aconteceram
    let daily = this.dateProvider.compareInDays({
      start_date: rental.start_date,
      end_date: dateNow,
    });

    // coloca a quantidade de diarias em pelo menos 1
    if (daily <= 0) {
      daily = minimum_daily;
    }

    // verifica se houve atraso
    const rentalDelay = this.dateProvider.compareInDays({
      start_date: dateNow,
      end_date: rental.expected_return_date,
    });

    // variavel para o custo total do aluguel(deveria estar protegida?)
    let total = 0;

    // calcula multa em caso de atraso
    if (rentalDelay > 0) {
      const calculate_fine = rentalDelay * car.fine_amount;
      total = calculate_fine;
    }

    // calcula o valor total das diarias para o carro escolhido
    // TODO alterar para que isso nao ocorra no momento da entrega pois o daily_rate do carro pode estar diferente no dia diferente do contratado
    total += daily * car.daily_rate;

    // coloca a data de termino/devolucao do alguel/carro
    rental.end_date = dateNow;
    // insere o valor devido calculado pelas diarias
    rental.total = total;

    // atualiza o rental com o valor total que custou as diarias
    await this.rentalsRepository.create(rental);
    // atualiza o status do carro para disponivel
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
