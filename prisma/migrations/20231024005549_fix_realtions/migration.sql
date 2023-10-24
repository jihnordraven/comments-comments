-- DropForeignKey
ALTER TABLE "dislikes" DROP CONSTRAINT "dislikes_commentId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_commentId_fkey";

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dislikes" ADD CONSTRAINT "dislikes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
