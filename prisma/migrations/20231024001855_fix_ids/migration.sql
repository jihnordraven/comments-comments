/*
  Warnings:

  - The primary key for the `dislikes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `dislikes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `dislikes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "dislikes" DROP CONSTRAINT "dislikes_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "dislikes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "dislikes_id_key" ON "dislikes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_id_key" ON "likes"("id");
