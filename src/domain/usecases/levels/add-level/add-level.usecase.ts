import { AddLevelInput, AddLevelOutput } from "./add-level.dto";
import { AppContainer } from "infra/container";
import { Repository } from "@/protocols/repository";
import { Prisma } from "@prisma/client";

export default class AddLevel {
  private levelRepository: Repository;

  constructor(container: AppContainer) {
    this.levelRepository = container.levelRepository;
  }

  public async execute(input: AddLevelInput) {
    let level: Prisma.LevelCreateInput = {
      title: input.title,
      created_at: new Date(),
    };

    const addedLevel = await this.levelRepository.create(level);

    const response: AddLevelOutput = {
      id: addedLevel.id,
      title: addedLevel.title,
      created_at: addedLevel.created_at,
    };

    return response;
  }
}
