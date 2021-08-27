import { Module } from '@nestjs/common';

import { AppKeysModule } from '@modules/app-keys/app-keys.module';

import { CacheService } from './cache.service';

@Module({
  imports: [AppKeysModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
