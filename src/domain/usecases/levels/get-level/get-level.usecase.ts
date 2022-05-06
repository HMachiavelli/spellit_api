import { GetLevelInput, GetLevelOutput } from "./get-level.dto";
import { AppContainer } from "infra/container";
import Level from "@/entities/level";
import { Repository } from "domain/protocols/repository";

export default class GetLevel {
  private levelRepository: Repository;

  constructor(container: AppContainer) {
    this.levelRepository = container.levelRepository;
  }

  public async execute(input: GetLevelInput) {
    const level: Level = await this.levelRepository.findById(input.id);
    if (!level) {
      throw new Error("Not found");
    }

    const response: GetLevelOutput = {
      id: level.id,
      title: level.title,
      created_at: level.created_at,
      updated_at: level.updated_at,
    };

    return response;
  }
}
