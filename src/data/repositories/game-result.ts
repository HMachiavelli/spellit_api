import { AppContainer } from "@/infra/container";
import GameResult from "@/entities/game-result";
import { Prisma, PrismaClient } from "@prisma/client";
import { FindManyOptions } from ".";
import { Repository } from "@/protocols/repository";

export class GameResultRepository implements Repository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = container.prismaClient;
  }

  public async create(
    result: Prisma.GameResultCreateInput
  ): Promise<GameResult> {
    const inserted = await this.prismaClient.gameResult.create({
      data: result,
    });

    return this.mapToEntity(inserted);
  }

  public async update(data: any): Promise<GameResult> {
    const where = { id: +data.id };
    delete data.id;

    const updated = await this.prismaClient.gameResult.update({
      where,
      data,
    });

    return this.mapToEntity(updated);
  }

  public async findById(id: number): Promise<GameResult> {
    const found = await this.prismaClient.gameResult.findFirst({
      where: {
        id,
      },
    });

    return this.mapToEntity(found);
  }

  public async find(options: FindManyOptions): Promise<GameResult[]> {
    let orderBy: any = {};
    if (options.sortBy) {
      orderBy[options.sortBy] = options.order || "asc";
    }

    const found = await this.prismaClient.gameResult.findMany({
      orderBy,
      skip: options.offset,
      take: options.limit,
    });

    const levels: GameResult[] = found.map((reg: any) => {
      return this.mapToEntity(reg);
    });

    return levels;
  }

  public async delete(id: number): Promise<GameResult> {
    const deleted = await this.prismaClient.gameResult.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(result: any): GameResult {
    if (!result) {
      return null;
    }

    return {
      id: result.id,
      total_score: result.total_score,
      current_exercise: result.current_exercise,
      started_at: result.started_at,
      finished_at: result.finished_at,
      game: result.game,
      game_id: result.game_id,
      level: result.level,
      level_id: result.level_id,
      user: result.user,
      user_id: result.user_id,
      exercise_results: result.exercise_results,
    };
  }
}
