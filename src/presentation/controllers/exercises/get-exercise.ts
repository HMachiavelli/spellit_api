import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  GetExerciseInput,
  GetExerciseOutput,
} from "@/usecases/exercises/get-exercise/get-exercise.dto";
import GetExercise from "domain/usecases/exercises/get-exercise/get-exercise.usecase";

export class GetExerciseController {
  private readonly getExercise: GetExercise;

  constructor(container: AppContainer) {
    this.getExercise = container.getExercise;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: GetExerciseInput = {
        id: +request.params.id,
      };

      const output: GetExerciseOutput = await this.getExercise.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
