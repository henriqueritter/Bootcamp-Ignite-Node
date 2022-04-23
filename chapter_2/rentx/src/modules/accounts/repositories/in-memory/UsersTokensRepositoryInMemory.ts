import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userTokens = this.usersTokens.find(
      (user) => user.user_id === user_id && user.refresh_token === refresh_token
    );

    return userTokens;
  }
  async deleteById(id: string): Promise<void> {
    /* const userTokenIndex = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );
    this.usersTokens.splice(userTokenIndex, -1);
    */

    const userToken = this.usersTokens.find((user) => user.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userRefreshToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userRefreshToken;
  }
}

export { UsersTokensRepositoryInMemory };
