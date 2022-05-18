import { AddExerciseInput, AddExerciseOutput } from "./add-exercise.dto";
import { AppContainer } from "infra/container";
import { Prisma } from "@prisma/client";
import * as RepositoryProtocols from "@/protocols/index";

export default class AddExercise {
  private exerciseRepository: RepositoryProtocols.IExerciseRepository;

  constructor(container: AppContainer) {
    this.exerciseRepository = container.exerciseRepository;
  }

  public async execute(input: AddExerciseInput) {
    let exercise: Prisma.ExerciseCreateInput = {
      type: input.type.trim(),
      question: input.question.trim(),
      answer: input.answer.trim(),
      active: input.active,
      created_at: new Date(),
      game: { connect: { id: input.game_id } },
      level: { connect: { id: input.level_id } },
      answer_type: { connect: { id: input.answer_type_id } },
    };

    const response: AddExerciseOutput = await this.exerciseRepository.create(
      exercise
    );

    return response;
  }
}
