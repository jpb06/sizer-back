import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AppKeysService } from './services/app-keys.service';
import { ChaptersService } from './services/chapters.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  providers: [ChaptersService, UsersService, AppKeysService],
  exports: [ChaptersService, UsersService, AppKeysService],
})
export class DatabaseModule {}
