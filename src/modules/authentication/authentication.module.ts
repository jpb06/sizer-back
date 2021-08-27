import { Module } from '@nestjs/common';

import { GoogleAuthModule } from '@modules/google-auth/google-auth.module';
import { JwtModule } from '@modules/jwt/jwt.module';
import { UsersModule } from '@modules/users/users.module';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [UsersModule, GoogleAuthModule, JwtModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
