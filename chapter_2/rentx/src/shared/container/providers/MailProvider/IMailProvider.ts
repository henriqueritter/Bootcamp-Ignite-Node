import { ISendEmailDTO } from "./dtos/ISendEmailDTO";

interface IMailProvider {
  // TODO alterar para um DTO
  sendMail({ to, subject, variables, path }: ISendEmailDTO): Promise<void>;
}

export { IMailProvider };
