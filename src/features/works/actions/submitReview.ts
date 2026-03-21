"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types/actionResult";
import type { MediaType, Rating } from "../types";
import { RATING_VALUES, MEDIA_TYPES, MEDIA_TYPE_TO_URL } from "../types";
import { formatZodErrors } from "@/lib/utils/validation";

const submitReviewSchema = z.object({
  workId: z.coerce
    .number()
    .int() // 整数
    .positive("作品IDが不正です"),
  mediaType: z.coerce
    .number()
    .refine((v): v is MediaType => MEDIA_TYPES.includes(v as MediaType), {
      message: "メディアタイプが不正です",
    }),
  rating: z.coerce
    .number()
    .refine((v): v is Rating => RATING_VALUES.includes(v as Rating), {
      message: "評価を選択してください",
    }),
  review: z
    .string()
    .max(1000, "感想は1000文字以下で入力してください")
    .optional() // 省略可能
    .default(""),
});

/**
 * レビュー保存ServerAction
 * UserWorkReviewテーブルにupsertする（「見た」状態チェックなし）
 * @param formData
 * @returns
 */
export async function submitReviewAction(
  formData: FormData,
): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  if (session?.user?.id == null) {
    return { success: false, message: "ログインが必要です" };
  }

  const rawData = {
    workId: formData.get("workId"),
    mediaType: formData.get("mediaType"),
    rating: formData.get("rating"),
    review: (formData.get("review") as string) ?? "",
  };

  const validationError = validateSubmitReviewInput(rawData);
  if (validationError != null) {
    return validationError;
  }

  const parsedData = submitReviewSchema.parse(rawData);
  const { workId, mediaType, rating, review } = parsedData;

  try {
    // UserWorkReviewテーブルにupsertする
    await prisma.userWorkReview.upsert({
      where: {
        userId_mediaType_workId: {
          userId: session.user.id,
          mediaType,
          workId,
        },
      },
      update: {
        rating,
        review,
      },
      create: {
        userId: session.user.id,
        workId,
        mediaType,
        rating,
        review,
      },
    });

    // URLパス用のmediaType文字列に変換してrevalidatePathを呼ぶ
    const mediaTypeUrl = MEDIA_TYPE_TO_URL[mediaType];
    revalidatePath(`/works/${mediaTypeUrl}/${workId}`);

    return {
      success: true,
      message: "感想を保存しました",
    };
  } catch (error) {
    console.error("レビュー保存エラー:", error);
    return { success: false, message: "感想の保存中にエラーが発生しました" };
  }
}

/**
 * バリデーションエラーがあれば失敗レスポンスを返す、なければnullを返す
 * @param rawData
 * @returns
 */
function validateSubmitReviewInput(rawData: Record<string, unknown>): {
  success: false;
  message: string;
  errors: Record<string, string[]>;
} | null {
  const validationResult = submitReviewSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      message: "入力内容に誤りがあります",
      errors: formatZodErrors(validationResult.error),
    };
  }

  return null;
}
