interface IMailProvider {
  // TODO alterar para um DTO
  sendMail(to: string, subject: string, body: string): Promise<void>;
}

export { IMailProvider };
