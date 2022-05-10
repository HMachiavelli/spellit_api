import {
  AnswerExerciseInput,
  AnswerExerciseOutput,
} from "./answer-exercise.dto";
import { AppContainer } from "infra/container";
import { Repository } from "@/protocols/repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/errors/NotFoundError";

export default class AddExercise {
  private exerciseRepository: Repository;
  private gameResultRepository: Repository;
  private gameExerciseResultRepository: Repository;

  constructor(container: AppContainer) {
    this.exerciseRepository = container.exerciseRepository;
    this.gameResultRepository = container.gameResultRepository;
    this.gameExerciseResultRepository = container.gameExerciseResultRepository;
  }

  public async execute(input: AnswerExerciseInput) {
    if (!this.exerciseRepository.findById(input.exercise_id)) {
      throw new NotFoundError(`Level ${input.exercise_id} not found`);
    }

    if (!this.gameResultRepository.findById(input.game_result_id)) {
      throw new NotFoundError(`Game ${input.game_result_id} not found`);
    }

    let exercise: Prisma.GameExerciseResultCreateInput = {
      received_answer: input.received_answer,
      score: 50,
      created_at: new Date(),
      game_result: { connect: { id: input.game_result_id } },
      exercise: { connect: { id: input.exercise_id } },
    };

    const response: AnswerExerciseOutput =
      await this.gameExerciseResultRepository.create(exercise);

    return response;
  }
}
