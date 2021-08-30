import { Request } from 'express';

import { JwtPayload } from '@business/authentication/types/jwt-payload.type';

export interface LoggedUserRequest extends Request {
  loggedUser: JwtPayload;
}
