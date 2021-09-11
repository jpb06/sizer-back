-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "Chapter" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isClosed" BOOLEAN NOT NULL,
    "closedAt" TIMESTAMP(3) NOT NULL,
    "answer" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectDiscussion" (
    "id" SERIAL NOT NULL,
    "Subject" INTEGER NOT NULL,
    "User" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD FOREIGN KEY ("Chapter") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectDiscussion" ADD FOREIGN KEY ("Subject") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
