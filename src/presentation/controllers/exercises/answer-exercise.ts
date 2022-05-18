import { Request, Response } from "express";
import {
  AnswerExerciseInput,
  AnswerExerciseOutput,
} from "@/usecases/exercises/answer-exercise/answer-exercise.dto";
import AnswerExercise from "@/usecases/exercises/answer-exercise/answer-exercise.usecase";
import { AppContainer } from "@/infra/container";

export class AnswerExerciseController {
  private readonly answerExercise: AnswerExercise;

  constructor(container: AppContainer) {
    this.answerExercise = container.answerExercise;
  }

  public async handle(
    request: Request,
    response: Response,
    next: any
  ): Promise<Response> {
    try {
      const input: AnswerExerciseInput = request.body;

      const output: AnswerExerciseOutput = await this.answerExercise.execute(
        input
      );

      return response.status(200).json(output);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
