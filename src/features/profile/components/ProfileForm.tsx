"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { updateProfileAction } from "../actions/updateProfile";
import type { ActionResult, UserProfileData } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { UserIcon } from "@/components/elements/UserIcon";
import { Textarea } from "@/components/ui/textarea";

type ProfileFormProps = {
  profile: UserProfileData;
  onCancel: () => void;
  onSaved: (
    updatedName: string,
    updatedBio: string,
    updatedImageUrl?: string | null,
  ) => void;
};

/**
 * プロフィール編集フォーム
 * @param param0
 * @returns
 */
export function ProfileForm({ profile, onCancel, onSaved }: ProfileFormProps) {
  const { update: updateSession } = useSession();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: ActionResult, formData: FormData) => {
      return await updateProfileAction(formData);
    },
    { success: false },
  );

  // 保存成功後に親コンポーネントへ変更内容を通知し、セッションを再取得する
  useEffect(() => {
    if (state.success) {
      const updatedName = state.data?.name ?? profile.name;
      const updatedDescription = state.data?.description ?? profile.description;
      const updatedImageUrl = state.data?.profileImageUrl;
      onSaved(updatedName, updatedDescription, updatedImageUrl);
      // NextAuthのセッション（JWT）を再取得し、サイドバー等に最新のプロフィールを反映する
      updateSession();
      toast.success("プロフィールを更新しました");
    }
  }, [state, onSaved, profile.name, profile.description, updateSession]);

  // 選択した画像のプレビューを表示する
  // e：type="file"で自動で渡される引数
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; // 1つしかアップロードされない想定。最初の1つを取得
    if (file == null) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }

  // プレビューがある場合はプレビューを、なければ現在の画像URLを表示
  const displayImageUrl = previewUrl ?? profile.profileImageUrl;

  return (
    <form action={formAction} className="w-full">
      <FieldGroup>
        {state.message && !state.success && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{state.message}</p>
          </div>
        )}

        <Field>
          <FieldLabel>プロフィール画像</FieldLabel>
          <div className="flex items-center gap-4">
            <UserIcon
              name={profile.name}
              profileImageUrl={displayImageUrl}
              size="lg"
            />
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                画像を選択
              </Button>
              {previewUrl != null && (
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setPreviewUrl(null);
                    if (fileInputRef.current != null) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  選択を取り消す
                </button>
              )}
            </div>
            {/* fileのinputのUIはダサいので、hiddenで非表示にし、上記のbuttonで代替する */}
            <input
              ref={fileInputRef}
              type="file"
              name="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </Field>

        <Field data-invalid={state.errors?.name != null}>
          <FieldLabel htmlFor="name">ユーザー名</FieldLabel>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={profile.name}
            required
            maxLength={50}
            placeholder="ユーザー名を入力"
          />
          {state.errors?.name && (
            <FieldError>{state.errors.name.join("、")}</FieldError>
          )}
        </Field>

        <Field data-invalid={state.errors?.description != null}>
          <FieldLabel htmlFor="description">自己紹介文</FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={profile.description}
            maxLength={200}
            placeholder="自己紹介文を入力（200文字以下）"
            rows={4}
            className="resize-none"
          />
          {state.errors?.description && (
            <FieldError>{state.errors.description.join("、")}</FieldError>
          )}
        </Field>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
            className="flex-1"
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "保存中..." : "保存"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
