import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  async execute(email: string): Promise<void> {
    // recupera o usuario pelo email e verifica se ele existe
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User does not exists!");
    }

    // recupera o template
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );
    // cria um token aleatorio como uuid
    const token = uuidv4();

    // cria uma data atual+3horas com o dateProvider
    const hoursToExpire = 3;
    const expires_date = this.dateProvider.addHours(hoursToExpire);

    // insere o token com expiresDate criado acima no repositorio de refreshToken
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail({
      to: email,
      subject: "Recuperação de senha",
      variables,
      path: templatePath,
    });
  }
}

export { SendForgotPasswordMailUseCase };
