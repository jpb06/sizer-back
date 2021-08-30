import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

import { LoggedUserRequest } from '@business/authentication/types/logged-user-request.interface';

import { JwtService } from '../jwt.service';

@Injectable()
export class LoggedUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: LoggedUserRequest, res: Response, next: NextFunction) {
    if (req.headers.authorization?.startsWith('Bearer ')) {
      const payload = this.jwtService.decode(
        req.headers.authorization.split(' ')[1],
      );
      req.loggedUser = payload;
    }

    next();
  }
}
