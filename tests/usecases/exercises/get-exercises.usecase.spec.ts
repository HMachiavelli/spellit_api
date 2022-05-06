import GetExercisesUsecase from "../../../src/domain/usecases/exercises/get-exercises/get-exercises.usecase";

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

const sut = new GetExercisesUsecase(container);

describe("Get Exercises Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      search: "Teste",
      page: 1,
      page_size: 10,
      sort_by: "id",
      order: "ASC",
    };

    const found = [
      {
        id: 1,
        question: "Exercise",
        created_at: date,
        updated_at: date,
      },
    ];

    container.exerciseRepository.find.mockResolvedValue(found);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({ total: 1, list: found });
  });
});
