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
    // template handlebars
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    // gerando o HTML com o handlebars
    const templateHTML = templateParse(variables);

    // envia a mensagem usando o email
    await this.client.sendMail({
      to,
      from: "Rentx <noreplay@henriqueritter.com>",
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
