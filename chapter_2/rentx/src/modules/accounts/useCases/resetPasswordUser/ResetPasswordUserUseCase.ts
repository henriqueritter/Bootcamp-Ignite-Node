import { hash } from "bcrypt"; // para cryptografar a senha
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ password, token }: IRequest) {
    // recupera o userToken pelo token
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );
    // verifica se o user Token existe
    if (!userToken) {
      throw new AppError("Token Invalid!");
    }

    // pega a data atual
    const dateNow = this.dateProvider.dateNow();
    // compara a data do token com a data atual
    const isTokenExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      dateNow
    );
    // se a data atual for maior que a do token entao ele está expirado
    if (isTokenExpired) {
      throw new AppError("Token is Expired.");
    }
    // recupera o objeto do usuario do repositorio
    const user = await this.usersRepository.findById(userToken.user_id);
    // altera a senha dele para a informada criptografando ela com o bcrypt
    user.password = await hash(password, 8);
    // salva o usuario no repositorio
    await this.usersRepository.create(user);
    // deleta o token de alteração de senha
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
