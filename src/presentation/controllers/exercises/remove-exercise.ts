import { Request, Response } from "express";
import { AppContainer } from "@/infra/container";
import {
  RemoveExerciseInput,
  RemoveExerciseOutput,
} from "@/usecases/exercises/remove-exercise/remove-exercise.dto";
import RemoveExercise from "domain/usecases/exercises/remove-exercise/remove-exercise.usecase";

export class RemoveExerciseController {
  private readonly removeExercise: RemoveExercise;

  constructor(container: AppContainer) {
    this.removeExercise = container.removeExercise;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: RemoveExerciseInput = {
        id: +request.params.id,
      };

      const output: RemoveExerciseOutput = await this.removeExercise.execute(
        input
      );

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
