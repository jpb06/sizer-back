import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

import { CacheService } from '@modules/cache/cache.service';

@Injectable()
export class JwtService {
  constructor(private readonly cacheService: CacheService) {}

  async sign(user: User): Promise<string> {
    const keys = await this.cacheService.getAppKeys();
    const token = jwt.sign(
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        locale: user.locale,
        pictureUrl: user.pictureUrl,
      },
      keys.privateKey,
      {
        algorithm: 'RS256',
        expiresIn: '30m',
      },
    );

    return token;
  }
}
