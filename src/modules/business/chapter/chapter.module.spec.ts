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
import { subjectsMockData } from '@tests/data/subjects.mock-data';
import { tokenPayloadMockData } from '@tests/data/token-payload.mock-data';

import { AppModule } from './../../app.module';

describe('ChapterController (e2e)', () => {
  let app: INestApplication;
  const dbMock = mockDeep<PrismaClient>();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(dbMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /chapter/:id/subjects', () => {
    it('should return unauthorized if no token is provided', () => {
      return request(app.getHttpServer())
        .get('/chapter/1/subjects')
        .send()
        .expect(401, {
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('should return unauthorized if provided token is invalid', () => {
      return request(app.getHttpServer())
        .get('/chapter/1/subjects')
        .set({ Authorization: 'Bearer token' })
        .send()
        .expect(401, {
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('should return internal server error if something silly happens', () => {
      dbMock.appKeys.findFirst.mockResolvedValueOnce(appKeysMockData);
      const token = jwt.sign(tokenPayloadMockData, privateKeyMockData, {
        algorithm: 'RS256',
      });

      dbMock.subject.findMany.mockImplementation(() => {
        throw new Error();
      });

      return request(app.getHttpServer())
        .get('/chapter/1/subjects')
        .set({ Authorization: `Bearer ${token}` })
        .send()
        .expect(500, {
          statusCode: 500,
          message: 'Internal server error',
        });
    });

    it('should return subjects', () => {
      dbMock.appKeys.findFirst.mockResolvedValueOnce(appKeysMockData);
      const token = jwt.sign(tokenPayloadMockData, privateKeyMockData, {
        algorithm: 'RS256',
      });

      dbMock.subject.findMany.mockResolvedValueOnce(subjectsMockData);

      return request(app.getHttpServer())
        .get('/chapter/1/subjects')
        .set({ Authorization: `Bearer ${token}` })
        .send()
        .expect(200)
        .then((res) => {
          expect(res.body).toStrictEqual({
            data: subjectsMockData.map((el) => ({
              id: el.id,
              title: el.title,
              details: el.details,
              link: el.link,
              createdAt: el.createdAt.toISOString(),
              closedAt: el.closedAt,
              answer: el.answer,
              chapterId: el.chapter.id,
              chapterName: el.chapter.name,
              discussion: el.discussion.map((e) => ({
                id: e.id,
                idUser: e.idUser,
                userFullName: e.user?.fullName,
                userEmail: e.user?.email,
                comment: e.comment,
                link: e.link,
                createdAt: e.createdAt.toISOString(),
              })),
            })),
          });
        });
    });
  });
});
