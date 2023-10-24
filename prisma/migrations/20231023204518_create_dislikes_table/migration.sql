-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "dislikesCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "dislikes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dislikes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dislikes_id_key" ON "dislikes"("id");

-- AddForeignKey
ALTER TABLE "dislikes" ADD CONSTRAINT "dislikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
