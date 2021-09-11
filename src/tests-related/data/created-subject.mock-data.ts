import { Chapter, Subject } from '.prisma/client';

export const createdSubjectMockData: Partial<Subject> & {
  chapter: Chapter;
} = {
  id: 1,
  idChapter: 1,
  title: 'Cool',
  details: 'Yolo mah man',
  link: 'https://yolo.org',
  createdAt: new Date(),
  closedAt: null,
  answer: null,
  chapter: {
    id: 1,
    name: 'Cool chapter',
  },
};
