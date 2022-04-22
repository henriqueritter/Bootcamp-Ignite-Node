import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute(email: string) {
    const emailExists = await this.usersRepository.findByEmail(email);
    if (!emailExists) {
      throw new AppError("Email not found.");
    }
  }
}

export { SendForgotPasswordMailUseCase };
