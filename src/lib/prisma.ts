import { PrismaClient } from "@prisma/client";

// 開発環境でのホットリロード時にPrismaClientが複数インスタンス化されないようにグローバルに保持する
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
