/*
  Warnings:

  - A unique constraint covering the columns `[userId,uf]` on the table `UserMaps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserMaps_userId_uf_key" ON "UserMaps"("userId", "uf");
