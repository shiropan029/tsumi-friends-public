"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { FollowActionResult } from "../types";

/**
 * フォロー・アンフォローを切り替えるServerAction
 * @param formData
 * @returns
 */
export async function toggleFollowAction(
  formData: FormData,
): Promise<FollowActionResult> {
  const session = await getServerSession(authOptions);
  if (session?.user?.id == null) {
    return {
      success: false,
      message: "ログインが必要です",
    };
  }

  const userId = session.user.id;
  const targetUserId = formData.get("targetUserId") as string;

  const validationError = validateSwitchFollowInput(userId, targetUserId);
  if (validationError != null) {
    return validationError;
  }

  try {
    // 既にフォロー済みかどうかを確認してフォロー/アンフォローを切り替える
    const existingFollow = await prisma.follow.findUnique({
      where: {
        userId_followingId: {
          userId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow != null) {
      // フォローを外す
      await prisma.follow.delete({
        where: {
          userId_followingId: {
            userId,
            followingId: targetUserId,
          },
        },
      });

      revalidatePath(`/profile/${targetUserId}`);

      return {
        success: true,
        message: "フォローを解除しました",
        data: { isFollowing: false },
      };
    } else {
      // フォローする
      await prisma.follow.create({
        data: {
          userId,
          followingId: targetUserId,
        },
      });

      revalidatePath(`/profile/${targetUserId}`);

      return {
        success: true,
        message: "フォローしました",
        data: { isFollowing: true },
      };
    }
  } catch (error) {
    console.error("フォロー処理エラー:", error);
    return {
      success: false,
      message: "処理中にエラーが発生しました",
    };
  }
}

/**
 * バリデーション
 * @param userId
 * @param targetUserId
 * @returns
 */
function validateSwitchFollowInput(
  userId: string,
  targetUserId: string,
): { success: false; message: string } | null {
  if (targetUserId == null || targetUserId === "") {
    return {
      success: false,
      message: "対象ユーザーが指定されていません",
    };
  }

  if (userId === targetUserId) {
    return {
      success: false,
      message: "自分自身をフォローすることはできません",
    };
  }

  return null;
}
