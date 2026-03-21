import { prisma } from "@/lib/prisma";
import type { ReviewData, MediaType, Rating } from "../types";

/**
 * 作品のレビューを取得する（自分 + フォロー中ユーザー）
 * @param workId
 * @param mediaType
 * @param userId
 */
export async function getWorkReviews(
  workId: number,
  mediaType: MediaType,
  userId: string,
): Promise<{ ownReview: ReviewData | null; followedReviews: ReviewData[] }> {
  // 自分のレビューを取得
  const ownRecord = await prisma.userWorkReview.findUnique({
    where: {
      userId_mediaType_workId: { userId, mediaType, workId },
    },
    include: {
      user: {
        select: {
          userId: true,
          accountId: true,
          name: true,
          profileImageUrl: true,
        },
      },
    },
  });

  let ownReview: ReviewData | null = null;
  // ratingが設定されている場合のみレビューとして扱う
  if (ownRecord != null && ownRecord.rating != null) {
    ownReview = {
      userId: ownRecord.user.userId,
      accountId: ownRecord.user.accountId,
      name: ownRecord.user.name,
      profileImageUrl: ownRecord.user.profileImageUrl,
      rating: ownRecord.rating as Rating,
      review: ownRecord.review ?? "",
      updatedAt: ownRecord.updatedAt,
    };
  }

  // フォロー中ユーザーのレビューを取得
  const follows = await prisma.follow.findMany({
    where: { userId },
    select: { followingId: true },
  });
  const followingIds = follows.map(
    (f: { followingId: string }) => f.followingId,
  );

  let followedReviews: ReviewData[] = [];
  if (followingIds.length > 0) {
    // ratingがnullのレコードは除外してフォロー中ユーザーのレビューを取得する
    const records = await prisma.userWorkReview.findMany({
      where: {
        workId,
        mediaType,
        userId: { in: followingIds },
        rating: { not: null },
      },
      orderBy: { updatedAt: "desc" },
      include: {
        user: {
          select: {
            userId: true,
            accountId: true,
            name: true,
            profileImageUrl: true,
          },
        },
      },
    });

    followedReviews = records.map((r) => ({
      userId: r.user.userId,
      accountId: r.user.accountId,
      name: r.user.name,
      profileImageUrl: r.user.profileImageUrl,
      rating: r.rating as Rating,
      review: r.review ?? "",
      updatedAt: r.updatedAt,
    }));
  }

  return { ownReview, followedReviews };
}
