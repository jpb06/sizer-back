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
      accessTokenHash: 'b-_B44yhp7K84jEpSpBX7g',
      userIdentifier: '112311792581323590633',
      authorizedPresenter:
        '1051087325628-50hoc9s4bi3aqoa1ss6n7l4s9qs9l5iq.apps.googleusercontent.com',
      isEmailVerified: true,
      email: 'jp.bois.06@gmail.com',
      profileUrl: null,
      pictureUrl:
        'https://lh3.googleusercontent.com/a/AATXAJxsq-EKfFChzFHmzL26xeqonbP6-rs9LvfyyfEB=s96-c',
      fullName: 'Jean-Philippe Bois',
      givenName: 'Jean-Philippe',
      familyName: 'Bois',
      audience:
        '1051087325628-50hoc9s4bi3aqoa1ss6n7l4s9qs9l5iq.apps.googleusercontent.com',
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
      accessTokenHash: 'eW0bhJw6jpOeEQhTh0LSOw',
      userIdentifier: '103077023134274268306',
      authorizedPresenter:
        '1051087325628-50hoc9s4bi3aqoa1ss6n7l4s9qs9l5iq.apps.googleusercontent.com',
      isEmailVerified: true,
      email: 'yaosrv@gmail.com',
      profileUrl: null,
      pictureUrl:
        'https://lh3.googleusercontent.com/a/AATXAJyI_ZDTh12_g3QPVrxMypa8C0gZM-VputJ-SS1i=s96-c',
      fullName: 'na yao',
      givenName: 'na',
      familyName: 'yao',
      audience:
        '1051087325628-50hoc9s4bi3aqoa1ss6n7l4s9qs9l5iq.apps.googleusercontent.com',
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
