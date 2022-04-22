import { Request, Response } from "express";

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.send();
  }
}

export { SendForgotPasswordMailController };
