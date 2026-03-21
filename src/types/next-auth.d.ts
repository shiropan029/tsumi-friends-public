import "next-auth";

/**
 * NextAuth型定義の拡張
 *
 * デフォルトのセッション型にカスタムフィールドを追加
 * - id: ユーザーID
 * - accountId: アカウントID
 * - name: ユーザー名
 * - profileImageUrl: プロフィール画像URL
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accountId: string;
      name: string;
      profileImageUrl: string | null;
    };
  }

  interface User {
    id: string;
    accountId: string;
    name: string;
    profileImageUrl: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    accountId?: string;
    name?: string;
    profileImageUrl?: string | null;
  }
}
