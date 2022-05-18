import GetUsersUsecase from "../../../src/domain/usecases/users/get-users/get-users.usecase";

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

const sut = new GetUsersUsecase(container);

describe("Get Users Usecase Test", () => {
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
        name: "User",
        email: "user",
        role: "admin",
        created_at: date,
        updated_at: date,
      },
    ];

    container.userRepository.find.mockResolvedValue(found);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({ total: 1, list: found });
  });
});
