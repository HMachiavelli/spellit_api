import { AddLevelInput, AddLevelOutput } from "./add-level.dto";
import Level from "@/entities/level";
import AddLevelGateway from "./add-level.gateway";

export default class AddLevel {
  constructor(
    private readonly levelGateway: AddLevelGateway
  ) { }

  public async execute(input: AddLevelInput) {
    let level: Level = {
      title: input.title,
      created_at: new Date()
    }

    level = await this.levelGateway.create(level);

    const response: AddLevelOutput = {
      id: 1,
      title: 'title',
      created_at: new Date()
    };

    return response;
  }
}