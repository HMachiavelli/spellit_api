import UpdateExerciseUsecase from "../../../src/domain/usecases/exercises/update-exercise/update-exercise.usecase";

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

const sut = new UpdateExerciseUsecase(container);

describe("Update Exercise Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
      question: "Exercise ",
    };

    const updated = {
      id: 1,
      question: "Exercise",
      created_at: date,
      updated_at: date,
    };

    container.exerciseRepository.update.mockResolvedValue(updated);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: updated.id,
      question: updated.question,
      created_at: updated.created_at,
      updated_at: updated.created_at,
    });
  });
});
