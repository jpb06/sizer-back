import { PrismaClient } from '@prisma/client';

export const mockedPrismaDisconnect = (): jest.SpyInstance<
  unknown,
  unknown[]
> =>
  jest
    .spyOn(PrismaClient.prototype, '$disconnect')
    .mockImplementationOnce(async () => {});
