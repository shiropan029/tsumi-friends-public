-- CreateTable
CREATE TABLE "user_account" (
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "user_work_state" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "workId" INTEGER NOT NULL,
    "mediaType" INTEGER NOT NULL,
    "state" INTEGER NOT NULL,
    "description" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_work_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_work_review" (
    "userId" TEXT NOT NULL,
    "mediaType" INTEGER NOT NULL,
    "workId" INTEGER NOT NULL,
    "rating" INTEGER,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_work_review_pkey" PRIMARY KEY ("userId","mediaType","workId")
);

-- CreateTable
CREATE TABLE "user_follow" (
    "userId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_follow_pkey" PRIMARY KEY ("userId","followingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_account_accountId_key" ON "user_account"("accountId");

-- CreateIndex
CREATE INDEX "user_account_accountId_idx" ON "user_account"("accountId");

-- CreateIndex
CREATE INDEX "user_account_name_idx" ON "user_account"("name");

-- CreateIndex
CREATE INDEX "user_work_state_userId_createdAt_idx" ON "user_work_state"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "user_work_state" ADD CONSTRAINT "user_work_state_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_work_review" ADD CONSTRAINT "user_work_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follow" ADD CONSTRAINT "user_follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follow" ADD CONSTRAINT "user_follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "user_account"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
