import { prisma } from "../database/database";

export async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE "UserMaps" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
}
