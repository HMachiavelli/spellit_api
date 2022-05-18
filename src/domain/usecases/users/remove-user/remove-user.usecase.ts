import { RemoveUserInput, RemoveUserOutput } from "./remove-user.dto";
import { AppContainer } from "infra/container";
import User from "@/entities/user";
import { Repository } from "@/protocols/repository";

export default class GetUser {
  private userRepository: Repository;

  constructor(container: AppContainer) {
    this.userRepository = container.userRepository;
  }

  public async execute(input: RemoveUserInput) {
    const user: User = await this.userRepository.delete(input.id);

    const response: RemoveUserOutput = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      removed_at: new Date(),
    };

    return response;
  }
}
