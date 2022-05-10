import { GameExerciseResultRepository } from "../../src/data/repositories";

const container = {
  prismaClient: {
    gameExerciseResult: {
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  },
};

const sut = new GameExerciseResultRepository(container);

describe("GameExerciseResult Repository Test", () => {
  test("should create", async () => {
    const date = new Date();

    const data = {
      received_answer: "test",
      score: 5,
      created_at: date,
      exercise: { connect: { id: 1 } },
      game_result: { connect: { id: 1 } },
    };

    const inserted = {
      id: 1,
      received_answer: "test",
      score: 5,
      created_at: date,
    };

    container.prismaClient.gameExerciseResult.create.mockResolvedValue(
      inserted
    );

    const repoResponse = await sut.create(data);
    expect(repoResponse).toMatchObject(inserted);
  });

  test("should update", async () => {
    const date = new Date();

    const data = {
      received_answer: "test 2",
    };

    const updated = {
      id: 1,
      received_answer: "test 2",
      score: 5,
      created_at: date,
    };

    container.prismaClient.gameExerciseResult.update.mockResolvedValue(updated);

    const repoResponse = await sut.update(data);
    expect(repoResponse).toMatchObject(updated);
  });

  test("should delete", async () => {
    const deleted = {
      id: 1,
      received_answer: "test",
      score: 5,
      created_at: new Date(),
    };

    container.prismaClient.gameExerciseResult.delete.mockResolvedValue(deleted);

    const repoResponse = await sut.delete(1);
    expect(repoResponse).toMatchObject(deleted);
  });

  test("should find by id", async () => {
    const found = {
      id: 1,
      received_answer: "test",
      score: 5,
      created_at: new Date(),
    };

    container.prismaClient.gameExerciseResult.findFirst.mockResolvedValue(
      found
    );

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
        received_answer: "test",
        score: 5,
        created_at: new Date(),
      },
    ];

    container.prismaClient.gameExerciseResult.findMany.mockResolvedValue(found);

    const repoResponse = await sut.find(options);
    expect(repoResponse).toMatchObject(found);
  });
});
