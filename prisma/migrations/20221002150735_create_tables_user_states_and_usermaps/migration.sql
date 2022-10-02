-- CreateEnum
CREATE TYPE "Status" AS ENUM ('gone', 'wishlist', 'available');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" SERIAL NOT NULL,
    "uf" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMaps" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "UserMaps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "states_uf_key" ON "states"("uf");

-- AddForeignKey
ALTER TABLE "UserMaps" ADD CONSTRAINT "UserMaps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
