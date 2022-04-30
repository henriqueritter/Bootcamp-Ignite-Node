import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const userProfile = await profileUserUseCase.execute({ user_id: id });

    return response.json(userProfile);
  }
}

export { ProfileUserController };
