"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signupAction } from "../actions/signup";
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
 * アカウント作成フォーム
 * @returns
 */
export function SignupForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (_prevState: ActionResult, formData: FormData) => {
      return signupAction(formData);
    },
    { success: false },
  );

  // 作成成功後にログインページへ遷移
  useEffect(() => {
    if (state.success) {
      router.replace("/signin");
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
            placeholder="英数字3文字以上"
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
            placeholder="8文字以上"
          />
          {state.errors?.password && (
            <FieldError>{state.errors.password.join("、")}</FieldError>
          )}
        </Field>

        <Field data-invalid={state.errors?.confirmPassword != null}>
          <FieldLabel htmlFor="confirmPassword">パスワード（確認）</FieldLabel>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            placeholder="もう一度入力"
          />
          {state.errors?.confirmPassword && (
            <FieldError>{state.errors.confirmPassword.join("、")}</FieldError>
          )}
        </Field>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "作成中..." : "アカウントを作成"}
        </Button>
      </FieldGroup>
    </form>
  );
}
