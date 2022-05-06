import { RemoveLevelInput, RemoveLevelOutput } from "./remove-level.dto";
import { AppContainer } from "infra/container";
import Level from "@/entities/level";
import { Repository } from "@/protocols/repository";

export default class GetLevel {
  private levelRepository: Repository;

  constructor(container: AppContainer) {
    this.levelRepository = container.levelRepository;
  }

  public async execute(input: RemoveLevelInput) {
    const level: Level = await this.levelRepository.delete(input.id);

    const response: RemoveLevelOutput = {
      id: level.id,
      title: level.title,
      created_at: level.created_at,
      updated_at: level.updated_at,
      removed_at: new Date(),
    };

    return response;
  }
}
