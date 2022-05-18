import { AddUserInput, AddUserOutput } from "./add-user.dto";
import { AppContainer } from "infra/container";
import { Repository } from "@/protocols/repository";
import { Prisma } from "@prisma/client";
import crypto from "crypto";

export default class AddUser {
  private userRepository: Repository;

  constructor(container: AppContainer) {
    this.userRepository = container.userRepository;
  }

  public async execute(input: AddUserInput) {
    let user: Prisma.UserCreateInput = {
      name: input.name.trim().toUpperCase(),
      role: input.role.trim().toLowerCase(),
      email: input.email.trim().toLowerCase(),
      password: this.hashPassword(input.password),
      active: input.active,
      created_at: new Date(),
    };

    const addedUser = await this.userRepository.create(user);

    const response: AddUserOutput = {
      id: addedUser.id,
      name: addedUser.name,
      role: addedUser.role,
      email: addedUser.email,
      active: addedUser.active,
      created_at: addedUser.created_at,
    };

    return response;
  }

  private hashPassword(password: string): string {
    let saltedPass = password + process.env.PASS_SALT;

    return crypto.createHash("sha256").update(saltedPass).digest("hex");
  }
}
