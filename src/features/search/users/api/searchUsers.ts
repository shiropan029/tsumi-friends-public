import { prisma } from "@/lib/prisma";
import type { UserBasicInfo } from "@/types/user";

/**
 * nameまたはaccountIdが部分一致するユーザーを返す（最大20件）
 * currentUserIdが指定された場合は自分自身を除外する
 * @param query
 * @param currentUserId
 * @returns
 */
export async function searchUsers(
  query: string,
  currentUserId?: string,
): Promise<UserBasicInfo[]> {
  if (query.trim() === "") {
    return [];
  }

  // 自身のuserIdを除外する条件を先に作成し、
  // アンパックして条件に加える
  let excludeCurrentUser: { userId: { not: string } }[];
  if (currentUserId != null) {
    excludeCurrentUser = [{ userId: { not: currentUserId } }];
  } else {
    excludeCurrentUser = [];
  }

  const users = await prisma.userAccount.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query } },
            { accountId: { contains: query } },
          ],
        },
        ...excludeCurrentUser,
      ],
    },
    select: {
      userId: true,
      accountId: true,
      name: true,
      profileImageUrl: true,
    },
    take: 20,
  });

  return users.map((user: UserBasicInfo) => ({
    userId: user.userId,
    accountId: user.accountId,
    name: user.name,
    profileImageUrl: user.profileImageUrl,
  }));
}
