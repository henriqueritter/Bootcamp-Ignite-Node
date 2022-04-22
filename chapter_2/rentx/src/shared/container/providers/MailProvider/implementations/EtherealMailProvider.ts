import { injectable } from "tsyringe";

import { ISendEmailDTO } from "../dtos/ISendEmailDTO";
import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  sendMail({ to, subject, body }: ISendEmailDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { EtherealMailProvider };
