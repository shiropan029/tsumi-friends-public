import { prisma } from "@/lib/prisma";
import type { MediaType, WorkState } from "../types";

/**
 * ユーザーの作品視聴状態を取得する
 * @param userId
 * @param workId
 * @param mediaType
 * @returns
 */
export async function getUserWorkState(
  userId: string,
  workId: number,
  mediaType: MediaType,
): Promise<WorkState | null> {
  // 最新の視聴状態レコードを取得する
  const record = await prisma.userWorkState.findFirst({
    where: {
      userId,
      workId,
      mediaType,
    },
    orderBy: { createdAt: "desc" },
  });

  if (record == null) {
    return null;
  }

  return record.state as WorkState;
}
