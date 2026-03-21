import { prisma } from "@/lib/prisma";
import type { UserProfileData } from "../types";

/**
 * accountIdからユーザーのプロフィール情報を取得する
 * @param accountId
 * @param currentUserId
 * @returns
 */
export async function getUserProfile(
  accountId: string,
  currentUserId: string | undefined,
): Promise<UserProfileData | null> {
  const user = await prisma.userAccount.findUnique({
    where: { accountId },
    include: {
      _count: {
        select: {
          following: true,
          followers: true,
        },
      },
    },
  });

  if (user == null) {
    return null;
  }

  // そのユーザーをフォローしているか
  let isFollowedByMe = false;
  if (currentUserId != null && currentUserId !== user.userId) {
    const follow = await prisma.follow.findUnique({
      where: {
        userId_followingId: {
          userId: currentUserId,
          followingId: user.userId,
        },
      },
    });
    isFollowedByMe = follow != null;
  }

  return {
    userId: user.userId,
    accountId: user.accountId,
    name: user.name,
    profileImageUrl: user.profileImageUrl,
    description: user.description ?? "",
    followingCount: user._count.following,
    followersCount: user._count.followers,
    isFollowedByMe,
  };
}
