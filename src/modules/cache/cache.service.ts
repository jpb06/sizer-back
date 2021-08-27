import { Injectable } from '@nestjs/common';
import { AppKeys } from '@prisma/client';

import { AppKeysService } from '@modules/app-keys/app-keys.service';

@Injectable()
export class CacheService {
  private appKeys: AppKeys;

  constructor(private readonly appKeysService: AppKeysService) {}

  async getAppKeys(): Promise<AppKeys> {
    if (!this.appKeys) {
      this.appKeys = await this.appKeysService.GetCurrentAppKeys();
    }

    return this.appKeys;
  }
}
