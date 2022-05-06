import {
  RemoveExerciseInput,
  RemoveExerciseOutput,
} from "./remove-exercise.dto";
import { AppContainer } from "infra/container";
import Exercise from "@/entities/exercise";
import { Repository } from "@/protocols/repository";

export default class GetExercise {
  private exerciseRepository: Repository;

  constructor(container: AppContainer) {
    this.exerciseRepository = container.exerciseRepository;
  }

  public async execute(input: RemoveExerciseInput) {
    const exercise: Exercise = await this.exerciseRepository.delete(input.id);

    const response: RemoveExerciseOutput = {
      id: exercise.id,
      type: exercise.type,
      question: exercise.question,
      answer: exercise.answer,
      active: exercise.active,
      created_at: exercise.created_at,
      removed_at: new Date(),
      game: exercise.game,
      level: exercise.level,
      answer_type: exercise.answer_type,
    };

    if (exercise.game_exercise_results) {
      response.game_exercise_results = exercise.game_exercise_results;
    }

    if (exercise.question_media) {
      response.question_media = exercise.question_media;
    }

    return response;
  }
}
