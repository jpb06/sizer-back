import { Injectable } from '@nestjs/common';

import { UsersService } from '@database/services/users.service';

import { GoogleAuthService } from './google-auth.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(token: string): Promise<string> {
    const payload = await this.googleAuthService.validate(token);
    const user = await this.userService.findOrCreate(payload);
    const appToken = await this.jwtService.sign(user);

    return appToken;
  }
}
