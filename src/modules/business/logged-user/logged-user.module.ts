import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@business/authentication/authentication.module';
import { DatabaseModule } from '@database/database.module';

import { LoggedUserController } from './logged-user.controller';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [LoggedUserController],
})
export class LoggedUserModule {}
