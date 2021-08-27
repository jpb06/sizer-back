import { Injectable } from '@nestjs/common';

import { GoogleAuthService } from '@modules/google-auth/google-auth.service';
import { JwtService } from '@modules/jwt/jwt.service';
import { UsersService } from '@modules/users/users.service';

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
