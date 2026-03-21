import { UserInfo } from "@/components/elements/UserInfo";
import type { UserBasicInfo } from "@/types/user";

/**
 * フォロー・フォロワー一覧の1件分
 * ユーザー情報を表示するボタン。クリックするとそのユーザーのプロフィールへ遷移する
 * @param param0
 * @returns
 */
export function FollowListItem({
  user,
  onClickUser,
}: {
  user: UserBasicInfo;
  onClickUser: () => void;
}) {
  return (
    <button
      onClick={onClickUser}
      className="w-full p-3 hover:bg-muted/50 transition-colors text-left"
    >
      <UserInfo
        name={user.name}
        accountId={user.accountId}
        profileImageUrl={user.profileImageUrl}
      />
    </button>
  );
}
