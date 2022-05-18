import AnswerExerciseUsecase from "../../../src/domain/usecases/exercises/answer-exercise/answer-exercise.usecase";
import { NotFoundException } from "../../../src/presentation/exceptions/not-found";

const container = {
  exerciseRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    mapToEntity: jest.fn(),
    getRandom: jest.fn(),
  },
  gameExerciseResultRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    mapToEntity: jest.fn(),
  },
  gameResultRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    mapToEntity: jest.fn(),
  },
};

const sut = new AnswerExerciseUsecase(container);

describe("Answer Exercise Usecase Test", () => {
  test("should execute", async () => {
    container.gameResultRepository.findById.mockResolvedValue({ id: 1 });
    container.exerciseRepository.findById.mockResolvedValue({ id: 1 });

    const date = new Date();

    const data = {
      exercise_id: 1,
      game_result_id: 1,
      received_answer: "Answer",
    };

    const inserted = {
      id: 1,
      score: 50,
      received_answer: "Answer",
      created_at: date,
      game_result: { id: 1 },
      exercise: { id: 1 },
    };

    container.gameExerciseResultRepository.create.mockResolvedValue(inserted);
    container.exerciseRepository.getRandom.mockResolvedValue({ id: 1 });

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: 1,
      next_exercise: "/exercises/1",
    });
  });

  test("should throw error if exercise not found", async () => {
    const data = {
      exercise_id: 1,
      game_result_id: 1,
      received_answer: "Answer",
    };

    container.exerciseRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  test("should throw error if game result not found", async () => {
    const data = {
      exercise_id: 1,
      game_result_id: 1,
      received_answer: "Answer",
    };

    container.gameResultRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
