import { Request, Response } from "express";
import {
  GetGameResultInput,
  GetGameResultOutput,
} from "@/usecases/game-results/get-game-result/get-game-result.dto";
import GetGameResult from "@/usecases/game-results/get-game-result/get-game-result.usecase";
import { AppContainer } from "@/infra/container";

export class GetGameResultController {
  private readonly getGameResult: GetGameResult;

  constructor(container: AppContainer) {
    this.getGameResult = container.getGameResult;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: GetGameResultInput = {
        id: +request.params.id,
      };

      const output: GetGameResultOutput = await this.getGameResult.execute(
        input
      );

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
