import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { TokenPayload } from 'google-auth-library';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async findOne(userIdentifier: string): Promise<User | null> {
    const user = await this.db.user.findFirst({
      where: {
        userIdentifier,
      },
    });

    return user;
  }

  async create(user: TokenPayload): Promise<User> {
    return this.db.user.create({
      data: {
        issuerIdentifier: user.iss,
        accessTokenHash: user.at_hash,
        userIdentifier: user.sub,
        authorizedPresenter: user.azp,
        isEmailVerified: user.email_verified,
        email: user.email,
        profileUrl: user.profile,
        pictureUrl: user.picture,
        fullName: user.name,
        givenName: user.given_name,
        familyName: user.family_name,
        audience: user.aud,
        issuedAt: user.iat,
        expires: user.exp,
        nonce: user.nonce,
        hostedGSuiteDomain: user.hd,
        locale: user.locale,
      },
    });
  }

  async findOrCreate(payload: TokenPayload): Promise<User> {
    const user = await this.findOne(payload.sub);

    if (!user) {
      return this.create(payload);
    }

    return user;
  }
}
