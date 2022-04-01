import { UpdateLevelInput, UpdateLevelOutput } from "./update-level.dto";
import { AppContainer } from "infra/container";
import Level from "@/entities/level";
import { LevelRepository } from "@/repositories/index";

export default class UpdateLevel {
  private levelRepository: LevelRepository;

  constructor(container: AppContainer) {
    this.levelRepository = container.levelRepository;
  }

  public async execute(input: UpdateLevelInput) {
    let level: Level = {
      id: input.id,
      title: input.title,
      updated_at: new Date(),
    };

    level = await this.levelRepository.update(level);

    const response: UpdateLevelOutput = {
      id: level.id,
      title: level.title,
      created_at: level.created_at,
      updated_at: level.updated_at
    };

    return response;
  }
}
