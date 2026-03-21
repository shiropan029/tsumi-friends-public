"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { searchUsers } from "../api/searchUsers";
import type { SearchUsersResult } from "../types";

/**
 * nameまたはaccountIdが部分一致するユーザーを返す。自分自身は除外
 * @param query
 * @returns
 */
export async function searchUsersAction(
  query: string,
): Promise<SearchUsersResult> {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  try {
    const results = await searchUsers(query, currentUserId);
    return { success: true, data: results };
  } catch (error) {
    console.error("ユーザー検索エラー:", error);
    return { success: false, message: "検索中にエラーが発生しました" };
  }
}
