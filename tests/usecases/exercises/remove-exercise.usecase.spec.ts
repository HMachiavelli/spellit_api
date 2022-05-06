import RemoveExerciseUsecase from "../../../src/domain/usecases/exercises/remove-exercise/remove-exercise.usecase";

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

const sut = new RemoveExerciseUsecase(container);

describe("Remove Exercise Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
    };

    const removed = {
      id: 1,
      question: "Exercise",
      created_at: date,
      updated_at: date,
    };

    container.exerciseRepository.delete.mockResolvedValue(removed);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: removed.id,
      question: removed.question,
      created_at: removed.created_at,
    });
    expect(usecaseResponse).toHaveProperty("removed_at");
  });
});
