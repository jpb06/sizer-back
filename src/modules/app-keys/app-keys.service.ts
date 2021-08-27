import { Injectable } from '@nestjs/common';
import { AppKeys } from '@prisma/client';
import { subDays } from 'date-fns';
import NodeRSA from 'node-rsa';

import { DatabaseService } from '@modules/database/database.service';

@Injectable()
export class AppKeysService {
  constructor(private readonly databaseService: DatabaseService) {}

  async GetCurrentAppKeys(): Promise<AppKeys> {
    const appKeys = await this.databaseService.appKeys.findFirst({
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
      const keys = await this.databaseService.appKeys.create({
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
