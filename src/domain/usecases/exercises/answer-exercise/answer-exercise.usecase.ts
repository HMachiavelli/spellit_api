import {
  AnswerExerciseInput,
  AnswerExerciseOutput,
} from "./answer-exercise.dto";
import { AppContainer } from "infra/container";
import { Prisma } from "@prisma/client";
import { NotFoundException } from "../../../../presentation/exceptions/not-found";
import * as RepositoryProtocols from "@/protocols/index";
import Exercise from "@/entities/exercise";

export default class AddExercise {
  private exerciseRepository: RepositoryProtocols.IExerciseRepository;
  private gameResultRepository: RepositoryProtocols.IGameResultRepository;
  private gameExerciseResultRepository: RepositoryProtocols.IGameExerciseResultRepository;

  constructor(container: AppContainer) {
    this.exerciseRepository = container.exerciseRepository;
    this.gameResultRepository = container.gameResultRepository;
    this.gameExerciseResultRepository = container.gameExerciseResultRepository;
  }

  public async execute(input: AnswerExerciseInput) {
    const exercise: Exercise = this.exerciseRepository.findById(
      input.exercise_id
    );
    if (!exercise) {
      throw new NotFoundException(`Exercise ${input.exercise_id} not found`);
    }

    if (!this.gameResultRepository.findById(input.game_result_id)) {
      throw new NotFoundException(`Game ${input.game_result_id} not found`);
    }

    let exerciseResult: Prisma.GameExerciseResultCreateInput = {
      received_answer: input.received_answer,
      score: 50,
      created_at: new Date(),
      game_result: { connect: { id: input.game_result_id } },
      exercise: { connect: { id: input.exercise_id } },
    };

    const response: AnswerExerciseOutput =
      await this.gameExerciseResultRepository.create(exerciseResult);

    const nextExercise: Exercise = await this.exerciseRepository.getRandom({
      where: { game_id: exercise.game_id, level_id: exercise.level_id },
    });

    response.next_exercise = `/exercises/${nextExercise.id}`;

    return response;
  }
}
