import { selectChapter } from '@database/prisma/helpers/chapter.selector';

import { Chapter } from '.prisma/client';

export type ChapterSelectType = Partial<Chapter> & {
  members: Array<{
    idUser: number;
    user: {
      fullName: string | null;
      email: string | null;
      pictureUrl: string | null;
    } | null;
    role: string;
  }>;
};

export const chapterSelect = selectChapter({
  id: true,
  name: true,
  members: {
    select: {
      idUser: true,
      user: { select: { fullName: true, email: true, pictureUrl: true } },
      role: true,
    },
  },
});
