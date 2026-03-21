"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import type { WorkActionResult } from "../types";
import { WORK_STATES, MEDIA_TYPES, MEDIA_TYPE_TO_URL } from "../types";
import type { MediaType, WorkState } from "@/types/media";
import { formatZodErrors } from "@/lib/utils/validation";

const updateWorkStateSchema = z.object({
  workId: z.coerce.number().int().positive("作品IDが不正です"),
  // parse後にMediaType型にしたいためis句を使用
  mediaType: z.coerce
    .number()
    .refine((v): v is MediaType => MEDIA_TYPES.includes(v as MediaType), {
      message: "メディアタイプが不正です",
    }),
  state: z.coerce
    .number()
    .refine((v): v is WorkState => WORK_STATES.includes(v as WorkState), {
      message: "状態を選択してください",
    }),
  description: z
    .string()
    .max(500, "詳細文は500文字以下で入力してください")
    .optional()
    .default(""),
});

/**
 * 作品の視聴状態を更新するServerAction
 * @param formData
 * @returns
 */
export async function updateWorkStateAction(
  formData: FormData,
): Promise<WorkActionResult> {
  const session = await getServerSession(authOptions);
  if (session?.user?.id == null) {
    return {
      success: false,
      message: "ログインが必要です",
    };
  }

  const rawData = {
    workId: formData.get("workId"),
    mediaType: formData.get("mediaType"),
    state: formData.get("state"),
    description: (formData.get("description") as string) ?? "",
  };

  const validationError = validateUpdateWorkStateInput(rawData);
  if (validationError != null) {
    return validationError;
  }

  const parsedData = updateWorkStateSchema.parse(rawData);
  const { workId, mediaType, state, description } = parsedData;

  try {
    // 新しい視聴状態レコードを追加する（1作品に対して複数の状態を記録可能）
    const result = await prisma.userWorkState.create({
      data: {
        userId: session.user.id,
        workId,
        mediaType,
        state,
        description,
      },
    });

    // URLパス用のmediaType文字列に変換してrevalidatePathを呼ぶ
    const mediaTypeUrl = MEDIA_TYPE_TO_URL[mediaType];
    revalidatePath(`/works/${mediaTypeUrl}/${workId}`);

    return {
      success: true,
      message: "状態を変更しました",
      data: {
        userId: result.userId,
        workId: result.workId,
        mediaType: result.mediaType as MediaType,
        state: result.state as WorkState,
        description: result.description ?? "",
      },
    };
  } catch (error) {
    console.error("作品状態更新エラー:", error);
    return {
      success: false,
      message: "状態の更新中にエラーが発生しました",
    };
  }
}

/**
 * バリデーションエラーがあれば失敗レスポンスを返す、なければnullを返す
 * @param rawData
 * @returns
 */
function validateUpdateWorkStateInput(rawData: Record<string, unknown>): {
  success: false;
  message: string;
  errors: Record<string, string[]>;
} | null {
  const validationResult = updateWorkStateSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      message: "入力内容に誤りがあります",
      errors: formatZodErrors(validationResult.error),
    };
  }

  return null;
}
