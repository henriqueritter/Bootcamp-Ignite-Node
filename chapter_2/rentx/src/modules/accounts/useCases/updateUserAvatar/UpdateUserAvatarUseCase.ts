// [x] Adicionar coluna avatar na tabela de users
// refatorar usuario com coluna avatar(entidade etc..)
// Configuração upload multer
// criar regra de negociodo upload
// criar controller

import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) { }
  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
export { UpdateUserAvatarUseCase };
