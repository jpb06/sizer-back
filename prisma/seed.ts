import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      createdAt: '2021-08-29T08:55:42.834Z',
      issuerIdentifier: 'accounts.google.com',
      accessTokenHash: 'yolo',
      userIdentifier: '123',
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
      id: 2,
      createdAt: '2021-08-29T08:53:35.430Z',
      issuerIdentifier: 'accounts.google.com',
      accessTokenHash: 'cool',
      userIdentifier: '124',
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
      id: 1,
      name: 'Quality',
    },
  });

  await prisma.chapter.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Frontend',
    },
  });

  await prisma.chapter.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Backend',
    },
  });

  await prisma.chapterMember.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      idChapter: 1,
      idUser: 1,
      role: 'Owner',
    },
  });
  await prisma.chapterMember.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      idChapter: 1,
      idUser: 2,
      role: 'Member',
    },
  });
  await prisma.chapterMember.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      idChapter: 2,
      idUser: 1,
      role: 'Owner',
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
