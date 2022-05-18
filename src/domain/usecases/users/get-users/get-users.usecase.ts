import { GetUsersInput } from "./get-users.dto";
import { AppContainer } from "infra/container";
import { FindManyOptions } from "@/repositories/index";
import { Repository } from "domain/protocols/repository";
import User from "@/entities/user";

export default class GetUsers {
  private userRepository: Repository;

  constructor(container: AppContainer) {
    this.userRepository = container.userRepository;
  }

  public async execute(input: GetUsersInput) {
    const offset = input.page * input.page_size - input.page_size;

    const all: User[] = await this.userRepository.find({});

    const options: FindManyOptions = {
      search: input.search.trim(),
      limit: +(input.page_size || 10),
      offset: +offset,
      sortBy: input.sort_by.trim(),
      order: input.order.trim().toLowerCase(),
    };

    const list: User[] = await this.userRepository.find(options);
    const userList = this.mapResponse(list);

    return {
      total: all.length,
      list: userList,
    };
  }

  private mapResponse(list: User[]): any {
    const response: any = [];
    list.map((item: User) => {
      response.push({
        id: item.id,
        name: item.name,
        role: item.role,
        email: item.email,
        created_at: item.created_at,
        updated_at: item.updated_at,
      });
    });

    return response;
  }
}
