import { Injectable } from '@nestjs/common';
import { AppKeys } from '@prisma/client';
import { subDays } from 'date-fns';
import NodeRSA from 'node-rsa';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppKeysService {
  constructor(private readonly db: PrismaService) {}

  async GetCurrentAppKeys(): Promise<AppKeys> {
    const appKeys = await this.db.appKeys.findFirst({
      orderBy: {
        generationDate: 'desc',
      },
      where: {
        generationDate: {
          gte: subDays(new Date(), 90),
        },
      },
    });

    if (!appKeys) {
      const newKeyPair = await this.generateKeyPair();
      const keys = await this.db.appKeys.create({
        data: newKeyPair,
      });
      return keys;
    }

    return appKeys;
  }

  private async generateKeyPair(): Promise<Omit<AppKeys, 'id'>> {
    const key = new NodeRSA();

    key.generateKeyPair(2048, 65537);

    const publicKey = key.exportKey('pkcs1-public-pem');
    const privateKey = key.exportKey('pkcs1-private-pem');

    return { publicKey, privateKey, generationDate: new Date() };
  }
}
