import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it("should be able to send a forgot password mail to user", async () => {
    // observa se a funcao sendMail do mock do mailProvider foi executada
    const sendMailEvent = jest.spyOn(mailProvider, "sendMail");

    // cria um usuario no repositorio
    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "test@rentx.com",
      name: "Foo",
      password: "12345",
    });
    // executa o useCase passando o email do usuario criado
    await sendForgotPasswordMailUseCase.execute("test@rentx.com");
    // verifica se a função do mock foi chamada
    expect(sendMailEvent).toHaveBeenCalled();
  });

  it("should not be able to send an email if user doest not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("fakeuser@rentx.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "user@rentx.com",
      name: "user",
      password: "12345",
    });

    await sendForgotPasswordMailUseCase.execute("user@rentx.com");

    expect(generateTokenMail).toBeCalled();
  });
});
