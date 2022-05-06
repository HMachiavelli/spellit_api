import { ExerciseRepository } from "../../src/data/repositories";

const container = {
  prismaClient: {
    exercise: {
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  },
};

const sut = new ExerciseRepository(container);

describe("Exercise Repository Test", () => {
  test("should create", async () => {
    const date = new Date();

    const data = {
      question: "Exercise",
      answer: "Answer",
      type: "text",
      created_at: date,
      udpated_at: date,
      game: { connect: { id: 1 } },
      level: { connect: { id: 1 } },
      answer_type: { connect: { id: 1 } },
    };

    const inserted = {
      id: 1,
      question: "Exercise",
      created_at: date,
      updated_at: date,
    };

    container.prismaClient.exercise.create.mockResolvedValue(inserted);

    const repoResponse = await sut.create(data);
    expect(repoResponse).toMatchObject(inserted);
  });

  test("should update", async () => {
    const date = new Date();

    const data = {
      id: 1,
      question: "Exercise",
      updated_at: date,
    };

    const updated = {
      id: 1,
      question: "Exercise",
      created_at: date,
      updated_at: date,
    };

    container.prismaClient.exercise.update.mockResolvedValue(updated);

    const repoResponse = await sut.update(data);
    expect(repoResponse).toMatchObject(updated);
  });

  test("should delete", async () => {
    const deleted = {
      id: 1,
      question: "Exercise",
      created_at: new Date(),
      updated_at: new Date(),
    };

    container.prismaClient.exercise.delete.mockResolvedValue(deleted);

    const repoResponse = await sut.delete(1);
    expect(repoResponse).toMatchObject(deleted);
  });

  test("should find by id", async () => {
    const found = {
      id: 1,
      question: "Exercise",
      created_at: new Date(),
      updated_at: new Date(),
    };

    container.prismaClient.exercise.findFirst.mockResolvedValue(found);

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
        question: "Exercise",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    container.prismaClient.exercise.findMany.mockResolvedValue(found);

    const repoResponse = await sut.find(options);
    expect(repoResponse).toMatchObject(found);
  });
});
