import { Test, TestingModule } from '@nestjs/testing';

import { mockedPrismaConnect } from '@tests/spies/prisma-connect.spy';
import { mockedPrismaDisconnect } from '@tests/spies/prisma-disconnect.spy';

import { PrismaService } from './prisma.service';

describe('Prisma service', () => {
  let service: PrismaService;
  let mockedConnect: jest.SpyInstance<unknown, unknown[]>;
  let mockedDisconnect: jest.SpyInstance<unknown, unknown[]>;

  beforeEach(async () => {
    mockedConnect = mockedPrismaConnect();
    mockedDisconnect = mockedPrismaDisconnect();

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    mockedConnect.mockRestore();
    mockedDisconnect.mockRestore();
  });

  it('should start and stop', async () => {
    expect(service).toBeDefined();
    await service.onModuleInit();
    await service.onModuleDestroy();

    expect(mockedConnect).toHaveBeenCalledTimes(1);
    expect(mockedDisconnect).toHaveBeenCalledTimes(1);
  });
});
