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
  }: IRequest): Promise<void> {
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const carAvailable =
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
    // O Aluguel deve ter duração mínima de 24 horas.
  }
}

export { CreateRentalUseCase };
