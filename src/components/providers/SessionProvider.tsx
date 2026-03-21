"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

/**
 * NextAuth SessionProviderのラッパーコンポーネント
 * Server Componentと分離するため"use client"を持つこのファイルに切り出す
 * app/layout.tsxでchildrenをこのProviderでラップして使用する
 * @param param0
 * @returns
 */
export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
