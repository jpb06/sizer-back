import { Chapter, Subject } from '@prisma/client';

import { selectSubject } from '../prisma/selectors/subject.selector';

export type ChapterSubjectSelectType = Partial<Subject> & {
  chapter: Chapter | null;
  discussion: Array<{
    id: number;
    comment: string;
    link: string | null;
    createdAt: Date;
    user: { id: number; fullName: string | null; email: string | null } | null;
  }>;
};

export const chapterSubjectSelect = selectSubject({
  id: true,
  title: true,
  details: true,
  answer: true,
  closedAt: true,
  createdAt: true,
  link: true,
  chapter: {
    select: { id: true, name: true },
  },
  discussion: {
    select: {
      id: true,
      comment: true,
      link: true,
      createdAt: true,
      user: { select: { id: true, fullName: true, email: true } },
    },
  },
});
