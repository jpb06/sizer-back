import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChaptersService {
  constructor(private readonly db: PrismaService) {}

  async getAll() {
    const data = await this.db.chapter.findMany({
      select: {
        id: true,
        name: true,
        members: {
          select: {
            idUser: true,
            user: { select: { fullName: true, email: true, pictureUrl: true } },
            role: true,
          },
        },
      },
    });

    return data.map((c) => ({
      id: c.id,
      name: c.name,
      members: c.members.map((m) => ({
        idUser: m.idUser,
        role: m.role,
        fullName: m.user?.fullName,
        email: m.user?.email,
        pictureUrl: m.user?.pictureUrl,
      })),
    }));
  }

  async getBy(idUser: number) {
    const chapters = await this.getAll();

    return chapters.filter((c) => c.members.some((m) => m.idUser === idUser));
  }
}
