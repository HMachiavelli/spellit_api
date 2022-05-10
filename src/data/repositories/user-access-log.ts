import { AppContainer } from "@/infra/container";
import UserAccessLog from "@/entities/user-access-log";
import { Prisma, PrismaClient } from "@prisma/client";

export class UserAccessLogRepository {
  private prismaClient: PrismaClient;

  constructor(container: AppContainer) {
    this.prismaClient = container.prismaClient;
  }

  public async create(
    log: Prisma.UserAccessLogCreateInput
  ): Promise<UserAccessLog> {
    const inserted = await this.prismaClient.userAccessLog.create({
      data: log,
    });

    return this.mapToEntity(inserted);
  }

  public async delete(id: number): Promise<UserAccessLog> {
    const deleted = await this.prismaClient.userAccessLog.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(deleted);
  }

  public mapToEntity(log: any): UserAccessLog {
    if (!log) {
      return null;
    }

    return {
      id: log.id,
      ip_address: log.ip_address,
      created_at: log.created_at,
      user: log.user,
      user_id: log.user_id,
    };
  }
}
