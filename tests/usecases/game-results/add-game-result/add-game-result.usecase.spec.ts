import AddGameResultUsecase from "../../../../src/domain/usecases/game-results/add-game-result/add-game-result.usecase";
import { NotFoundError } from "../../../../src/presentation/errors/NotFoundError";

const container = {
  gameResultRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  },
  gameRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  },
  levelRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  },
};

const sut = new AddGameResultUsecase(container);

describe("Add Game Result Usecase Test", () => {
  test("should execute", async () => {
    const data = {
      game_id: 1,
      level_id: 1,
      user_id: 1,
      current_exercise: 1,
    };

    const inserted = {
      id: 1,
      total_score: 0,
      current_exercise: 1,
      started_at: new Date(),
      first_exercise_uri: "/exercise/2",
      game: { id: 1 },
      level: { id: 1 },
      user: { id: 1 },
    };

    container.gameResultRepository.create.mockResolvedValue(inserted);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject(inserted);
  });

  test("should throw error if level not found", async () => {
    const data = {
      game_id: 1,
      level_id: 1,
      user_id: 1,
      current_exercise: 1,
    };

    container.levelRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundError);
    }
  });

  test("should throw error if game not found", async () => {
    const data = {
      game_id: 1,
      level_id: 1,
      user_id: 1,
      current_exercise: 1,
    };

    container.gameRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundError);
    }
  });
});
