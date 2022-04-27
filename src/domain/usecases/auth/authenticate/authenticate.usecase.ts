import { AuthenticateInput, AuthenticateOutput } from "./authenticate.dto";
import { AppContainer } from "infra/container";
import { UserAccessLogRepository } from "@/repositories/user-access-log";
import { UserAccessTokenRepository } from "@/repositories/user-access-token";
import { UserRepository } from "@/repositories/user";
import { Prisma } from "@prisma/client";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import * as crypto from "crypto";

export default class GetLevel {
  private userRepository: UserRepository;
  private userAccessTokenRepository: UserAccessTokenRepository;
  private userAccessLogRepository: UserAccessLogRepository;

  constructor(container: AppContainer) {
    this.userRepository = container.userRepository;
    this.userAccessTokenRepository = container.userAccessTokenRepository;
    this.userAccessLogRepository = container.userAccessLogRepository;
  }

  public async execute(input: AuthenticateInput) {
    if (input.grant_type !== "get-credentials") {
      throw new Error("Invalid grant type");
    }

    const user = await this.userRepository.findByCredentials(
      input.client_id,
      input.client_secret
    );

    if (!user) {
      throw new UnauthorizedError("Unauthorized");
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

    const accessLog: Prisma.UserAccessLogCreateInput = {
      ip_address: input.ip_address,
      created_at: new Date(),
      user: { connect: { id: user.id } },
    };

    await this.userAccessLogRepository.create(accessLog);

    const response: AuthenticateOutput = {
      token: token,
      refresh_token: token,
      expire_at: new Date().getTime() + 86400000,
      role: user.role,
    };

    return response;
  }
}
