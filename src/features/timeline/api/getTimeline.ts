import { prisma } from "@/lib/prisma";
import { tmdbMediaApi as mediaApi } from "@/lib/media/tmdbMediaApi";
import type { MediaType, WorkState } from "@/types/media";
import type { TimelineItem } from "@/types/timeline";

/**
 * タイムライン表示情報を取得する
 * @param userId
 * @param limit
 * @returns
 */
export async function getTimeline(
  userId: string,
  limit: number = 30,
): Promise<TimelineItem[]> {
  // フォローしているユーザーを取得
  const follows = await prisma.follow.findMany({
    where: { userId },
    select: { followingId: true },
  });

  const followingIds = follows.map(
    (f: { followingId: string }) => f.followingId,
  );
  if (followingIds.length === 0) {
    return [];
  }

  // フォローしているユーザーの情報+State更新を取得
  const workStates = await prisma.userWorkState.findMany({
    where: { userId: { in: followingIds } },
    orderBy: { updatedAt: "desc" },
    take: limit,
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

  if (workStates.length === 0) {
    return [];
  }

  // 重複なしの作品情報を取得
  const uniqueWorks = mediaApi.uniqueByWork(workStates);
  const workMap = await mediaApi.getWorksByIds(
    uniqueWorks.map((ws) => ({
      workId: ws.workId,
      mediaType: ws.mediaType as MediaType,
    })),
  );

  // タイムライン表示用の型に変換する
  const items: TimelineItem[] = [];
  for (const ws of workStates) {
    const mediaType = ws.mediaType as MediaType;
    const work = workMap.get(mediaApi.getWorkKey(ws.workId, mediaType));
    if (work == null) {
      continue;
    }

    items.push({
      user: {
        userId: ws.user.userId,
        accountId: ws.user.accountId,
        name: ws.user.name,
        profileImageUrl: ws.user.profileImageUrl,
      },
      work: {
        workId: ws.workId,
        mediaType,
        title: work.title,
        posterUrl: work.posterUrl,
      },
      state: ws.state as WorkState,
      description: ws.description ?? "",
      updatedAt: ws.updatedAt,
    });
  }

  return items;
}
