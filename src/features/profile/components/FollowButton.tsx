"use client";

import { useState } from "react";
import { toggleFollowAction } from "../actions/switchFollow";
import { Button } from "@/components/ui/button";

/**
 * フォロー・アンフォローボタン
 * ボタンクリック時にtoggleFollowActionを呼び出してフォロー状態を切り替える
 * @param param0
 * @returns
 */
export function FollowButton({
  targetUserId,
  initialIsFollowing,
}: {
  targetUserId: string;
  initialIsFollowing: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("targetUserId", targetUserId);
      const result = await toggleFollowAction(formData);
      if (result.success && result.data != null) {
        setIsFollowing(result.data.isFollowing);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      disabled={isPending}
      onClick={handleClick}
    >
      {getButtonLabel(isPending, isFollowing)}
    </Button>
  );
}

/**
 * ボタン表示文言を返す
 * @param isPending
 * @param isFollowing
 * @returns
 */
function getButtonLabel(isPending: boolean, isFollowing: boolean): string {
  if (isPending) {
    return "処理中...";
  }
  if (isFollowing) {
    return "フォロー中";
  }
  return "フォロー";
}
