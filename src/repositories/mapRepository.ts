import { prisma } from "../database/database";
import { UserMapsData } from "../types/userMapTypes";

async function findByUserId(userId: number) {
  console.log(userId);
  return prisma.userMaps.findMany({
    where: { userId: userId },
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

async function updateMap(userId: number, userMaps: UserMapsData[]) {
  await prisma.$transaction(
    userMaps.map((cur, index) =>
      prisma.userMaps.update({
        where: {
          userId_uf: {
            userId: userId,
            uf: cur.uf,
          },
        },
        data: {
          status: cur.status,
        },
      })
    )
  );
}

export { createUserMap, findByUserId, updateMap };
