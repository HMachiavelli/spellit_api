import GetGameResultUsecase from "../../../src/domain/usecases/game-results/get-game-result/get-game-result.usecase";
import { NotFoundException } from "../../../src/presentation/exceptions/not-found";

const container = {
  gameResultRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  },
};

const sut = new GetGameResultUsecase(container);

describe("Get Game Result Usecase Test", () => {
  test("should execute", async () => {
    const data = {
      id: 1,
    };

    const found = {
      id: 1,
      total_score: 0,
      current_exercise: 1,
      started_at: new Date(),
      game: { id: 1 },
      level: { id: 1 },
      user: { id: 1 },
    };

    container.gameResultRepository.findById.mockResolvedValue(found);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject(found);
  });

  test("should throw error if game result not found", async () => {
    const data = {
      id: 1,
    };

    container.gameResultRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
