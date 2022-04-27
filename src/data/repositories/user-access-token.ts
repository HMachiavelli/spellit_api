import { AppContainer } from "@/infra/container";
import UserAccessToken from "domain/entities/user-access-token";
import { Prisma, PrismaClient } from "@prisma/client";

export class UserAccessTokenRepository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = new PrismaClient();
  }

  public async create(
    token: Prisma.UserAccessTokenCreateInput
  ): Promise<UserAccessToken> {
    const inserted = await this.prismaClient.userAccessToken.create({
      data: token,
    });

    return this.mapToEntity(inserted);
  }

  public async findByToken(token: string): Promise<UserAccessToken> {
    const found = await this.prismaClient.userAccessToken.findFirst({
      where: {
        token,
      },
    });

    return this.mapToEntity(found);
  }

  public async delete(id: number): Promise<UserAccessToken> {
    const deleted = await this.prismaClient.user.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(token: any): UserAccessToken {
    if (!token) {
      return null;
    }

    return {
      id: token.id,
      token: token.token,
      expire_at: token.expire_at,
      created_at: token.created_at,
      user: token.user,
      user_id: token.user_id,
    };
  }
}
