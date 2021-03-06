import { AppContainer } from "@/infra/container";
import Level from "@/entities/level";
import { Prisma, PrismaClient } from "@prisma/client";
import { FindManyOptions } from "./";
import { Repository } from "@/protocols/repository";

export class LevelRepository implements Repository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = container.prismaClient;
  }

  public async create(level: Prisma.LevelCreateInput): Promise<Level> {
    const inserted = await this.prismaClient.level.create({ data: level });

    return this.mapToEntity(inserted);
  }

  public async update(data: any): Promise<Level> {
    const where = { id: +data.id };
    delete data.id;

    const updated = await this.prismaClient.level.update({
      where,
      data,
    });

    return this.mapToEntity(updated);
  }

  public async findById(id: number): Promise<Level> {
    const found = await this.prismaClient.level.findFirst({
      where: {
        id,
      },
    });

    return this.mapToEntity(found);
  }

  public async find(options: FindManyOptions): Promise<Level[]> {
    let orderBy: any = {};
    let where: any = {};
    if (options.sortBy) {
      orderBy[options.sortBy] = options.order || "asc";
    }

    if (options.search && options.search !== "") {
      where = {
        title: {
          contains: options.search,
        },
      };
    }

    const found = await this.prismaClient.level.findMany({
      where,
      orderBy,
      skip: options.offset,
      take: options.limit,
    });

    const levels: Level[] = found.map((reg: any) => {
      return this.mapToEntity(reg);
    });

    return levels;
  }

  public async delete(id: number): Promise<Level> {
    const deleted = await this.prismaClient.level.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(level: any): Level {
    if (!level) {
      return null;
    }

    return {
      id: level.id,
      title: level.title,
      created_at: level.created_at,
      updated_at: level.updated_at,
    };
  }
}
