import { Request, Response } from "express";
import {
  UpdateUserInput,
  UpdateUserOutput,
} from "@/usecases/users/update-user/update-user.dto";
import UpdateUser from "@/usecases/users/update-user/update-user.usecase";
import { AppContainer } from "@/infra/container";

export class UpdateUserController {
  private readonly updateUser: UpdateUser;

  constructor(container: AppContainer) {
    this.updateUser = container.updateUser;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: UpdateUserInput = request.body;

      const output: UpdateUserOutput = await this.updateUser.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
