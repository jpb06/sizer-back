import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, Subject } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';

import { PrismaService } from '@database/prisma/prisma.service';
import {
  appKeysMockData,
  privateKeyMockData,
} from '@tests/data/app-keys.mock-data';
import { createdSubjectMockData } from '@tests/data/created-subject.mock-data';
import { tokenPayloadMockData } from '@tests/data/token-payload.mock-data';

import { AppModule } from '../../app.module';

describe('SubjectController (e2e)', () => {
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

  describe('POST /subject', () => {
    it('should return unauthorized if no token is provided', () => {
      return request(app.getHttpServer()).post('/subject').send().expect(401, {
        statusCode: 401,
        message: 'Unauthorized',
      });
    });

    it('should return unauthorized if provided token is invalid', () => {
      return request(app.getHttpServer())
        .post('/subject')
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

      dbMock.subject.create.mockImplementation(() => {
        throw new Error();
      });

      return request(app.getHttpServer())
        .post('/subject')
        .set({ Authorization: `Bearer ${token}` })
        .send()
        .expect(500, {
          statusCode: 500,
          message: 'Internal server error',
        });
    });

    it('should create a subject', () => {
      dbMock.appKeys.findFirst.mockResolvedValueOnce(appKeysMockData);
      const token = jwt.sign(tokenPayloadMockData, privateKeyMockData, {
        algorithm: 'RS256',
      });

      dbMock.subject.create.mockResolvedValueOnce(
        createdSubjectMockData as unknown as Subject,
      );

      return request(app.getHttpServer())
        .post('/subject')
        .set({ Authorization: `Bearer ${token}` })
        .send()
        .expect(201)
        .then((res) => {
          expect(res.body).toStrictEqual({
            data: {
              id: createdSubjectMockData.id,
              chapter: createdSubjectMockData.chapter,
              title: createdSubjectMockData.title,
              answer: createdSubjectMockData.answer,
              link: createdSubjectMockData.link,
              details: createdSubjectMockData.details,
              createdAt: createdSubjectMockData.createdAt?.toISOString(),
              closedAt: createdSubjectMockData.closedAt
                ? createdSubjectMockData.closedAt.toISOString()
                : null,
            },
          });
        });
    });
  });
});
