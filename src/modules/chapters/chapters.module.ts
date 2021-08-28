import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { ChaptersService } from './chapters.service';

@Module({
  imports: [DatabaseModule],
  providers: [ChaptersService],
  exports: [ChaptersService],
})
export class ChaptersModule {}
