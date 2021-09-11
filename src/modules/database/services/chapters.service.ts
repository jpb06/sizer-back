import { Injectable } from '@nestjs/common';

import {
  chapterSelect,
  ChapterSelectType,
} from '@database/selects/chapter.select';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChaptersService {
  constructor(private readonly db: PrismaService) {}

  async getAll(): Promise<Array<ChapterSelectType>> {
    return this.db.chapter.findMany({
      select: chapterSelect,
    });
  }

  async getBy(idUser: number): Promise<Array<ChapterSelectType>> {
    const chapters = await this.getAll();

    return chapters.filter((c) => c.members.some((m) => m.idUser === idUser));
  }
}
