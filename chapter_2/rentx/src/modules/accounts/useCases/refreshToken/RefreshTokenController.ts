import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    // podemos receber o token por qualquer uma das tres formas a seguir
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    // instancia o useCAse
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    // executa o metodo do useCase passando o token
    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_token);
  }
}

export { RefreshTokenController };
