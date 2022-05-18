import { AddGameResultInput, AddGameResultOutput } from "./add-game-result.dto";
import { AppContainer } from "infra/container";
import { Prisma } from "@prisma/client";
import { NotFoundException } from "../../../../presentation/exceptions/not-found";
import * as RepositoryProtocols from "@/protocols/index";
import Exercise from "@/entities/exercise";

export default class AddGameResult {
  private gameResultRepository: RepositoryProtocols.IGameResultRepository;
  private gameRepository: RepositoryProtocols.IGameRepository;
  private levelRepository: RepositoryProtocols.ILevelRepository;
  private exerciseRepository: RepositoryProtocols.IExerciseRepository;

  constructor(container: AppContainer) {
    this.gameResultRepository = container.gameResultRepository;
    this.gameRepository = container.gameRepository;
    this.levelRepository = container.levelRepository;
    this.exerciseRepository = container.exerciseRepository;
  }

  public async execute(input: AddGameResultInput) {
    if (!this.levelRepository.findById(input.level_id)) {
      throw new NotFoundException(`Level ${input.level_id} not found`);
    }

    if (!this.gameRepository.findById(input.game_id)) {
      throw new NotFoundException(`Game ${input.game_id} not found`);
    }

    let exercise: Prisma.GameResultCreateInput = {
      total_score: 0,
      current_exercise: 1,
      started_at: new Date(),
      game: { connect: { id: input.game_id } },
      level: { connect: { id: input.level_id } },
      user: { connect: { id: input.user_id } },
    };

    const response: AddGameResultOutput =
      await this.gameResultRepository.create(exercise);

    const firstExercise: Exercise = await this.exerciseRepository.getRandom({
      where: { game_id: input.game_id, level_id: input.level_id },
    });

    response.first_exercise_uri = `/exercises/${firstExercise.id}`;

    return response;
  }

  private randomPick = (values: string[]) => {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
  };
}
