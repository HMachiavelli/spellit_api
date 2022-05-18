import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  GetExercisesInput,
  GetExercisesOutput,
} from "@/usecases/exercises/get-exercises/get-exercises.dto";
import GetExercises from "@/usecases/exercises/get-exercises/get-exercises.usecase";

export class GetExercisesController {
  private readonly getExercises: GetExercises;

  constructor(container: AppContainer) {
    this.getExercises = container.getExercises;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: GetExercisesInput = {
        search: (request.query.search || "").toString(),
        page: +(request.query.page || 1),
        page_size: +(request.query.page_size || 10),
        sort_by: (request.query.sort_by || "id").toString(),
        order: (request.query.order || "ASC").toString(),
      };

      const output: GetExercisesOutput = await this.getExercises.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
