import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { AppKeysService } from './app-keys.service';

@Module({
  imports: [DatabaseModule],
  providers: [AppKeysService],
  exports: [AppKeysService],
})
export class AppKeysModule {}
