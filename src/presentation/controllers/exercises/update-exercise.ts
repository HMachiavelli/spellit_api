import { Request, Response } from "express";
import {
  UpdateExerciseInput,
  UpdateExerciseOutput,
} from "@/usecases/exercises/update-exercise/update-exercise.dto";
import UpdateExercise from "@/usecases/exercises/update-exercise/update-exercise.usecase";
import { AppContainer } from "@/infra/container";

export class UpdateExerciseController {
  private readonly updateExercise: UpdateExercise;

  constructor(container: AppContainer) {
    this.updateExercise = container.updateExercise;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: UpdateExerciseInput = request.body;

      const output: UpdateExerciseOutput = await this.updateExercise.execute(
        input
      );

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
