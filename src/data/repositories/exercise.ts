import { AppContainer } from "@/infra/container";
import Exercise from "@/entities/exercise";
import { Prisma, PrismaClient } from "@prisma/client";
import { FindManyOptions } from "./";
import { Repository } from "@/protocols/repository";

export class ExerciseRepository implements Repository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = container.prismaClient;
  }

  public async create(exercise: Prisma.ExerciseCreateInput): Promise<Exercise> {
    const inserted = await this.prismaClient.exercise.create({
      data: exercise,
    });

    return this.mapToEntity(inserted);
  }

  public async update(data: any): Promise<Exercise> {
    const where = { id: +data.id };
    delete data.id;

    const updated = await this.prismaClient.exercise.update({
      where,
      data,
    });

    return this.mapToEntity(updated);
  }

  public async findById(id: number): Promise<Exercise> {
    const found = await this.prismaClient.exercise.findFirst({
      where: {
        id,
      },
    });

    return this.mapToEntity(found);
  }

  public async find(options: FindManyOptions): Promise<Exercise[]> {
    let orderBy: any = {};
    let where: any = {};
    if (options.sortBy) {
      orderBy[options.sortBy] = options.order || "asc";
    }

    if (options.search && options.search !== "") {
      where = {
        question: {
          contains: options.search,
        },
      };
    }

    const found = await this.prismaClient.exercise.findMany({
      where,
      orderBy,
      skip: options.offset,
      take: options.limit,
    });

    const exercises: Exercise[] = found.map((reg: any) => {
      return this.mapToEntity(reg);
    });

    return exercises;
  }

  public async delete(id: number): Promise<Exercise> {
    const deleted = await this.prismaClient.exercise.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(exercise: any): Exercise {
    if (!exercise) {
      return null;
    }

    return {
      id: exercise.id,
      type: exercise.type,
      question: exercise.question,
      answer: exercise.answer,
      active: exercise.active,
      created_at: exercise.created_at,
      updated_at: exercise.updated_at,
      game: exercise.game,
      level: exercise.level,
      answer_type: exercise.answer_type,
      question_media: exercise.question_media,
    };
  }
}
