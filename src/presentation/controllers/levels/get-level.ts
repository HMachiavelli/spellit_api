import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  GetLevelInput,
  GetLevelOutput,
} from "@/usecases/levels/get-level/get-level.dto";
import GetLevel from "domain/usecases/levels/get-level/get-level.usecase";

export class GetLevelController {
  private readonly getLevel: GetLevel;

  constructor(container: AppContainer) {
    this.getLevel = container.getLevel;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: GetLevelInput = {
        id: +request.params.id,
      };

      const output: GetLevelOutput = await this.getLevel.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
