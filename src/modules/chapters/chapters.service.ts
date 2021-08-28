import { Injectable } from '@nestjs/common';
import { Chapter } from '@prisma/client';

import { DatabaseService } from '@database/database.service';

@Injectable()
export class ChaptersService {
  constructor(private readonly db: DatabaseService) {}

  async getBy(idUser: number): Promise<Array<Chapter>> {
    const chapters = await this.db.chapter.findMany({
      where: {
        chapterMembers: {
          every: {
            idUser: idUser,
          },
        },
      },
    });

    return chapters;
  }
}
