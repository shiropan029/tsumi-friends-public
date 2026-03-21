import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { tmdbMediaApi as mediaApi } from "@/lib/media/tmdbMediaApi";
import { getUserWorkState } from "../api/workState";
import { getWorkReviews } from "../api/getWorkReviews";
import type { WorkState, ReviewData, MediaType } from "../types";
import { formatDateJP } from "@/lib/utils/time";
import { Separator } from "@/components/ui/separator";
import { WorkStatusSection } from "./WorkStatusSection";
import { ReviewSection } from "./ReviewSection";

/**
 * 作品詳細ページ
 * @param param0
 * @returns
 */
export async function WorkDetailPage({
  id,
  mediaType,
}: {
  id: number;
  mediaType: MediaType;
}) {
  // 作品情報とセッションを並列で取得
  const [work, session] = await Promise.all([
    mediaApi.getWorkDetail(id, mediaType),
    getServerSession(authOptions),
  ]);

  const isSignin = session?.user?.id != null;
  let initialState: WorkState | null = null;

  // レビュー欄に表示する自分とフォローユーザーのデータ
  let reviewData: {
    ownReview: ReviewData | null;
    followedReviews: ReviewData[];
  } = {
    ownReview: null,
    followedReviews: [],
  };

  // ログイン済みの場合のみ視聴状態とレビュー情報を取得する
  if (isSignin) {
    const [workState, reviews] = await Promise.all([
      getUserWorkState(session.user.id, id, mediaType),
      getWorkReviews(id, mediaType, session.user.id),
    ]);
    initialState = workState ?? null;
    reviewData = reviews;
  }

  if (work == null) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-destructive text-center py-8">
            作品が見つかりませんでした
          </p>
        </div>
      </div>
    );
  }

  const broadcastInfo = formatDateJP(work.releaseDate);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 上部: 画像 + タイトル・基本情報 */}
        <div className="flex gap-6 mb-6">
          {/* 左上: カバー画像 */}
          <div className="shrink-0 w-32 h-44 rounded-lg overflow-hidden bg-muted">
            {work.posterUrl != null ? (
              <Image
                src={work.posterUrl}
                alt={work.title}
                width={128}
                height={176}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs text-center p-2">
                画像なし
              </div>
            )}
          </div>

          {/* 右上: タイトル・放送情報・公式サイト */}
          <div className="flex-1 min-w-0">
            {/* タイトル */}
            <h1 className="text-2xl font-bold leading-tight mb-2">
              {work.title}
            </h1>

            {/* 原題（日本語タイトルと異なる場合のみ表示） */}
            {work.originalTitle && work.originalTitle !== work.title && (
              <p className="text-sm text-muted-foreground mb-2">
                {work.originalTitle}
              </p>
            )}

            {/* 放送年・シーズン */}
            {broadcastInfo && (
              <p className="text-sm text-muted-foreground mb-2">
                {broadcastInfo}
              </p>
            )}

            {/* 公式サイトへのリンク */}
            {work.homepage && (
              <a
                href={work.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-3"
              >
                公式サイト
                <span className="text-xs">↗</span>
              </a>
            )}

            {/* 視聴状態セクション */}
            <WorkStatusSection
              workId={id}
              mediaType={mediaType}
              initialState={initialState}
              isSignin={isSignin}
            />
          </div>
        </div>

        <Separator className="mb-6" />

        {/* あらすじ */}
        <div>
          <h2 className="text-lg font-semibold mb-3">あらすじ</h2>
          {work.overview ? (
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {work.overview}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              あらすじ情報がありません
            </p>
          )}
        </div>

        <Separator className="my-6" />

        {/* 感想セクション */}
        <ReviewSection
          workId={id}
          mediaType={mediaType}
          ownReview={reviewData.ownReview}
          followedReviews={reviewData.followedReviews}
          isSignin={isSignin}
        />
      </div>
    </div>
  );
}
