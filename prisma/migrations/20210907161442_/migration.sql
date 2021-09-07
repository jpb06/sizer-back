-- DropForeignKey
ALTER TABLE "ChapterMember" DROP CONSTRAINT "ChapterMember_Chapter_fkey";

-- DropForeignKey
ALTER TABLE "ChapterMember" DROP CONSTRAINT "ChapterMember_User_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_Chapter_fkey";

-- DropForeignKey
ALTER TABLE "SubjectDiscussion" DROP CONSTRAINT "SubjectDiscussion_Subject_fkey";

-- DropForeignKey
ALTER TABLE "SubjectDiscussion" DROP CONSTRAINT "SubjectDiscussion_User_fkey";

-- AddForeignKey
ALTER TABLE "ChapterMember" ADD CONSTRAINT "ChapterMember_User_fkey" FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterMember" ADD CONSTRAINT "ChapterMember_Chapter_fkey" FOREIGN KEY ("Chapter") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_Chapter_fkey" FOREIGN KEY ("Chapter") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectDiscussion" ADD CONSTRAINT "SubjectDiscussion_Subject_fkey" FOREIGN KEY ("Subject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectDiscussion" ADD CONSTRAINT "SubjectDiscussion_User_fkey" FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
