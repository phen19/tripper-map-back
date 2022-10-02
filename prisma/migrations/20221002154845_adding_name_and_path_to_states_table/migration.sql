/*
  Warnings:

  - Added the required column `name` to the `UserMaps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `UserMaps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `states` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `states` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMaps" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "states" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
