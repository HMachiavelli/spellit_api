import AddUserUsecase from "../../../src/domain/usecases/users/add-user/add-user.usecase";
import crypto from "crypto";

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

const sut = new AddUserUsecase(container);

describe("Add User Usecase Test", () => {
  test("should execute", async () => {
    const date = new Date();

    const data = {
      name: "User",
      email: "user",
      role: "admin",
      password: "something",
      active: true,
    };

    let saltedPass = data.password + process.env.PASS_SALT;
    let hash = crypto
      .createHash("sha256")
      .update(saltedPass)
      .digest()
      .toString();

    const inserted = {
      id: 1,
      name: "User",
      email: "user",
      role: "admin",
      password: hash,
      active: true,
      created_at: date,
      updated_at: date,
    };

    container.userRepository.create.mockResolvedValue(inserted);

    const usecaseResponse = await sut.execute(data);
    expect(usecaseResponse).toMatchObject({
      id: inserted.id,
      name: inserted.name,
      role: inserted.role,
      email: inserted.email,
      active: inserted.active,
      created_at: inserted.created_at,
    });
  });
});
