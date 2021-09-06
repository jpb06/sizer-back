import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv-flow';
dotenv.config();

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      createdAt: '2021-08-29T08:55:42.834Z',
      issuerIdentifier: 'accounts.google.com',
      accessTokenHash: 'yolo',
      userIdentifier: process.env.ACCOUNT1_SUB || 'ACCOUNT1_SUB',
      authorizedPresenter: 'sizer.apps.googleusercontent.com',
      isEmailVerified: true,
      email: 'j*********@gmail.com',
      profileUrl: null,
      pictureUrl:
        'https://lh3.googleusercontent.com/a/AATXAJxsq-EKfFChzFHmzL26xeqonbP6-rs9LvfyyfEB=s96-c',
      fullName: 'J*****************',
      givenName: 'J************',
      familyName: 'B***',
      audience: 'sizer.apps.googleusercontent.com',
      issuedAt: 1630234539,
      expires: 1630238139,
      nonce: null,
      hostedGSuiteDomain: null,
      locale: 'fr',
    },
  });

  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      createdAt: '2021-08-29T08:53:35.430Z',
      issuerIdentifier: 'accounts.google.com',
      accessTokenHash: 'cool',
      userIdentifier: process.env.ACCOUNT2_SUB || 'ACCOUNT2_SUB',
      authorizedPresenter: 'sizer.apps.googleusercontent.com',
      isEmailVerified: true,
      email: 'y*****@gmail.com',
      profileUrl: null,
      pictureUrl:
        'https://lh3.googleusercontent.com/a/AATXAJyI_ZDTh12_g3QPVrxMypa8C0gZM-VputJ-SS1i=s96-c',
      fullName: 'n*****',
      givenName: 'n**',
      familyName: 'y**',
      audience: 'sizer.apps.googleusercontent.com',
      issuedAt: 1630234411,
      expires: 1630238011,
      nonce: null,
      hostedGSuiteDomain: null,
      locale: 'fr',
    },
  });

  await prisma.chapter.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Quality',
    },
  });

  await prisma.chapter.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Frontend',
    },
  });

  await prisma.chapter.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Backend',
    },
  });

  await prisma.chapterMember.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idChapter: 1,
      idUser: 1,
      role: 'Owner',
    },
  });
  await prisma.chapterMember.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idChapter: 1,
      idUser: 2,
      role: 'Member',
    },
  });
  await prisma.chapterMember.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idChapter: 2,
      idUser: 1,
      role: 'Owner',
    },
  });
  await prisma.chapterMember.upsert({
    where: { id: 4 },
    update: {},
    create: {
      idChapter: 3,
      idUser: 1,
      role: 'Owner',
    },
  });

  await prisma.subject.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idChapter: 1,
      title: 'Cool subject',
      details: 'So cool',
      link: 'https://cool.org',
      createdAt: new Date(),
    },
  });
  await prisma.subjectDiscussion.upsert({
    where: { id: 1 },
    update: {},
    create: {
      idUser: 1,
      idSubject: 1,
      comment: 'I like this very much',
      createdAt: new Date(),
    },
  });
  await prisma.subjectDiscussion.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idUser: 2,
      idSubject: 1,
      comment: "Yeah nah yeah; we're cool",
      link: 'https://so-cool.org',
      createdAt: new Date(),
    },
  });

  await prisma.subject.upsert({
    where: { id: 2 },
    update: {},
    create: {
      idChapter: 1,
      title: 'Awesome subject',
      details: 'This is awesome dude',
      createdAt: new Date(),
    },
  });

  await prisma.subject.upsert({
    where: { id: 3 },
    update: {},
    create: {
      idChapter: 1,
      title: 'About time we do this...',
      details: 'What are we waiting for?',
      createdAt: new Date(),
      closedAt: new Date(),
    },
  });
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
