import { User } from "../infra/typeorm/entities/User";

class UserMap {
  // serve para quando chamar o toDTO nao precisemos fazer um new UserMap e sim direto UserMap.toDTO
  static toDTO({ id, email, name, avatar, driver_license }: User) { }
}

export { UserMap };
