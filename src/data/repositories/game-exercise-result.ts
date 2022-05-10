import { AppContainer } from "@/infra/container";
import GameExerciseResult from "@/entities/game-exercise-result";
import { Prisma, PrismaClient } from "@prisma/client";
import { FindManyOptions } from ".";

export class GameExerciseResultRepository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = container.prismaClient;
  }

  public async create(
    result: Prisma.GameExerciseResultCreateInput
  ): Promise<GameExerciseResult> {
    const inserted = await this.prismaClient.gameExerciseResult.create({
      data: result,
    });

    return this.mapToEntity(inserted);
  }

  public async update(data: any): Promise<GameExerciseResult> {
    const where = { id: +data.id };
    delete data.id;

    const updated = await this.prismaClient.gameExerciseResult.update({
      where,
      data,
    });

    return this.mapToEntity(updated);
  }

  public async findById(id: number): Promise<GameExerciseResult> {
    const found = await this.prismaClient.gameExerciseResult.findFirst({
      where: {
        id,
      },
    });

    return this.mapToEntity(found);
  }

  public async find(options: FindManyOptions): Promise<GameExerciseResult[]> {
    let orderBy: any = {};
    if (options.sortBy) {
      orderBy[options.sortBy] = options.order || "asc";
    }

    const found = await this.prismaClient.gameExerciseResult.findMany({
      orderBy,
      skip: options.offset,
      take: options.limit,
    });

    const levels: GameExerciseResult[] = found.map((reg: any) => {
      return this.mapToEntity(reg);
    });

    return levels;
  }

  public async delete(id: number): Promise<GameExerciseResult> {
    const deleted = await this.prismaClient.gameExerciseResult.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(result: any): GameExerciseResult {
    if (!result) {
      return null;
    }

    return {
      id: result.id,
      received_answer: result.received_answer,
      score: result.score,
      created_at: result.created_at,
      exercise: result.exercise,
      exercise_id: result.exercise_id,
      game_result: result.game_result,
      game_result_id: result.game_result_id,
    };
  }
}
