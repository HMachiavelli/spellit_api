import User from "@/entities/user";
import { Repository } from "./repository";

export interface IUserRepository extends Repository {
  findByCredentials(user: string, password: string): Promise<User>;
}
