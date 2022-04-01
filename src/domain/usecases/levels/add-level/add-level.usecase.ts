import { AddLevelInput, AddLevelOutput } from "./add-level.dto";
import { AppContainer } from "infra/container";
import Level from "@/entities/level";
import { LevelRepository } from "@/repositories/index";

export default class AddLevel {
  private levelRepository: LevelRepository;

  constructor(container: AppContainer) {
    this.levelRepository = container.levelRepository;
  }

  public async execute(input: AddLevelInput) {
    let level: Level = {
      title: input.title,
      created_at: new Date(),
    };

    level = await this.levelRepository.create(level);

    const response: AddLevelOutput = {
      id: level.id,
      title: level.title,
      created_at: level.created_at,
    };

    return response;
  }
}
