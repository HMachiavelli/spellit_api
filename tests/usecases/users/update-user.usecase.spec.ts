import UpdateUserUsecase from "../../../src/domain/usecases/users/update-user/update-user.usecase";

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

const sut = new UpdateUserUsecase(container);

describe("Update User Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
      name: "User",
    };

    const updated = {
      id: 1,
      name: "User",
      email: "user",
      role: "admin",
      password: "pass",
      created_at: date,
      updated_at: date,
    };

    container.userRepository.update.mockResolvedValue(updated);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: updated.id,
      name: updated.name,
      role: updated.role,
      email: updated.email,
      created_at: updated.created_at,
    });
  });
});
