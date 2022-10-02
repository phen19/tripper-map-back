import { prisma } from "../database/database";
import { UserData } from "../types/userTypes";

async function findByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email },
  });
}

async function findById(userId: number) {
  return prisma.users.findFirst({
    where: { id: userId },
  });
}

async function createUser(UserData: UserData) {
  return prisma.users.create({
    data: UserData,
  });
}

export { findById, findByEmail, createUser };
