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
    const exercise: Exercise = await this.exerciseRepository.findById(
      +input.exercise_id
    );
    if (!exercise) {
      throw new NotFoundException(`Exercise ${input.exercise_id} not found`);
    }

    const gameResult = await this.gameResultRepository.findById(
      +input.game_result_id
    );
    if (!gameResult) {
      throw new NotFoundException(`Game ${input.game_result_id} not found`);
    }

    const score = this.calculateScore(input.received_answer, exercise.answer);
    let exerciseResult: Prisma.GameExerciseResultCreateInput = {
      score,
      received_answer: input.received_answer,
      created_at: new Date(),
      game_result: { connect: { id: +input.game_result_id } },
      exercise: { connect: { id: +input.exercise_id } },
    };

    const response: AnswerExerciseOutput =
      await this.gameExerciseResultRepository.create(exerciseResult);

    let finished = true;
    if (gameResult.current_exercise + 1 <= 10) {
      finished = false;
      const nextExercise: Exercise = await this.exerciseRepository.getRandom({
        where: {
          game_id: +exercise.game.id,
          level_id: +exercise.level.id,
          NOT: { id: input.exercise_id },
        },
      });

      response.next_exercise = nextExercise.id;
    }

    const newScore = Math.ceil(+gameResult.total_score + score);

    await this.gameResultRepository.update({
      id: gameResult.id,
      total_score: newScore,
      current_exercise: gameResult.current_exercise + 1,
      finished_at: finished ? new Date() : null,
    });

    response.finished = finished;

    return response;
  }

  //TODO: match das strings
  private calculateScore(received: string, expected: string): number {
    return 75;
  }
}
