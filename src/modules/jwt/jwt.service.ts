import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import * as jwt from 'jsonwebtoken';

import { CacheService } from '@modules/cache/cache.service';
import { JwtPayloadDto } from '@modules/jwt/dto/jwt.payload.dto';

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

  async verify(token: string): Promise<JwtPayloadDto | undefined> {
    const keys = await this.cacheService.getAppKeys();

    try {
      const payload = jwt.verify(token, keys.publicKey, {
        algorithms: ['RS256'],
        ignoreExpiration: false,
      });

      return plainToClass(JwtPayloadDto, payload);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
