import { Prisma } from '@prisma/client';

export const selectSubject = <T extends Prisma.SubjectSelect>(
  select: Prisma.Subset<T, Prisma.SubjectSelect>,
): T => {
  return select;
};
