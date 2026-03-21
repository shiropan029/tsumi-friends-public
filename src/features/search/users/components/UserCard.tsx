import { UserInfo } from "@/components/elements/UserInfo";
import type { UserBasicInfo } from "@/types/user";

/**
 * ユーザー検索結果の1件分
 * @param param0
 * @returns
 */
export function UserCard({
  user,
  onClickUser,
}: {
  user: UserBasicInfo;
  onClickUser: (accountId: string) => void;
}) {
  return (
    <button
      onClick={() => onClickUser(user.accountId)}
      className="w-full p-3 rounded-lg hover:bg-muted/50 text-left"
    >
      <UserInfo
        name={user.name}
        accountId={user.accountId}
        profileImageUrl={user.profileImageUrl}
      />
    </button>
  );
}
