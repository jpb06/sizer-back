import { Chapter } from '@prisma/client';

export const chaptersWithMembersMockData = [
  {
    id: 1,
    name: 'Cool chapter',
    chapterMembers: [
      {
        idUser: 1,
        user: { fullName: 'McBro', email: 'mcbro@cool.org' },
        role: 'Owner',
      },
      {
        idUser: 2,
        user: { fullName: 'Awesome lad', email: 'a.lad@cool.org' },
        role: 'Member',
      },
    ],
  },
  {
    id: 2,
    name: 'Great chapter',
    chapterMembers: [
      {
        idUser: 1,
        user: { fullName: 'Nice girl', email: 'n.girl@cool.org' },
        role: 'Owner',
      },
    ],
  },
] as unknown as Array<Chapter>;
