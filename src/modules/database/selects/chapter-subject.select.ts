import { selectSubject } from '../prisma/helpers/subject.selector';

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
      idUser: true,
      comment: true,
      link: true,
      createdAt: true,
      user: { select: { fullName: true, email: true } },
    },
  },
});
