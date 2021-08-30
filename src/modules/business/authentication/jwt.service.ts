import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

import { CacheService } from './cache.service';
import { JwtPayload } from './types/jwt-payload.type';

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
        expiresIn: '24h',
      },
    );

    return token;
  }

  async verify(token: string): Promise<JwtPayload | undefined> {
    const keys = await this.cacheService.getAppKeys();

    try {
      const payload = jwt.verify(token, keys.publicKey, {
        algorithms: ['RS256'],
        ignoreExpiration: false,
      });

      return payload as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token) as JwtPayload;
  }
}
