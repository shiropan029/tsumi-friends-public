import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { getUserProfile } from "../api/getUserProfile";
import { Card, CardContent } from "@/components/ui/card";
import { getUserRecords, getUserLibrary } from "../api/getUserActivity";
import { ProfileCard } from "./ProfileCard";

/**
 * プロフィールページ
 * 自分のプロフィールの場合、編集機能表示
 * @param param0
 * @returns
 */
export async function ProfilePage({ accountId }: { accountId: string }) {
  const session = await getServerSession(authOptions);
  // ログインしていない場合はnull
  const currentUserId = session?.user?.id ?? null;

  const userProfile = await getUserProfile(
    accountId,
    currentUserId ?? undefined,
  );

  // ユーザーが見つからない場合はエラー表示
  if (userProfile == null) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-lg text-center">
          <CardContent className="pt-6">
            <p className="text-destructive">ユーザーが見つかりませんでした</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 自分のプロフィールかどうかを判定する
  const isMyself = currentUserId === userProfile.userId;

  // 記録とライブラリのデータを取得する
  const [recordItems, libraryItems] = await Promise.all([
    getUserRecords(userProfile.userId),
    getUserLibrary(userProfile.userId),
  ]);

  return (
    <ProfileCard
      userProfile={userProfile}
      isMyself={isMyself}
      currentUserId={currentUserId}
      recordItems={recordItems}
      libraryItems={libraryItems}
    />
  );
}
