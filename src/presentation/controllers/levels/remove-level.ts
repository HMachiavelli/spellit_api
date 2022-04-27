import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  RemoveLevelInput,
  RemoveLevelOutput,
} from "@/usecases/levels/remove-level/remove-level.dto";
import RemoveLevel from "domain/usecases/levels/remove-level/remove-level.usecase";

export class RemoveLevelController {
  private readonly removeLevel: RemoveLevel;

  constructor(container: AppContainer) {
    this.removeLevel = container.removeLevel;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: RemoveLevelInput = {
        id: +request.params.id,
      };

      const output: RemoveLevelOutput = await this.removeLevel.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
