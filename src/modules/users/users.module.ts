import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { ChaptersModule } from '@modules/chapters/chapters.module';
import { JwtModule } from '@modules/jwt/jwt.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, JwtModule, ChaptersModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
