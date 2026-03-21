import { UserIcon } from "./UserIcon";

type UserInfoSize = "sm" | "md";

type UserInfoProps = {
  name: string;
  accountId: string;
  profileImageUrl: string | null;
  size?: UserInfoSize;
};

/**
 * アバター+名前+@accountIdのセット表示
 * @param param0
 * @returns
 */
export function UserInfo({
  name,
  accountId,
  profileImageUrl,
  size = "md",
}: UserInfoProps) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <UserIcon name={name} profileImageUrl={profileImageUrl} size={size} />
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">@{accountId}</p>
      </div>
    </div>
  );
}
