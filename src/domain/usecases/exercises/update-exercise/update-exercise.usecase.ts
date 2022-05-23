import {
  UpdateExerciseInput,
  UpdateExerciseOutput,
} from "./update-exercise.dto";
import { AppContainer } from "infra/container";
import Exercise from "@/entities/exercise";
import { Repository } from "@/protocols/repository";

export default class UpdateExercise {
  private exerciseRepository: Repository;

  constructor(container: AppContainer) {
    this.exerciseRepository = container.exerciseRepository;
  }

  public async execute(input: UpdateExerciseInput) {
    let exercise: any = {
      id: input.id,
      active: input.active,
      updated_at: new Date(),
    };

    if (input.type) {
      exercise.type = input.type.trim();
    }

    if (input.question) {
      exercise.question = input.question.trim();
    }

    if (input.answer) {
      exercise.answer = input.answer.trim();
    }

    if (input.game_id) {
      exercise.game = { connect: { id: +input.game_id } };
    }

    if (input.level_id) {
      exercise.level = { connect: { id: +input.level_id } };
    }

    if (input.answer_type_id) {
      exercise.answer_type = { connect: { id: +input.answer_type_id } };
    }

    exercise = await this.exerciseRepository.update(exercise);

    return exercise;
  }
}
