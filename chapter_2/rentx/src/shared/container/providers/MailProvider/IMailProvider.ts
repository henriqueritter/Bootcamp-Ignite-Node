import { ISendEmailDTO } from "./dtos/ISendEmailDTO";

interface IMailProvider {
  // TODO alterar para um DTO
  sendMail({ to, subject, body }: ISendEmailDTO): Promise<void>;
}

export { IMailProvider };
