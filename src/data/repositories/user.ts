import { AppContainer } from "@/infra/container";
import User from "@/entities/user";
import { Prisma, PrismaClient } from "@prisma/client";
import { FindManyOptions } from "./";

export class UserRepository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = container.prismaClient;
  }

  public async create(user: Prisma.UserCreateInput): Promise<User> {
    const inserted = await this.prismaClient.user.create({
      data: user,
    });

    return this.mapToEntity(inserted);
  }

  public async update(data: any): Promise<User> {
    const where = { id: +data.id };
    delete data.id;

    const updated = await this.prismaClient.user.update({
      where,
      data,
    });

    return this.mapToEntity(updated);
  }

  public async findById(id: number): Promise<User> {
    const found = await this.prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    return this.mapToEntity(found);
  }

  public async findByCredentials(
    email: string,
    password: string
  ): Promise<User> {
    const found = await this.prismaClient.user.findFirst({
      where: {
        email,
        password,
      },
    });

    return this.mapToEntity(found);
  }

  public async find(options: FindManyOptions): Promise<User[]> {
    let orderBy: any = {};
    let where: any = {};
    if (options.sortBy) {
      orderBy[options.sortBy] = options.order || "asc";
    }

    if (options.search && options.search !== "") {
      where = {
        name: {
          contains: options.search,
        },
      };
    }

    const found = await this.prismaClient.user.findMany({
      where,
      orderBy,
      skip: options.offset,
      take: options.limit,
    });

    const users: User[] = found.map((reg: any) => {
      return this.mapToEntity(reg);
    });

    return users;
  }

  public async delete(id: number): Promise<User> {
    const deleted = await this.prismaClient.user.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(user: any): User {
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      role: user.role,
      active: user.active,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
