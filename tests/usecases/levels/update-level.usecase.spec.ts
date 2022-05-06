import UpdateLevelUsecase from "../../../src/domain/usecases/levels/update-level/update-level.usecase";

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

const sut = new UpdateLevelUsecase(container);

describe("Update Level Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
      title: "Level",
    };

    const updated = {
      id: 1,
      title: "Level",
      created_at: date,
      updated_at: date,
    };

    container.levelRepository.update.mockResolvedValue(updated);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: updated.id,
      title: updated.title,
      created_at: updated.created_at,
      updated_at: updated.created_at,
    });
  });
});
