// プロフィール関連の型定義
import type { WorkState } from "@/types/media";
import type { ActionResult as BaseActionResult } from "@/types/actionResult";
import type { UserBasicInfo } from "@/types/user";
import type { WorkBasicInfo } from "@/lib/media/types";

/**
 * ユーザープロフィールデータ（フォロー状態を含む）
 */
export type UserProfileData = UserBasicInfo & {
  description: string;
  followingCount: number;
  followersCount: number;
  isFollowedByMe: boolean; // ログインユーザーがフォローしているか
};

/**
 * プロフィール編集フォームの入力データ型
 */
export type ProfileFormData = {
  name: string;
  description: string;
};

/**
 * プロフィール更新時のServerActionレスポンス型
 */
export type ActionResult = BaseActionResult<{
  name?: string;
  description?: string;
  profileImageUrl?: string | null;
}>;

/**
 * フォロー・アンフォローServerActionのレスポンス型
 */
export type FollowActionResult = BaseActionResult<{
  isFollowing: boolean;
}>;

/**
 * フォロー一覧取得ServerActionのレスポンス型
 */
export type GetFollowListResult = BaseActionResult<UserBasicInfo[]>;

/**
 * ライブラリ（視聴作品一覧）の1件分のデータ型
 */
export type LibraryItem = {
  work: WorkBasicInfo;
  state: WorkState;
  updatedAt: Date;
};
