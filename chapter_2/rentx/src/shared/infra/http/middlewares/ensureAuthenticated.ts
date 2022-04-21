import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  // repositorio de tokens para validar o token
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" "); // divide o token em uma array entre [0]Bearer e [1]Token

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token // verificamos a secret do toke nde refresh
    ) as IPayload; // força o retorno do verify para o tipo da interface criada

    // const usersRepository = new UsersRepository(); //estamos usando o usersTokensRepository no lugar

    // procuramos pelo usuario com o token em questao no repositorio
    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid Token!", 401);
  }
}
