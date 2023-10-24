/*
  Warnings:

  - The primary key for the `dislikes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `dislikes` table. All the data in the column will be lost.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `likes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "dislikes_id_key";

-- DropIndex
DROP INDEX "likes_id_key";

-- AlterTable
ALTER TABLE "dislikes" DROP CONSTRAINT "dislikes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "dislikes_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("userId");
