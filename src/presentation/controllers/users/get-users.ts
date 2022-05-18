import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  GetUsersInput,
  GetUsersOutput,
} from "@/usecases/users/get-users/get-users.dto";
import GetUsers from "@/usecases/users/get-users/get-users.usecase";

export class GetUsersController {
  private readonly getUsers: GetUsers;

  constructor(container: AppContainer) {
    this.getUsers = container.getUsers;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: GetUsersInput = {
        search: (request.query.search || "").toString(),
        page: +(request.query.page || 1),
        page_size: +(request.query.page_size || 10),
        sort_by: (request.query.sort_by || "id").toString(),
        order: (request.query.order || "ASC").toString(),
      };

      const output: GetUsersOutput = await this.getUsers.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
