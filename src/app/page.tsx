import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";

/**
 * ルートページ
 * ログイン済みならプロフィールページ、未ログインなら/signinにリダイレクト
 * @returns
 */
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session != null) {
    redirect(`/profile/${session.user.accountId}`);
  }

  redirect("/signin");
}
