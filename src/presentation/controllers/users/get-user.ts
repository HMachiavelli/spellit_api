import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  GetUserInput,
  GetUserOutput,
} from "@/usecases/users/get-user/get-user.dto";
import GetUser from "@/usecases/users/get-user/get-user.usecase";

export class GetUserController {
  private readonly getUser: GetUser;

  constructor(container: AppContainer) {
    this.getUser = container.getUser;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: GetUserInput = {
        id: +request.params.id,
      };

      const output: GetUserOutput = await this.getUser.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
