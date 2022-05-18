import RemoveUserUsecase from "../../../src/domain/usecases/users/remove-user/remove-user.usecase";

const container = {
  userRepository: {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    mapToEntity: jest.fn(),
    findByCredentials: jest.fn(),
  },
};

const sut = new RemoveUserUsecase(container);

describe("Remove User Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
    };

    const removed = {
      id: 1,
      name: "User",
      email: "user",
      role: "admin",
      password: "pass",
      created_at: date,
      updated_at: date,
    };

    container.userRepository.delete.mockResolvedValue(removed);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: removed.id,
      name: removed.name,
      role: removed.role,
      email: removed.email,
      created_at: removed.created_at,
    });
    expect(usecaseResponse).toHaveProperty("removed_at");
  });
});
