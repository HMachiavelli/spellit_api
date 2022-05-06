import GetLevelsUsecase from "../../../src/domain/usecases/levels/get-levels/get-levels.usecase";

const container = {
  levelRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    mapToEntity: jest.fn(),
  },
};

const sut = new GetLevelsUsecase(container);

describe("Get Levels Usecase Test", () => {
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
        title: "Level",
        created_at: date,
        updated_at: date,
      },
    ];

    container.levelRepository.find.mockResolvedValue(found);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({ total: 1, list: found });
  });
});
