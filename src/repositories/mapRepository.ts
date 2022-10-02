import { prisma } from "../database/database";
import { UserMapsData } from "../types/userMapTypes";

async function findByUserId(userId: number) {
  return prisma.userMaps.findMany({
    where: { userId },
  });
}

async function createUserMap(userId: number) {
  const states = await prisma.states.findMany();

  await prisma.$transaction(
    states.map((cur, index) =>
      prisma.userMaps.create({
        data: {
          userId: userId,
          uf: cur.uf,
          name: cur.name,
          path: cur.path,
          status: cur.status,
        },
      })
    )
  );
}

export { createUserMap, findByUserId };
