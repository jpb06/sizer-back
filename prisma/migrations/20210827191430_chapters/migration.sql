-- CreateTable
CREATE TABLE "ChapterMember" (
    "id" SERIAL NOT NULL,
    "User" INTEGER NOT NULL,
    "Chapter" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChapterMember" ADD FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterMember" ADD FOREIGN KEY ("Chapter") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
