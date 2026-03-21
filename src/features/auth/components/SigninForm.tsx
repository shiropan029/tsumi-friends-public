"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { signinAction } from "../actions/signin";
import type { ActionResult } from "@/types/actionResult";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

/**
 * ログインフォーム
 * @returns
 */
export function SigninForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (_prevState: ActionResult, formData: FormData) => {
      const result = await signinAction(formData);

      if (result.success) {
        const accountId = formData.get("accountId") as string;
        const password = formData.get("password") as string;

        // サーバー側の認証が成功した後、NextAuthのセッションを確立する
        const signInResult = await signIn("credentials", {
          redirect: false,
          accountId,
          password,
        });

        if (signInResult?.ok !== true) {
          return { success: false, message: "ログイン処理に失敗しました" };
        }

        // ログイン成功時はアカウントIDをメッセージとして返す（遷移先URLの構築に使用）
        return { success: true, message: accountId };
      }

      return result;
    },
    { success: false },
  );

  // ログイン成功後にマイプロフィールページへ遷移
  // state.messageにはログイン成功時のアカウントIDが格納される
  useEffect(() => {
    if (state.success && state.message != null) {
      router.replace(`/profile/${state.message}`);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <FieldGroup>
        {state.message && !state.success && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{state.message}</p>
          </div>
        )}

        <Field data-invalid={state.errors?.accountId != null}>
          <FieldLabel htmlFor="accountId">ID</FieldLabel>
          <Input
            type="text"
            id="accountId"
            name="accountId"
            required
            placeholder=""
          />
          {state.errors?.accountId && (
            <FieldError>{state.errors.accountId.join("、")}</FieldError>
          )}
        </Field>

        <Field data-invalid={state.errors?.password != null}>
          <FieldLabel htmlFor="password">パスワード</FieldLabel>
          <Input
            type="password"
            id="password"
            name="password"
            required
            placeholder=""
          />
          {state.errors?.password && (
            <FieldError>{state.errors.password.join("、")}</FieldError>
          )}
        </Field>

        <Button
          type="submit"
          disabled={isPending || state.success}
          className="w-full"
        >
          {isPending || state.success ? "ログイン中..." : "ログイン"}
        </Button>
      </FieldGroup>
    </form>
  );
}
