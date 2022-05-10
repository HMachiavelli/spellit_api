import { AppContainer } from "@/infra/container";
import Game from "@/entities/game";
import { Prisma, PrismaClient } from "@prisma/client";
import { FindManyOptions } from ".";
import { Repository } from "@/protocols/repository";

export class GameRepository implements Repository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = container.prismaClient;
  }

  public async create(game: Prisma.GameCreateInput): Promise<Game> {
    const inserted = await this.prismaClient.game.create({
      data: game,
    });

    return this.mapToEntity(inserted);
  }

  public async update(data: any): Promise<Game> {
    const where = { id: +data.id };
    delete data.id;

    const updated = await this.prismaClient.game.update({
      where,
      data,
    });

    return this.mapToEntity(updated);
  }

  public async findById(id: number): Promise<Game> {
    const found = await this.prismaClient.game.findFirst({
      where: {
        id,
      },
    });

    return this.mapToEntity(found);
  }

  public async find(options: FindManyOptions): Promise<Game[]> {
    let orderBy: any = {};
    if (options.sortBy) {
      orderBy[options.sortBy] = options.order || "asc";
    }

    const found = await this.prismaClient.game.findMany({
      orderBy,
      skip: options.offset,
      take: options.limit,
    });

    const games: Game[] = found.map((reg: any) => {
      return this.mapToEntity(reg);
    });

    return games;
  }

  public async delete(id: number): Promise<Game> {
    const deleted = await this.prismaClient.game.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(game: any): Game {
    if (!game) {
      return null;
    }

    return {
      id: game.id,
      name: game.name,
      description: game.description,
      logo: game.logo,
      active: game.active,
      created_at: game.created_at,
      updated_at: game.updated_at,
      exercises: game.exercises,
      language: game.language,
      language_id: game.language_id,
      results: game.results,
      levels: game.levels,
    };
  }
}
