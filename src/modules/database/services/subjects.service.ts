import { Injectable } from '@nestjs/common';

import { NewSubjectDto } from '@business/subject/dto/input/new-subject.body.dto';
import { chapterSubjectQuery } from '@database/queries/chapter-subject.query';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly db: PrismaService) {}

  async create(newSubject: NewSubjectDto) {
    const createdSubject = await this.db.subject.create({
      data: newSubject,
      include: {
        chapter: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return createdSubject;
  }

  async getByChapter(idChapter: number) {
    return this.db.subject.findMany({
      where: {
        idChapter,
      },
      select: chapterSubjectQuery,
    });
  }

  async getByUser(idUser: number) {
    return this.db.subject.findMany({
      where: {
        chapter: { members: { some: { idUser } } },
      },
      select: chapterSubjectQuery,
    });
  }
}
