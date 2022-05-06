import GetExerciseUsecase from "../../../src/domain/usecases/exercises/get-exercise/get-exercise.usecase";

const container = {
  exerciseRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    mapToEntity: jest.fn(),
  },
};

const sut = new GetExerciseUsecase(container);

describe("Get Exercise Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
    };

    const found = {
      id: 1,
      question: "Exercise",
      created_at: date,
      updated_at: date,
    };

    container.exerciseRepository.findById.mockResolvedValue(found);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject(found);
  });

  test("should throw error if not found", async () => {
    const data = {
      id: 1,
    };

    container.exerciseRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
