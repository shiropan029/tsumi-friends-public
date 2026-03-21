import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";

/**
 * NextAuthの設定オプション
 * CredentialsProviderでアカウントID+パスワード認証を実装
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        accountId: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.accountId == null || credentials?.password == null) {
          return null;
        }

        const user = await prisma.userAccount.findUnique({
          where: { accountId: credentials.accountId },
        });

        if (user == null) {
          return null;
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.passwordHash,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.userId,
          name: user.name,
          accountId: user.accountId,
          profileImageUrl: user.profileImageUrl ?? null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // JWTトークンにカスタムフィールドを追加する
    // 初回ログイン時はuserから設定し、プロフィール更新時(trigger==="update")にDBから再取得する
    async jwt({ token, user, trigger }) {
      if (user != null) {
        token.userId = user.id;
        token.accountId = user.accountId;
        token.name = user.name;
        token.profileImageUrl = user.profileImageUrl;
      }

      // プロフィール更新時にDBから最新情報を再取得する
      if (trigger === "update") {
        const dbUser = await prisma.userAccount.findUnique({
          where: { userId: token.userId as string },
          select: { name: true, profileImageUrl: true },
        });
        if (dbUser != null) {
          token.name = dbUser.name;
          token.profileImageUrl = dbUser.profileImageUrl;
        }
      }

      return token;
    },
    // セッションオブジェクトにJWTから取得したカスタムフィールドをセットする
    async session({ session, token }) {
      if (token != null) {
        session.user = {
          ...session.user,
          id: token.userId as string,
          accountId: token.accountId as string,
          name: token.name as string,
          profileImageUrl: token.profileImageUrl ?? null,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
