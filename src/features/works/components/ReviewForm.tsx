"use client";

import { useActionState, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitReviewAction } from "../actions/submitReview";
import {
  RATING_VALUES,
  RATING_LABELS,
  type Rating,
  type MediaType,
} from "../types";
import type { ActionResult } from "@/types/actionResult";

type ReviewFormProps = {
  workId: number;
  mediaType: MediaType;
  currentRating?: Rating | null;
  currentReview?: string | null;
  triggerLabel?: string;
  onReviewSaved?: () => void;
};

/**
 * レビュー入力フォーム（ダイアログ形式）
 * @param param0
 * @returns
 */
export function ReviewForm({
  workId,
  mediaType,
  currentRating,
  currentReview,
  triggerLabel = "感想記入",
  onReviewSaved,
}: ReviewFormProps) {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: ActionResult, formData: FormData) => {
      const result = await submitReviewAction(formData);
      if (result.success) {
        onReviewSaved?.();
        setOpen(false);
        toast.success(result.message ?? "感想を保存しました");
      }
      return result;
    },
    { success: false },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>感想を記入</DialogTitle>
          <DialogDescription>
            この作品の評価と感想を入力してください
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="workId" value={workId} />
          <input type="hidden" name="mediaType" value={mediaType} />

          {/* 評価セレクト */}
          <div className="space-y-2">
            <Label htmlFor="rating">評価</Label>
            {/* Select の value は文字列として扱われるため、int値を文字列変換して送信する */}
            <Select
              name="rating"
              defaultValue={
                currentRating != null ? String(currentRating) : undefined
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="評価を選択" />
              </SelectTrigger>
              <SelectContent>
                {RATING_VALUES.map((r) => (
                  // value にはint値を文字列変換したものを使い、表示はラベルを使う
                  <SelectItem key={r} value={String(r)}>
                    {RATING_LABELS[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.rating && (
              <p className="text-sm text-destructive">
                {state.errors.rating[0]}
              </p>
            )}
          </div>

          {/* 感想テキストエリア */}
          <div className="space-y-2">
            <Label htmlFor="review">感想</Label>
            <Textarea
              id="review"
              name="review"
              rows={5}
              defaultValue={currentReview ?? ""}
              placeholder="感想を入力（任意・1000文字以内）"
            />
            {state.errors?.review && (
              <p className="text-sm text-destructive">
                {state.errors.review[0]}
              </p>
            )}
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "保存中..." : "保存する"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
