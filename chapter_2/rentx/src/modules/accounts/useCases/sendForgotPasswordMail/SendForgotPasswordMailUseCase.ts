import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute(email: string) {
    // recupera o usuario pelo email e verifica se ele existe
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User does not exists!");
    }
    // cria um token aleatorio como uuid
    const token = uuidv4();

    // cria uma data atual+3horas com o dateProvider
    const hoursToExpire = 3;
    const expires_date = this.dateProvider.addHours(hoursToExpire);

    // insere o token com expiresDate criado acima no repositorio de refreshToken
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });
  }
}

export { SendForgotPasswordMailUseCase };
