import { AuthenticateInput, AuthenticateOutput } from "./authenticate.dto";
import { AppContainer } from "infra/container";
import { UserAccessTokenRepository } from "@/repositories/user-access-token";
import { UserRepository } from "@/repositories/user";
import { Prisma } from "@prisma/client";

export default class GetLevel {
  private userRepository: UserRepository;
  private userAccessTokenRepository: UserAccessTokenRepository;

  constructor(container: AppContainer) {
    this.userRepository = container.userRepository;
    this.userAccessTokenRepository = container.userAccessTokenRepository;
  }

  public async execute(input: AuthenticateInput) {
    console.log(input);
    if (input.grant_type !== "get-credentials") {
      throw new Error("Invalid grant type");
    }

    //retrieve user from client_id and secret
    const user = await this.userRepository.findByCredentials(
      input.client_id,
      input.client_secret
    );

    if (!user) {
      throw new Error("Unauthorized");
    }

    const token = crypto.randomUUID();
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);
    const accessToken: Prisma.UserAccessTokenCreateInput = {
      token,
      expire_at: expiration,
      created_at: new Date(),
      user: { connect: { id: user.id } },
    };

    await this.userAccessTokenRepository.create(accessToken);

    const response: AuthenticateOutput = {
      token: token,
      refresh_token: token,
      expire_in: 60000,
      role: user.role,
    };

    return response;
  }
}
