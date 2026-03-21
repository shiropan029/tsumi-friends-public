"use client";

import { useState } from "react";
import type { UserProfileData, LibraryItem } from "../types";
import type { TimelineItem as TimelineItemData } from "@/types/timeline";
import { ProfileForm } from "./ProfileForm";
import { FollowButton } from "./FollowButton";
import { FollowStats } from "./FollowStats";
import { ProfileTabs } from "./ProfileTabs";
import { Card, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon } from "@/components/elements/UserIcon";
import { Separator } from "@/components/ui/separator";

type ProfileCardProps = {
  userProfile: UserProfileData;
  isMyself: boolean;
  currentUserId: string | null;
  recordItems: TimelineItemData[];
  libraryItems: LibraryItem[];
};

/**
 * プロフィール情報
 * @param param0
 * @returns
 */
export function ProfileCard({
  userProfile,
  isMyself,
  currentUserId,
  recordItems,
  libraryItems,
}: ProfileCardProps) {
  // 自分のプロフィールの場合のみ編集フォームで状態管理が必要
  const [profile, setProfile] = useState<UserProfileData>(userProfile);
  const [isEditing, setIsEditing] = useState(false);

  // プロフィール保存完了後のハンドラ
  // プロフィールを更新し、編集モードを終了する
  function handleSaved(
    updatedName: string,
    updatedDescription: string,
    updatedImageUrl: string | null | undefined,
  ) {
    setProfile((prev) => ({
      ...prev,
      name: updatedName,
      description: updatedDescription,
      // updatedImageUrlがundefinedの場合は既存の値を維持する
      profileImageUrl: updatedImageUrl ?? prev.profileImageUrl,
    }));
    setIsEditing(false);
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Card>
          <CardContent>
            {/* 自分のプロフィールかつ編集中の場合のみ編集フォームを表示する */}
            {isMyself && isEditing ? (
              <ProfileForm
                profile={profile}
                onCancel={() => setIsEditing(false)}
                onSaved={handleSaved}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  {/* プロフィール表示部分 */}
                  <ProfileDisplay profile={profile} />

                  {/* ボタン部分：自分なら編集ボタン、他人ならフォローボタン */}
                  {isMyself ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() => setIsEditing(true)}
                    >
                      編集
                    </Button>
                  ) : (
                    // ログインしている場合のみフォローボタンを表示する
                    currentUserId != null && (
                      <FollowButton
                        targetUserId={userProfile.userId}
                        initialIsFollowing={userProfile.isFollowedByMe}
                      />
                    )
                  )}
                </div>

                {/* フォロー/フォロワー数 */}
                <FollowStats
                  userId={profile.userId}
                  followingCount={profile.followingCount}
                  followersCount={profile.followersCount}
                />

                <Separator />

                {/* タブ（記録/ライブラリ） */}
                <ProfileTabs
                  recordItems={recordItems}
                  libraryItems={libraryItems}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * プロフィール表示部分
 * アバター + 名前 + @accountId + 詳細
 */
function ProfileDisplay({ profile }: { profile: UserProfileData }) {
  const hasDescription =
    profile.description != null && profile.description !== "";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <UserIcon
          name={profile.name}
          profileImageUrl={profile.profileImageUrl}
          size="lg"
        />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold">{profile.name}</p>
          <CardDescription>@{profile.accountId}</CardDescription>
        </div>
      </div>
      {hasDescription ? (
        <p className="text-sm text-foreground whitespace-pre-wrap">
          {profile.description}
        </p>
      ) : (
        <CardDescription className="italic">
          自己紹介文が未設定です
        </CardDescription>
      )}
    </div>
  );
}
