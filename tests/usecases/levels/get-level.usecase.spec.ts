import GetLevelUsecase from "../../../src/domain/usecases/levels/get-level/get-level.usecase";

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

const sut = new GetLevelUsecase(container);

describe("Get Level Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
    };

    const found = {
      id: 1,
      title: "Level",
      created_at: date,
      updated_at: date,
    };

    container.levelRepository.findById.mockResolvedValue(found);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: found.id,
      title: found.title,
      created_at: found.created_at,
      updated_at: found.created_at,
    });
  });

  test("should throw error if not found", async () => {
    const data = {
      id: 1,
    };

    container.levelRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
