import { Request, Response } from "express";
import {
  AddGameResultInput,
  AddGameResultOutput,
} from "@/usecases/game-results/add-game-result/add-game-result.dto";
import AddGameResult from "@/usecases/game-results/add-game-result/add-game-result.usecase";
import { AppContainer } from "@/infra/container";

export class AddGameResultController {
  private readonly addGameResult: AddGameResult;

  constructor(container: AppContainer) {
    this.addGameResult = container.addGameResult;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: AddGameResultInput = request.body;

      const output: AddGameResultOutput = await this.addGameResult.execute(
        input
      );

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
