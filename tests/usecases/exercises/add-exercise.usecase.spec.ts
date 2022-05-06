import AddExerciseUsecase from "../../../src/domain/usecases/exercises/add-exercise/add-exercise.usecase";

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

const sut = new AddExerciseUsecase(container);

describe("Add Exercise Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      type: "Type ",
      question: "Question ",
      answer: "Answer ",
      active: true,
      game_id: 1,
      level_id: 1,
      answer_type_id: 1,
    };

    const inserted = {
      id: 1,
      type: "Type",
      question: "Question",
      answer: "Answer",
      active: true,
      created_at: date,
      updated_at: date,
      game: { id: 1 },
      level: { id: 1 },
      answer_type: { id: 1 },
    };

    container.exerciseRepository.create.mockResolvedValue(inserted);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject(inserted);
  });
});
