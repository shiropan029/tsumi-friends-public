import Link from "next/link";
import Image from "next/image";
import type { TimelineItem as TimelineItemData } from "@/types/timeline";
import { UserInfo } from "@/components/elements/UserInfo";
import { WorkStatusBadge } from "@/components/elements/WorkStatusBadge";
import { MEDIA_TYPE_TO_URL } from "@/types/media";
import { formatRelativeTime } from "@/lib/utils/time";

/**
 * タイムラインの1アイテム
 * @param param0
 * @returns
 */
export function TimelineItem({ item }: { item: TimelineItemData }) {
  // URLパス用のmediaType文字列（anime/movie/drama）に変換する
  const mediaTypeUrl = MEDIA_TYPE_TO_URL[item.work.mediaType];

  return (
    <div className="px-4 py-4 space-y-3">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${item.user.accountId}`}>
          <UserInfo
            name={item.user.name}
            accountId={item.user.accountId}
            profileImageUrl={item.user.profileImageUrl}
          />
        </Link>
        <time
          className="ml-auto text-xs text-muted-foreground shrink-0"
          dateTime={item.updatedAt.toISOString()}
        >
          {formatRelativeTime(item.updatedAt)}
        </time>
      </div>

      <div className="pl-13">
        <WorkStatusBadge state={item.state} />
        {item.description !== "" && (
          <p className="mt-2 text-sm text-foreground whitespace-pre-wrap">
            {item.description}
          </p>
        )}
      </div>

      {/* 作品リンクはURLパス用の文字列（anime/movie/drama）を使う */}
      <Link
        href={`/works/${mediaTypeUrl}/${item.work.workId}`}
        className="ml-13 flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50"
      >
        {item.work.posterUrl != null ? (
          <Image
            src={item.work.posterUrl}
            alt={item.work.title}
            width={48}
            height={64}
            className="w-12 h-16 rounded object-cover shrink-0"
          />
        ) : (
          <div className="w-12 h-16 rounded bg-muted shrink-0" />
        )}
        <p className="text-sm font-medium line-clamp-2">{item.work.title}</p>
      </Link>
    </div>
  );
}
