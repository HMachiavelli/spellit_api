import { AddGameResultInput, AddGameResultOutput } from "./add-game-result.dto";
import { AppContainer } from "infra/container";
import { Repository } from "@/protocols/repository";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/errors/NotFoundError";
import Exercise from "@/entities/exercise";

export default class AddGameResult {
  private gameResultRepository: Repository;
  private gameRepository: Repository;
  private levelRepository: Repository;
  private exerciseRepository: Repository;

  constructor(container: AppContainer) {
    this.gameResultRepository = container.gameResultRepository;
    this.gameRepository = container.gameRepository;
    this.levelRepository = container.levelRepository;
    this.exerciseRepository = container.exerciseRepository;
  }

  public async execute(input: AddGameResultInput) {
    if (!this.levelRepository.findById(input.level_id)) {
      throw new NotFoundError(`Level ${input.level_id} not found`);
    }

    if (!this.gameRepository.findById(input.game_id)) {
      throw new NotFoundError(`Game ${input.game_id} not found`);
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

    response.first_exercise_uri = `/exercises/${2}`;

    return response;
  }

  private randomPick = (values: string[]) => {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
  };
}
