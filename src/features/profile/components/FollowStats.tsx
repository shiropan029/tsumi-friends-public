"use client";

import { useState } from "react";
import { FollowListDialog } from "./FollowListDialog";

type FollowStatsProps = {
  userId: string;
  followingCount: number;
  followersCount: number;
};

/**
 * フォロー数・フォロワー数の表示
 * @param param0
 * @returns
 */
export function FollowStats({
  userId,
  followingCount,
  followersCount,
}: FollowStatsProps) {
  // null:ダイアログ非表示、following:フォロー表示、followers:フォロワー表示
  const [dialogType, setDialogType] = useState<
    "following" | "followers" | null
  >(null);

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => setDialogType("following")}
          className="text-sm hover:underline"
        >
          <span className="font-semibold">{followingCount}</span>
          <span className="text-muted-foreground ml-1">フォロー</span>
        </button>
        <button
          onClick={() => setDialogType("followers")}
          className="text-sm hover:underline"
        >
          <span className="font-semibold">{followersCount}</span>
          <span className="text-muted-foreground ml-1">フォロワー</span>
        </button>
      </div>

      <FollowListDialog
        userId={userId}
        viewMode={dialogType}
        onClose={() => setDialogType(null)}
      />
    </>
  );
}
