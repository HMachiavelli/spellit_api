import { GameRepository } from "../../src/data/repositories";

const container = {
  prismaClient: {
    game: {
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  },
};

const sut = new GameRepository(container);

describe("Game Repository Test", () => {
  test("should create", async () => {
    const date = new Date();

    const data = {
      name: "Game",
      description: "Desc",
      active: true,
      created_at: date,
      language: { connect: { id: 1 } },
    };

    const inserted = {
      id: 1,
      name: "Game",
      active: true,
      created_at: date,
      updated_at: date,
    };

    container.prismaClient.game.create.mockResolvedValue(inserted);

    const repoResponse = await sut.create(data);
    expect(repoResponse).toMatchObject(inserted);
  });

  test("should update", async () => {
    const date = new Date();

    const data = {
      id: 1,
      name: "Game 2",
    };

    const updated = {
      id: 1,
      name: "Game 2",
      active: true,
      created_at: date,
      updated_at: date,
    };

    container.prismaClient.game.update.mockResolvedValue(updated);

    const repoResponse = await sut.update(data);
    expect(repoResponse).toMatchObject(updated);
  });

  test("should delete", async () => {
    const deleted = {
      id: 1,
      name: "Game",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    container.prismaClient.game.delete.mockResolvedValue(deleted);

    const repoResponse = await sut.delete(1);
    expect(repoResponse).toMatchObject(deleted);
  });

  test("should find by id", async () => {
    const found = {
      id: 1,
      name: "Game",
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    container.prismaClient.game.findFirst.mockResolvedValue(found);

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
        name: "Game",
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    container.prismaClient.game.findMany.mockResolvedValue(found);

    const repoResponse = await sut.find(options);
    expect(repoResponse).toMatchObject(found);
  });
});
