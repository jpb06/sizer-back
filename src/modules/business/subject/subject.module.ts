import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@business/authentication/authentication.module';
import { DatabaseModule } from '@database/database.module';

import { SubjectController } from './subject.controller';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [SubjectController],
})
export class SubjectModule {}
