"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { formatZodErrors } from "@/lib/utils/validation";
import type { ActionResult } from "@/types/actionResult";

const signinSchema = z.object({
  accountId: z.string().min(1, "IDを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

/**
 * ログインServerAction
 * @param formData
 * @returns
 */
export async function signinAction(formData: FormData): Promise<ActionResult> {
  const rawData = {
    accountId: formData.get("accountId") as string,
    password: formData.get("password") as string,
  };

  const validationResult = signinSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      message: "入力内容に誤りがあります",
      errors: formatZodErrors(validationResult.error),
    };
  }

  const { accountId, password } = validationResult.data;

  try {
    const user = await prisma.userAccount.findUnique({
      where: { accountId },
    });

    // ユーザーが存在しない場合もパスワード不一致と同じメッセージを返す
    if (user == null) {
      return {
        success: false,
        message: "IDまたはパスワードが正しくありません",
      };
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return {
        success: false,
        message: "IDまたはパスワードが正しくありません",
      };
    }

    return {
      success: true,
      message: "ログインしました",
    };
  } catch (error) {
    console.error("Signin error:", error);
    return {
      success: false,
      message: "ログイン処理中にエラーが発生しました",
    };
  }
}
