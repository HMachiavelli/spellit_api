import { GetUserInput, GetUserOutput } from "./get-user.dto";
import { AppContainer } from "infra/container";
import { Repository } from "@/protocols/repository";
import User from "@/entities/user";

export default class GetUser {
  private userRepository: Repository;

  constructor(container: AppContainer) {
    this.userRepository = container.userRepository;
  }

  public async execute(input: GetUserInput) {
    const user: User = await this.userRepository.findById(input.id);
    if (!user) {
      throw new Error("Not found");
    }

    const response: GetUserOutput = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response;
  }
}
