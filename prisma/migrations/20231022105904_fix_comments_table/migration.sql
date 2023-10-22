/*
  Warnings:

  - You are about to drop the column `file` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "file",
ADD COLUMN     "fileUrl" TEXT;
