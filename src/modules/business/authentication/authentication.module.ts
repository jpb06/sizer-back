import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { CacheService } from './cache.service';
import { GoogleAuthService } from './google-auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from './jwt.service';
import { LoggedUserMiddleware } from './middlewares/logged-user.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    GoogleAuthService,
    CacheService,
    JwtService,
    JwtAuthGuard,
    LoggedUserMiddleware,
  ],
  exports: [LoggedUserMiddleware, JwtAuthGuard, JwtService],
})
export class AuthenticationModule {}
