import { Injectable } from '@nestjs/common';

import { NewSubjectDto } from '@business/subject/dto/input/new-subject.body.dto';
import { chapterSubjectSelect } from '@database/selects/chapter-subject.select';

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
      select: chapterSubjectSelect,
    });
  }

  async getByUser(idUser: number) {
    return this.db.subject.findMany({
      where: {
        chapter: { members: { some: { idUser } } },
      },
      select: chapterSubjectSelect,
    });
  }
}
