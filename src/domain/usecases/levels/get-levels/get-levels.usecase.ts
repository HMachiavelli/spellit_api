import { GetLevelsInput, GetLevelsOutput } from "./get-levels.dto";
import { AppContainer } from "infra/container";
import Level from "@/entities/level";
import { FindManyOptions, LevelRepository } from "@/repositories/index";

export default class GetLevels {
  private levelRepository: LevelRepository;

  constructor(container: AppContainer) {
    this.levelRepository = container.levelRepository;
  }

  public async execute(input: GetLevelsInput) {
    const offset = input.page * input.page_size - input.page_size;

    const options: FindManyOptions = {
      search: input.search.trim(),
      limit: +(input.page_size || 10),
      offset: +offset,
      sortBy: input.sort_by.trim(),
      order: input.order.trim().toLowerCase(),
    };

    const list: Level[] = await this.levelRepository.find(options);
    return this.mapResponse(list);
  }

  private mapResponse(list: Level[]): GetLevelsOutput {
    const response: GetLevelsOutput = [];
    list.map((item: Level) => {
      response.push({
        id: item.id,
        title: item.title,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });
    });

    return response;
  }
}
