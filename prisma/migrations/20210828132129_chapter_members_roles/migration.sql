/*
  Warnings:

  - Added the required column `role` to the `ChapterMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChapterMember" ADD COLUMN     "role" TEXT NOT NULL;
