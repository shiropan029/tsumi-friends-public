import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ReviewData } from "../types";
import { RATING_LABELS } from "../types";
import { UserInfo } from "@/components/elements/UserInfo";
import { formatRelativeTime } from "@/lib/utils/time";

/**
 * レビューカード
 * @param param0
 * @returns
 */
export function ReviewCard({
  review,
}: {
  // 表示するレビューデータ
  review: ReviewData;
}) {
  return (
    <div className="rounded-lg border border-border p-4 space-y-3">
      {/* ヘッダー: ユーザー情報 */}
      <div className="flex items-center justify-between">
        {/* ユーザーのプロフィールページへのリンク */}
        <Link href={`/profile/${review.accountId}`}>
          <UserInfo
            name={review.name}
            accountId={review.accountId}
            profileImageUrl={review.profileImageUrl}
            size="sm"
          />
        </Link>
      </div>

      {/* 評価バッジ */}
      <Badge variant="secondary">{RATING_LABELS[review.rating]}</Badge>

      {/* 感想文 */}
      {review.review != null && review.review !== "" && (
        <p className="text-sm text-foreground whitespace-pre-wrap">
          {review.review}
        </p>
      )}

      {/* 更新日時 */}
      <div className="flex justify-end">
        <time className="text-xs text-muted-foreground">
          {formatRelativeTime(new Date(review.updatedAt))}
        </time>
      </div>
    </div>
  );
}
