import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';

import { PrismaService } from '@database/prisma/prisma.service';
import {
  appKeysMockData,
  privateKeyMockData,
} from '@tests/data/app-keys.mock-data';
import { chaptersWithMembersMockData } from '@tests/data/chapters-with-members.mock-data';
import { tokenPayloadMockData } from '@tests/data/token-payload.mock-data';

import { AppModule } from '../../app.module';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  const dbMock = mockDeep<PrismaClient>();

  beforeAll(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(dbMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('POST /logged-user/chapters', () => {
    it('should return unauthorized if no token is provided', async () => {
      return request(app.getHttpServer())
        .get('/logged-user/chapters')
        .send()
        .expect(401, {
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('should return unauthorized if provided token is invalid', async () => {
      return request(app.getHttpServer())
        .get('/logged-user/chapters')
        .set({ Authorization: 'Bearer token' })
        .send()
        .expect(401, {
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('should return internal server error if something silly happens', async () => {
      dbMock.appKeys.findFirst.mockResolvedValueOnce(appKeysMockData);
      const token = jwt.sign(tokenPayloadMockData, privateKeyMockData, {
        algorithm: 'RS256',
      });

      dbMock.chapter.findMany.mockImplementation(() => {
        throw new Error();
      });

      return request(app.getHttpServer())
        .get('/logged-user/chapters')
        .set({ Authorization: `Bearer ${token}` })
        .send()
        .expect(500, {
          statusCode: 500,
          message: 'Internal server error',
        });
    });

    it('should return chapters', () => {
      dbMock.appKeys.findFirst.mockResolvedValueOnce(appKeysMockData);
      const token = jwt.sign(tokenPayloadMockData, privateKeyMockData, {
        algorithm: 'RS256',
      });

      dbMock.chapter.findMany.mockResolvedValueOnce(
        chaptersWithMembersMockData,
      );

      return request(app.getHttpServer())
        .get('/logged-user/chapters')
        .set({ Authorization: `Bearer ${token}` })
        .send()
        .expect(200);
    });
  });
});