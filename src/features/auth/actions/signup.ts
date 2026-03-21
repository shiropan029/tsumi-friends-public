"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { formatZodErrors } from "@/lib/utils/validation";
import type { ActionResult } from "@/types/actionResult";

const signupSchema = z
  .object({
    accountId: z
      .string()
      .min(3, "IDは3文字以上で入力してください")
      .max(32, "IDは32文字以下で入力してください")
      .regex(/^[a-zA-Z0-9]+$/, "IDは英数字のみ使用できます"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .max(32, "パスワードは32文字以下で入力してください")
      .regex(/^[\x21-\x7e]+$/, "パスワードは半角英数字・記号のみ使用できます"), //ASCIIの範囲指定でバリデーション
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

/**
 * アカウント作成ServerAction
 * @param formData
 * @returns
 */
export async function signupAction(formData: FormData): Promise<ActionResult> {
  const rawData = {
    accountId: formData.get("accountId") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validationResult = signupSchema.safeParse(rawData);
  if (!validationResult.success) {
    return { success: false, errors: formatZodErrors(validationResult.error) };
  }

  const { accountId: validAccountId, password: validPassword } =
    validationResult.data;

  const existingUser = await prisma.userAccount.findUnique({
    where: { accountId: validAccountId },
  });

  if (existingUser != null) {
    return {
      success: false,
      errors: { accountId: ["このIDは既に使用されています"] },
    };
  }

  const passwordHash = await hashPassword(validPassword);

  // 初期ユーザー名はランダムな文字列を設定（後でプロフィール画面から変更可能）
  const randomName = Math.random() // 0~1の小数
    .toString(36) // 36進数変換
    .slice(2, 10); // 先頭の「0.」を除く8文字
  await prisma.userAccount.create({
    data: {
      accountId: validAccountId,
      passwordHash,
      name: randomName,
    },
  });

  return {
    success: true,
    message: "アカウントが作成されました",
  };
}
