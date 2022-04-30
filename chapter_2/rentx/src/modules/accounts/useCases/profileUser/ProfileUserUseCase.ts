import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}
@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    //
  }
  async execute({ user_id }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);
    return UserMap.toDTO(user);
  }
}
export { ProfileUserUseCase };
