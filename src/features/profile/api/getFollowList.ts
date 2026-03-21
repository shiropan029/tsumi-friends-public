import { prisma } from "@/lib/prisma";
import type { UserBasicInfo } from "@/types/user";

/**
 * フォロー中のユーザー一覧を取得する
 * @param userId
 * @returns
 */
export async function getFollowingList(
  userId: string,
): Promise<UserBasicInfo[]> {
  const follows = await prisma.follow.findMany({
    where: { userId },
    include: {
      following: {
        select: {
          userId: true,
          accountId: true,
          name: true,
          profileImageUrl: true,
        },
      },
    },
  });

  return follows.map((f: { following: UserBasicInfo }) => ({
    userId: f.following.userId,
    accountId: f.following.accountId,
    name: f.following.name,
    profileImageUrl: f.following.profileImageUrl,
  }));
}

/**
 * フォロワーのユーザー一覧を取得する
 * @param userId
 * @returns
 */
export async function getFollowersList(
  userId: string,
): Promise<UserBasicInfo[]> {
  const follows = await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: {
          userId: true,
          accountId: true,
          name: true,
          profileImageUrl: true,
        },
      },
    },
  });

  return follows.map((f: { follower: UserBasicInfo }) => ({
    userId: f.follower.userId,
    accountId: f.follower.accountId,
    name: f.follower.name,
    profileImageUrl: f.follower.profileImageUrl,
  }));
}
