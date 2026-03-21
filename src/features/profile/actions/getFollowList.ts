"use server";

import { getFollowingList, getFollowersList } from "../api/getFollowList";
import type { GetFollowListResult } from "../types";

/**
 * フォロー・フォロワー一覧を取得するServerAction
 * @param userId
 * @param type
 * @returns
 */
export async function getFollowListAction(
  userId: string,
  type: "following" | "followers",
): Promise<GetFollowListResult> {
  try {
    // typeに応じてフォロー中一覧かフォロワー一覧を取得する
    let data;
    if (type === "following") {
      data = await getFollowingList(userId);
    } else {
      data = await getFollowersList(userId);
    }

    return { success: true, data };
  } catch (error) {
    console.error("フォロー一覧取得エラー:", error);
    return { success: false, message: "一覧の取得に失敗しました" };
  }
}
