import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  GetLevelsInput,
  GetLevelsOutput,
} from "@/usecases/levels/get-levels/get-levels.dto";
import GetLevels from "@/usecases/levels/get-levels/get-levels.usecase";

export class GetLevelsController {
  private readonly getLevels: GetLevels;

  constructor(container: AppContainer) {
    this.getLevels = container.getLevels;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: GetLevelsInput = {
        search: (request.query.search || "").toString(),
        page: +(request.query.page || 1),
        page_size: +(request.query.page_size || 10),
        sort_by: (request.query.sort_by || "id").toString(),
        order: (request.query.order || "ASC").toString(),
      };

      const output: GetLevelsOutput = await this.getLevels.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
