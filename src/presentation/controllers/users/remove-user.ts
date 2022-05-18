import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  RemoveUserInput,
  RemoveUserOutput,
} from "@/usecases/users/remove-user/remove-user.dto";
import RemoveUser from "@/usecases/users/remove-user/remove-user.usecase";

export class RemoveUserController {
  private readonly removeUser: RemoveUser;

  constructor(container: AppContainer) {
    this.removeUser = container.removeUser;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: RemoveUserInput = {
        id: +request.params.id,
      };

      const output: RemoveUserOutput = await this.removeUser.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
