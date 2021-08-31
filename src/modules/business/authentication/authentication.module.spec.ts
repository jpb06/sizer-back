import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';

import { PrismaService } from '@database/prisma/prisma.service';
import { appKeysMockData } from '@tests/data/app-keys.mock-data';
import { dbaseUserMockData } from '@tests/data/dbase-user.mock-data';
import { googleAuthTokenPayloadMockData } from '@tests/data/google-auth-token-payload.mock-data';
import { tokenPayloadMockData } from '@tests/data/token-payload.mock-data';
import { mockOAuth2ClientVerifyIdToken } from '@tests/mock-implementations/mock-oauth2client-verifyidtoken';

import { AuthenticationModule } from './authentication.module';

jest.mock('google-auth-library');

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  const dbMock = mockDeep<PrismaClient>();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthenticationModule],
    })
      .overrideProvider(PrismaService)
      .useValue(dbMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('POST /authentication/login', () => {
    it('should return unauthorized if provided token is invalid', (done) => {
      mockOAuth2ClientVerifyIdToken(undefined);

      request(app.getHttpServer())
        .post('/authentication/login')
        .send({ token: 'cool' })
        .expect(401, {
          statusCode: 401,
          message: 'Unauthorized',
        })
        .then(() => {
          done();
        });
    });

    it('should return internal server error if something silly happens', (done) => {
      mockOAuth2ClientVerifyIdToken(googleAuthTokenPayloadMockData);
      dbMock.user.findFirst.mockImplementation(() => {
        throw new Error();
      });

      request(app.getHttpServer())
        .post('/authentication/login')
        .send({ token: 'cool' })
        .expect(500, {
          statusCode: 500,
          message: 'Internal server error',
        })
        .then(() => {
          done();
        });
    });

    it('should return an app token signed with an existing key for an existing user', (done) => {
      mockOAuth2ClientVerifyIdToken(googleAuthTokenPayloadMockData);
      dbMock.user.findFirst.mockResolvedValueOnce(dbaseUserMockData);
      dbMock.appKeys.findFirst.mockResolvedValueOnce(appKeysMockData);

      request(app.getHttpServer())
        .post('/authentication/login')
        .send({ token: 'cool' })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
            }),
          );
          const decoded = jwt.decode(res.body.token);
          expect(res.body.token.split('.')).toHaveLength(3);
          expect(decoded).toMatchObject(tokenPayloadMockData);
          done();
        });
    });

    it('should return an app token signed with an existing key for a new user', (done) => {
      mockOAuth2ClientVerifyIdToken(googleAuthTokenPayloadMockData);
      dbMock.user.findFirst.mockResolvedValueOnce(null);
      dbMock.user.create.mockResolvedValueOnce(dbaseUserMockData);
      dbMock.appKeys.findFirst.mockResolvedValueOnce(appKeysMockData);

      request(app.getHttpServer())
        .post('/authentication/login')
        .send({ token: 'cool' })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
            }),
          );
          const decoded = jwt.decode(res.body.token);
          expect(res.body.token.split('.')).toHaveLength(3);
          expect(decoded).toMatchObject(tokenPayloadMockData);
          done();
        });
    });

    it('should return an app token signed with a new key', (done) => {
      mockOAuth2ClientVerifyIdToken(googleAuthTokenPayloadMockData);
      dbMock.user.findFirst.mockResolvedValueOnce(dbaseUserMockData);
      dbMock.appKeys.findFirst.mockResolvedValueOnce(null);
      dbMock.appKeys.create.mockResolvedValueOnce(appKeysMockData);

      request(app.getHttpServer())
        .post('/authentication/login')
        .send({ token: 'cool' })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
            }),
          );
          const decoded = jwt.decode(res.body.token);
          expect(res.body.token.split('.')).toHaveLength(3);
          expect(decoded).toMatchObject(tokenPayloadMockData);
          done();
        });
    });

    it('should use the cache to provide the current app keys for token signing', async () => {
      mockOAuth2ClientVerifyIdToken(googleAuthTokenPayloadMockData);
      dbMock.user.findFirst.mockResolvedValue(null);
      dbMock.user.create.mockResolvedValue(dbaseUserMockData);
      dbMock.appKeys.findFirst.mockResolvedValueOnce(null);
      dbMock.appKeys.create.mockResolvedValueOnce(appKeysMockData);

      await request(app.getHttpServer())
        .post('/authentication/login')
        .send({ token: 'cool' })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
            }),
          );
          const decoded = jwt.decode(res.body.token);
          expect(res.body.token.split('.')).toHaveLength(3);
          expect(decoded).toMatchObject(tokenPayloadMockData);
        });

      return request(app.getHttpServer())
        .post('/authentication/login')
        .send({ token: 'cool' })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
            }),
          );
          const decoded = jwt.decode(res.body.token);
          expect(res.body.token.split('.')).toHaveLength(3);
          expect(decoded).toMatchObject(tokenPayloadMockData);
        });
    });
  });
});
