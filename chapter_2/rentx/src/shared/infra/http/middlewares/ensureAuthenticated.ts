import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
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
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" "); // divide o token em uma array entre [0]Bearer e [1]Token

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_token // verificamos a secret do token
    ) as IPayload; // força o retorno do verify para o tipo da interface criada

    // repositorio de usuarios
    const usersRepository = new UsersRepository();
    // procuramos pelo usuario no repositorio
    const user = await usersRepository.findById(user_id);

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
