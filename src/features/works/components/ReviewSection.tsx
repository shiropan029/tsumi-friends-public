"use client";

import { useRouter } from "next/navigation";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import type { ReviewData, MediaType } from "../types";

type ReviewSectionProps = {
  workId: number;
  mediaType: MediaType;
  ownReview: ReviewData | null;
  followedReviews: ReviewData[];
  isSignin: boolean;
};

/**
 * 感想セクション（自分 + フォロー中ユーザーのレビュー一覧）
 * @param param0
 * @returns
 */
export function ReviewSection({
  workId,
  mediaType,
  ownReview,
  followedReviews,
  isSignin,
}: ReviewSectionProps) {
  const router = useRouter();

  // レビュー保存後にサーバーコンポーネントのデータを再取得する
  const handleReviewSaved = () => {
    router.refresh();
  };

  const hasAnyReviews = ownReview != null || followedReviews.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">感想</h2>
        {isSignin && (
          <ReviewForm
            workId={workId}
            mediaType={mediaType}
            currentRating={ownReview?.rating}
            currentReview={ownReview?.review}
            triggerLabel={ownReview != null ? "感想を編集" : "感想記入"}
            onReviewSaved={handleReviewSaved}
          />
        )}
      </div>

      {!hasAnyReviews && (
        <p className="text-sm text-muted-foreground text-center py-4">
          自分・フォローユーザーの感想がありません
        </p>
      )}

      {/* 自分の感想 */}
      {ownReview != null && <ReviewCard review={ownReview} />}

      {/* フォロー中ユーザーの感想一覧 */}
      {followedReviews.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            フォロー中のユーザーの感想
          </h3>
          {followedReviews.map((review) => (
            <ReviewCard key={review.userId} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
