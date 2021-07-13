class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  // nao foi passado a tipagem do statusCode do construtctor para definir um default para ele
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
