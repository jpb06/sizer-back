import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  async validate(token: string): Promise<TokenPayload> {
    const clientId = process.env.GOOGLE_AUTH_CLIENTID;
    const client = new OAuth2Client(clientId);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
