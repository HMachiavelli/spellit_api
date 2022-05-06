import RemoveLevelUsecase from "../../../src/domain/usecases/levels/remove-level/remove-level.usecase";

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

const sut = new RemoveLevelUsecase(container);

describe("Remove Level Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
    };

    const removed = {
      id: 1,
      title: "Level",
      created_at: date,
      updated_at: date,
    };

    container.levelRepository.delete.mockResolvedValue(removed);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: removed.id,
      title: removed.title,
      created_at: removed.created_at,
    });
    expect(usecaseResponse).toHaveProperty("removed_at");
  });
});
