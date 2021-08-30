export type JwtPayload = {
  id: number;
  email: string;
  fullName: string;
  pictureUrl: string;
  locale: string;
  exp: number;
  iat: number;
};
