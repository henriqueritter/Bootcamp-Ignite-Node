// import nodemailer e transporter
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { ISendEmailDTO } from "../dtos/ISendEmailDTO";
import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  // client do tipo Transporter
  private client: Transporter;

  constructor() {
    // cria conta de test e repassa para o client
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }

  async sendMail({ to, subject, body }: ISendEmailDTO): Promise<void> {
    // envia a mensagem com as infos repassadas
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      text: body,
      html: body,
    });

    // para visualizar a msg no console
    console.log("message send: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
