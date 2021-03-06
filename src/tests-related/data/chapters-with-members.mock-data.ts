import { Chapter } from '@prisma/client';

export type ChapterWithMembers = {
  id: number;
  name: string;
  members: {
    user: {
      email: string | null;
      pictureUrl: string | null;
      fullName: string | null;
    } | null;
    idUser: number;
    role: string;
  }[];
}[];

export const chaptersWithMembersMockData = [
  {
    id: 1,
    name: 'Cool chapter',
    members: [
      {
        idUser: 1,
        user: {
          fullName: 'McBro',
          email: 'mcbro@cool.org',
          pictureUrl: 'https://cool.org/mcbro.jpg',
        },
        role: 'Owner',
      },
      {
        idUser: 2,
        user: {
          fullName: 'Awesome lad',
          email: 'a.lad@cool.org',
          pictureUrl: 'https://cool.org/alad.jpg',
        },
        role: 'Member',
      },
    ],
  },
  {
    id: 2,
    name: 'Great chapter',
    members: [
      {
        idUser: 1,
        user: {
          fullName: 'Nice girl',
          email: 'n.girl@cool.org',
          pictureUrl: 'https://cool.org/ngirl.jpg',
        },
        role: 'Owner',
      },
    ],
  },
] as unknown as Array<Chapter>;
