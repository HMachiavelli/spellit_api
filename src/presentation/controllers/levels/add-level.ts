import { Request, Response } from "express";
import {
  AddLevelInput,
  AddLevelOutput,
} from "@/usecases/levels/add-level/add-level.dto";
import AddLevel from "@/usecases/levels/add-level/add-level.usecase";
import { AppContainer } from "@/infra/container";

export class AddLevelController {
  private readonly addLevel: AddLevel;

  constructor(container: AppContainer) {
    this.addLevel = container.addLevel;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: AddLevelInput = request.body;

      const output: AddLevelOutput = await this.addLevel.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
