import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AppKeysService } from './services/app-keys.service';
import { ChaptersSubjectsService } from './services/chapters-subjects.service';
import { ChaptersService } from './services/chapters.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  providers: [
    ChaptersService,
    UsersService,
    AppKeysService,
    ChaptersSubjectsService,
  ],
  exports: [
    ChaptersService,
    UsersService,
    AppKeysService,
    ChaptersSubjectsService,
  ],
})
export class DatabaseModule {}
