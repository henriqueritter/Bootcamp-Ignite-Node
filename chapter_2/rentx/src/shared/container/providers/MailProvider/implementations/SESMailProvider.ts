// import nodemailer e transporter
import aws from "aws-sdk";
import fs from "fs"; // para usar o template do handlebars
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { ISendEmailDTO } from "../dtos/ISendEmailDTO";
import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  // client do tipo Transporter
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendEmailDTO): Promise<void> {
    // recupera o template
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    // leitura/compilacao do handlebars do nosso arquivo
    const templateParse = handlebars.compile(templateFileContent);

    // gerando o HTML com as variaveis
    const templateHTML = templateParse(variables);

    // envia a mensagem com as infos repassadas
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@henriqueritter.com>",
      subject,
      html: templateHTML,
    });

    // para visualizar a msg no console
    console.log("message send: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { SESMailProvider };
