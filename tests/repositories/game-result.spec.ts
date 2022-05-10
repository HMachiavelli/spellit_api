import { GameResultRepository } from "../../src/data/repositories";

const container = {
  prismaClient: {
    gameResult: {
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  },
};

const sut = new GameResultRepository(container);

describe("GameResult Repository Test", () => {
  test("should create", async () => {
    const date = new Date();

    const data = {
      total_score: 0,
      current_exercise: 1,
      started_at: date,
      finished_at: date,
      game: { connect: { id: 1 } },
      level: { connect: { id: 1 } },
      user: { connect: { id: 1 } },
    };

    const inserted = {
      id: 1,
      total_score: 0,
      current_exercise: 1,
      started_at: date,
      finished_at: date,
    };

    container.prismaClient.gameResult.create.mockResolvedValue(inserted);

    const repoResponse = await sut.create(data);
    expect(repoResponse).toMatchObject(inserted);
  });

  test("should update", async () => {
    const date = new Date();

    const data = {
      id: 1,
      total_score: 100,
      current_exercise: 2,
    };

    const updated = {
      id: 1,
      total_score: 100,
      current_exercise: 2,
      started_at: date,
      finished_at: date,
    };

    container.prismaClient.gameResult.update.mockResolvedValue(updated);

    const repoResponse = await sut.update(data);
    expect(repoResponse).toMatchObject(updated);
  });

  test("should delete", async () => {
    const deleted = {
      id: 1,
      total_score: 500,
      started_at: new Date(),
      finished_at: new Date(),
    };

    container.prismaClient.gameResult.delete.mockResolvedValue(deleted);

    const repoResponse = await sut.delete(1);
    expect(repoResponse).toMatchObject(deleted);
  });

  test("should find by id", async () => {
    const found = {
      id: 1,
      total_score: 500,
      started_at: new Date(),
      finished_at: new Date(),
    };

    container.prismaClient.gameResult.findFirst.mockResolvedValue(found);

    const repoResponse = await sut.findById(1);
    expect(repoResponse).toMatchObject(found);
  });

  test("should find many", async () => {
    const options = {
      offset: 0,
      limit: 1,
    };

    const found = [
      {
        id: 1,
        total_score: 500,
        started_at: new Date(),
        finished_at: new Date(),
      },
    ];

    container.prismaClient.gameResult.findMany.mockResolvedValue(found);

    const repoResponse = await sut.find(options);
    expect(repoResponse).toMatchObject(found);
  });
});
