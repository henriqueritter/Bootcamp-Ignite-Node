import { verify } from "jsonwebtoken"; // verifica se o token é valido
import { inject } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {
    /** */
  }
  async execute(token: string) {
    // verifica se  o token de refresh é valido conforme a secret do arquivo auth.ts
    const decode = verify(token, auth.secret_refresh_token) as IPayload;
    // recupera somente o userid do sub
    const user_id = decode.sub;
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

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { RefreshTokenUseCase };
