import { Request, Response } from "express";
import {
  AddExerciseInput,
  AddExerciseOutput,
} from "@/usecases/exercises/add-exercise/add-exercise.dto";
import AddExercise from "@/usecases/exercises/add-exercise/add-exercise.usecase";
import { AppContainer } from "@/infra/container";

export class AddExerciseController {
  private readonly addExercise: AddExercise;

  constructor(container: AppContainer) {
    this.addExercise = container.addExercise;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: AddExerciseInput = request.body;

      const output: AddExerciseOutput = await this.addExercise.execute(input);

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
