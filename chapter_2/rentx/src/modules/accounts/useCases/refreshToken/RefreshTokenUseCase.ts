import { sign, verify } from "jsonwebtoken"; // verifica se o token é valido
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {
    /** */
  }
  async execute(token: string): Promise<string> {
    // recebe as informacoes do token e
    // verifica se  o token é valido conforme a secret do arquivo auth.ts
    // pega as infos sub e email do token
    const { email, sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;
    // recupera somente o userid do sub
    // const user_id = sub; //substituido pela desestruturacao acima
    // procura pelo usuario no repositorio de tokens
    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      // se nao encontrar usuario na tabela de refresh token estoura um erro
      throw new AppError("Refresh Token does not exists!");
    }

    // se o token existir na base, entao remove ele
    await this.usersTokensRepository.deleteById(userToken.id);

    // gera um novo token
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    // data de expires do token
    const expires_date = await this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );
    // salva o token no repository
    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
