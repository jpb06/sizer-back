import { Subject } from '@prisma/client';

export const subjectsMockData: Array<
  Subject & {
    chapter: { id: number; name: string };
    discussion: [
      {
        id: number;
        idUser: number;
        comment: string;
        link: string;
        createdAt: Date;
        user: {
          fullName: string;
          email: string;
        };
      },
    ];
  }
> = [
  {
    id: 1,
    idChapter: 1,
    title: 'Cool',
    details: 'This is cool',
    createdAt: new Date(),
    link: null,
    answer: null,
    closedAt: null,
    chapter: {
      id: 1,
      name: 'Coolest chapter',
    },
    discussion: [
      {
        id: 1,
        idUser: 1,
        comment: 'Yolo',
        link: 'https://cool.org',
        createdAt: new Date(),
        user: { fullName: 'Yolo McCool', email: 'yolo@mccool.org' },
      },
    ],
  },
];
