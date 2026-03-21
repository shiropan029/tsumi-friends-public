"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FollowListItem } from "./FollowListItem";
import { getFollowListAction } from "../actions/getFollowList";
import type { UserBasicInfo } from "@/types/user";

type FollowListDialogProps = {
  userId: string;
  viewMode: "following" | "followers" | null;
  onClose: () => void;
};

/**
 * フォロー・フォロワー一覧ダイアログ
 * viewModeがnullのとき閉じた状態、following・followersのとき対応する一覧を表示する
 * @param param0
 * @returns
 */
export function FollowListDialog({
  userId,
  viewMode,
  onClose,
}: FollowListDialogProps) {
  return (
    <Dialog
      open={viewMode !== null}
      onOpenChange={(open) => {
        if (open === false) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {viewMode === "following" ? "フォロー" : "フォロワー"}
          </DialogTitle>
        </DialogHeader>
        {viewMode != null && (
          // keyにuserIdとviewModeを組み合わせることで、
          // 「フォロー→フォロワー」や別ユーザーへの切り替え時にコンポーネントをリセットし、
          // 前のリスト内容が一瞬見えてしまうのを防ぐ
          <FollowListContent
            key={`${userId}-${viewMode}`}
            userId={userId}
            viewMode={viewMode}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * フォロー一覧の内容部分
 * @param param0
 * @returns
 */
function FollowListContent({
  userId,
  viewMode,
  onClose,
}: {
  userId: string;
  viewMode: "following" | "followers";
  onClose: () => void;
}) {
  const router = useRouter();
  const [users, setUsers] = useState<UserBasicInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // viewModeの切り替えが素早く行われた場合、古いリクエストの結果が
    // 後から返ってきてもステートを上書きしないようにする。
    let cancelled = false;

    // useEffect内でasync/awaitを使うために関数化
    (async () => {
      try {
        const result = await getFollowListAction(userId, viewMode);
        if (cancelled) {
          return;
        }
        if (result.success && result.data != null) {
          setUsers(result.data);
        }
      } finally {
        // cancelledでないときのみローディング状態を解除する
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    })();

    // クリーンアップ時にcancelledをtrueにして古いコールバックを無効化する
    return () => {
      cancelled = true;
    };
  }, [userId, viewMode]);

  function handleClickUser(accountId: string) {
    onClose();
    router.push(`/profile/${accountId}`);
  }

  return (
    <div className="overflow-y-auto flex-1 divide-y divide-border">
      {isLoading ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          読み込み中...
        </p>
      ) : users.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          {viewMode === "following"
            ? "フォローしているユーザーはいません"
            : "フォロワーはいません"}
        </p>
      ) : (
        users.map((user) => (
          <FollowListItem
            key={user.userId}
            user={user}
            onClickUser={() => handleClickUser(user.accountId)}
          />
        ))
      )}
    </div>
  );
}
