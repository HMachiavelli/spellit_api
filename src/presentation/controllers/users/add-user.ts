import { Request, Response } from "express";
import {
  AddUserInput,
  AddUserOutput,
} from "@/usecases/users/add-user/add-user.dto";
import AddUser from "@/usecases/users/add-user/add-user.usecase";
import { AppContainer } from "@/infra/container";

export class AddUserController {
  private readonly addUser: AddUser;

  constructor(container: AppContainer) {
    this.addUser = container.addUser;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: AddUserInput = request.body;

      const output: AddUserOutput = await this.addUser.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
