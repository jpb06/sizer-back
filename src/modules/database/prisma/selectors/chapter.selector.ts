import { Prisma } from '@prisma/client';

export const selectChapter = <T extends Prisma.ChapterSelect>(
  select: Prisma.Subset<T, Prisma.ChapterSelect>,
): T => {
  return select;
};
