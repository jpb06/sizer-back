import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AppKeysService } from './services/app-keys.service';
import { ChaptersService } from './services/chapters.service';
import { SubjectsService } from './services/subjects.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  providers: [ChaptersService, UsersService, AppKeysService, SubjectsService],
  exports: [ChaptersService, UsersService, AppKeysService, SubjectsService],
})
export class DatabaseModule {}
