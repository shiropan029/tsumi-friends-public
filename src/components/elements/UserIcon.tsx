import Image from "next/image";

type UserAvatarSize = "sm" | "md" | "lg";

type UserAvatarProps = {
  name: string;
  profileImageUrl: string | null;
  size?: UserAvatarSize;
};

// 大きさを引数で指定できるようにする
const sizeConfig: Record<
  UserAvatarSize,
  { container: string; text: string; px: number }
> = {
  sm: { container: "w-8 h-8", text: "text-xs", px: 32 },
  md: { container: "w-10 h-10", text: "text-sm", px: 40 },
  lg: { container: "w-16 h-16 border border-border", text: "text-2xl", px: 64 },
};

/**
 * ユーザーアイコン（画像orイニシャル）
 * @param param0
 * @returns
 */
export function UserIcon({
  name,
  profileImageUrl,
  size = "md",
}: UserAvatarProps) {
  const config = sizeConfig[size];

  if (profileImageUrl != null) {
    return (
      <Image
        src={profileImageUrl}
        alt={name}
        width={config.px}
        height={config.px}
        className={`${config.container} rounded-full object-cover shrink-0`}
      />
    );
  }

  // 画像がない場合は名前の先頭1文字をイニシャルとして表示
  return (
    <div
      className={`${config.container} rounded-full bg-muted flex items-center justify-center shrink-0`}
    >
      <span className={`${config.text} text-muted-foreground`}>
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
