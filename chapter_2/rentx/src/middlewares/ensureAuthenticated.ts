import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" "); // divide o token em uma array entre [0]Bearer e [1]Token

  try {
    const { sub: user_id } = verify(
      token,
      "9eb71ab7420eb452a22787ca4fab501b"
    ) as IPayload; // força o retorno do verify para o tipo da interface criada

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exist");
    }

    next();
  } catch {
    throw new Error("Invalid Token!");
  }
}
