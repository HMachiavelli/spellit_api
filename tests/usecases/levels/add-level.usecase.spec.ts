import AddLevelUsecase from "../../../src/domain/usecases/levels/add-level/add-level.usecase";

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

const sut = new AddLevelUsecase(container);

describe("Add Level Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      title: "Level",
    };

    const inserted = {
      id: 1,
      title: "Level",
      created_at: date,
      updated_at: date,
    };

    container.levelRepository.create.mockResolvedValue(inserted);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: inserted.id,
      title: inserted.title,
      created_at: inserted.created_at,
    });
  });
});
