import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@business/authentication/authentication.module';
import { DatabaseModule } from '@database/database.module';

import { ChapterController } from './chapter.controller';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [ChapterController],
})
export class ChapterModule {}
