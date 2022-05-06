import { GetLevelsInput, GetLevelsOutput } from "./get-levels.dto";
import { AppContainer } from "infra/container";
import Level from "@/entities/level";
import { FindManyOptions } from "@/repositories/index";
import { Repository } from "domain/protocols/repository";

export default class GetLevels {
  private levelRepository: Repository;

  constructor(container: AppContainer) {
    this.levelRepository = container.levelRepository;
  }

  public async execute(input: GetLevelsInput) {
    const offset = input.page * input.page_size - input.page_size;

    const all: Level[] = await this.levelRepository.find({});

    const options: FindManyOptions = {
      search: input.search.trim(),
      limit: +(input.page_size || 10),
      offset: +offset,
      sortBy: input.sort_by.trim(),
      order: input.order.trim().toLowerCase(),
    };

    const list: Level[] = await this.levelRepository.find(options);
    const levelList = this.mapResponse(list);

    return {
      total: all.length,
      list: levelList,
    };
  }

  private mapResponse(list: Level[]): any {
    const response: any = [];
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
