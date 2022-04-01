import { Request, Response } from "express";
import {
  UpdateLevelInput,
  UpdateLevelOutput,
} from "@/usecases/levels/update-level/update-level.dto";
import UpdateLevel from "@/usecases/levels/update-level/update-level.usecase";
import { AppContainer } from "@/infra/container";

export class UpdateLevelController {
  private readonly updateLevel: UpdateLevel;

  constructor(container: AppContainer) {
    this.updateLevel = container.updateLevel;
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input: UpdateLevelInput = request.body;

      const output: UpdateLevelOutput = await this.updateLevel.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
