import { UpdateUserInput, UpdateUserOutput } from "./update-user.dto";
import { AppContainer } from "infra/container";
import User from "@/entities/user";
import { Repository } from "@/protocols/repository";

export default class UpdateUser {
  private userRepository: Repository;

  constructor(container: AppContainer) {
    this.userRepository = container.userRepository;
  }

  public async execute(input: UpdateUserInput) {
    let user: any = {
      id: input.id,
      active: input.active,
      updated_at: new Date(),
    };

    if (input.name) {
      user.name = input.name.trim().toUpperCase();
    }

    if (input.role) {
      user.role = input.role.trim().toLowerCase();
    }

    if (input.email) {
      user.email = input.email.trim().toLowerCase();
    }

    user = await this.userRepository.update(user);

    const response: UpdateUserOutput = {
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
