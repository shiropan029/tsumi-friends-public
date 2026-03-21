"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "../types";
import { formatZodErrors } from "@/lib/utils/validation";
import { saveImage } from "@/lib/saveImage";

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "ユーザー名を入力してください")
    .max(50, "ユーザー名は50文字以下で入力してください"),
  description: z.string().max(200, "自己紹介文は200文字以下で入力してください"),
});

/**
 * プロフィール更新ServerAction
 * @param formData
 * @returns
 */
export async function updateProfileAction(
  formData: FormData,
): Promise<ActionResult> {
  // 認証チェック
  const session = await getServerSession(authOptions);
  if (session?.user?.id == null) {
    return {
      success: false,
      message: "ログインが必要です",
    };
  }

  // バリデーション
  const rawData = {
    name: formData.get("name") as string,
    description: (formData.get("description") as string) ?? "",
  };

  const validationError = validateUpdateProfileInput(rawData);
  if (validationError != null) {
    return validationError;
  }

  const parsedData = updateProfileSchema.parse(rawData);
  const { name, description } = parsedData;

  // プロフィール画像のアップロード
  const imageFile = formData.get("profileImage") as File | null;
  let profileImageUrl: string | null | undefined;

  // 画像ファイルが選択されている場合のみアップロード処理を実行
  if (imageFile != null && imageFile.size > 0) {
    // ファイル名はユーザーID+タイムスタンプで一意にする
    const ext = imageFile.name.split(".").pop() ?? "png";
    const fileName = `${session.user.id}_${Date.now()}.${ext}`;
    const savedUrl = await saveImage(imageFile, fileName);
    if (savedUrl == null) {
      return {
        success: false,
        message: "画像のアップロードに失敗しました",
      };
    }
    profileImageUrl = savedUrl;
  }

  // DB更新
  try {
    const updateData: {
      name: string;
      description: string;
      profileImageUrl?: string;
    } = {
      name,
      description,
    };
    if (profileImageUrl != null) {
      updateData.profileImageUrl = profileImageUrl;
    }

    await prisma.userAccount.update({
      where: { userId: session.user.id },
      data: updateData,
    });

    revalidatePath(`/profile/${session.user.accountId}`);

    return {
      success: true,
      message: "プロフィールを更新しました",
      data: {
        name,
        description,
        profileImageUrl: profileImageUrl ?? undefined,
      },
    };
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return {
      success: false,
      message: "プロフィールの更新中にエラーが発生しました",
    };
  }
}

/**
 * バリデーション
 * @param rawData
 * @returns
 */
function validateUpdateProfileInput(rawData: Record<string, unknown>): {
  success: false;
  message: string;
  errors: Record<string, string[]>;
} | null {
  const validationResult = updateProfileSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      message: "入力内容に誤りがあります",
      errors: formatZodErrors(validationResult.error),
    };
  }

  return null;
}
