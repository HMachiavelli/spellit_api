import GetUserUsecase from "../../../src/domain/usecases/users/get-user/get-user.usecase";

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

const sut = new GetUserUsecase(container);

describe("Get User Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      id: 1,
    };

    const found = {
      id: 1,
      name: "User",
      email: "user",
      role: "admin",
      password: "pass",
      created_at: date,
      updated_at: date,
    };

    container.userRepository.findById.mockResolvedValue(found);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: found.id,
      name: found.name,
      role: found.role,
      email: found.email,
      created_at: found.created_at,
    });
  });

  test("should throw error if not found", async () => {
    const data = {
      id: 1,
    };

    container.userRepository.findById.mockResolvedValue(undefined);

    try {
      await sut.execute(data);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
