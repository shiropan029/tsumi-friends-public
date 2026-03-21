import { prisma } from "@/lib/prisma";
import { tmdbMediaApi as mediaApi } from "@/lib/media/tmdbMediaApi";
import type { MediaType, WorkState } from "@/types/media";
import type { TimelineItem } from "@/types/timeline";
import type { LibraryItem } from "../types";

/**
 * ユーザーの記録を取得する
 * @param userId
 * @param limit
 * @returns
 */
export async function getUserRecords(
  userId: string,
  limit: number = 30,
): Promise<TimelineItem[]> {
  const workStates = await prisma.userWorkState.findMany({
    where: { userId },
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
  const uniqueWork = mediaApi.uniqueByWork(workStates);
  const workMap = await mediaApi.getWorksByIds(
    uniqueWork.map((ws) => ({
      workId: ws.workId,
      mediaType: ws.mediaType as MediaType,
    })),
  );

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

/**
 * ユーザーが記録した作品の一覧を取得する
 * 同一作品に複数の視聴状態レコードがある場合は、最新のレコードのみを使用する
 * @param userId
 * @returns
 */
export async function getUserLibrary(userId: string): Promise<LibraryItem[]> {
  const workStates = await prisma.userWorkState.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  if (workStates.length === 0) {
    return [];
  }

  // 重複なしの作品情報を取得
  const uniqueWork = mediaApi.uniqueByWork(workStates);
  const workMap = await mediaApi.getWorksByIds(
    uniqueWork.map((ws) => ({
      workId: ws.workId,
      mediaType: ws.mediaType as MediaType,
    })),
  );

  const items: LibraryItem[] = [];
  for (const ws of uniqueWork) {
    const mediaType = ws.mediaType as MediaType;
    const work = workMap.get(mediaApi.getWorkKey(ws.workId, mediaType));
    if (work == null) {
      continue;
    }

    items.push({
      work: {
        workId: ws.workId,
        mediaType,
        title: work.title,
        posterUrl: work.posterUrl,
      },
      state: ws.state as WorkState,
      updatedAt: ws.updatedAt,
    });
  }

  return items;
}
