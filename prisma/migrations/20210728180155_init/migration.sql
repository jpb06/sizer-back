-- CreateTable
CREATE TABLE "AppKeys" (
    "id" SERIAL NOT NULL,
    "privateKey" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "generationDate" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iss" TEXT NOT NULL,
    "at_hash" TEXT,
    "sub" TEXT NOT NULL,
    "azp" TEXT,
    "email_verified" BOOLEAN,
    "email" TEXT,
    "profile" TEXT,
    "picture" TEXT,
    "name" TEXT,
    "given_name" TEXT,
    "family_name" TEXT,
    "aud" TEXT NOT NULL,
    "iat" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "nonce" TEXT,
    "hd" TEXT,
    "locale" TEXT,

    PRIMARY KEY ("id")
);
