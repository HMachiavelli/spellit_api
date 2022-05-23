import { GetGameResultInput, GetGameResultOutput } from "./get-game-result.dto";
import { AppContainer } from "infra/container";
import { NotFoundException } from "../../../../presentation/exceptions/not-found";
import * as RepositoryProtocols from "@/protocols/index";

export default class AddGameResult {
  private gameResultRepository: RepositoryProtocols.IGameResultRepository;

  constructor(container: AppContainer) {
    this.gameResultRepository = container.gameResultRepository;
  }

  public async execute(input: GetGameResultInput) {
    const response: GetGameResultOutput =
      await this.gameResultRepository.findById(+input.id);

    if (!response) {
      throw new NotFoundException(`Game Result ${input.id} not found`);
    }

    response.transformed_score = this.transformScore(response.total_score);

    return response;
  }

  //regra de 3 para formar as estrelas ao concluir
  private transformScore(rawScore: number) {
    const starsScore = (rawScore * 5) / 1000;

    if (starsScore >= 5) {
      return 5;
    } else if (starsScore >= 4.5) {
      return 4.5;
    } else if (starsScore >= 4) {
      return 4;
    } else if (starsScore >= 3.5) {
      return 3.5;
    } else {
      return 3;
    }
  }
}
