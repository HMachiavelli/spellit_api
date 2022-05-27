import prisma from "@/infra/db/client";

export default async (token: string, done: any) => {
  const userToken = await prisma.userAccessToken.findFirst({
    include: {
      user: true,
    },
    where: {
      token,
      expire_at: { gt: new Date() },
    },
  });

  if (!userToken) {
    return done(null, false);
  }

  return done(null, userToken.user);
};
