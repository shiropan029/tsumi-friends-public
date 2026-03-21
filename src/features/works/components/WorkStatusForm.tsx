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
import { updateWorkStateAction } from "../actions/updateWorkState";
import {
  WORK_STATES,
  WORK_STATE_LABELS,
  type WorkState,
  type WorkActionResult,
  type MediaType,
} from "../types";

type WorkStatusFormProps = {
  workId: number;
  mediaType: MediaType;
  currentState: WorkState | null;
  onStateChanged?: (newState: WorkState) => void;
};

/**
 * 作品の視聴状態変更フォーム（ダイアログ形式）
 * @param param0
 * @returns
 */
export function WorkStatusForm({
  workId,
  mediaType,
  currentState,
  onStateChanged,
}: WorkStatusFormProps) {
  const [open, setOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (_prevState: WorkActionResult, formData: FormData) => {
      const result = await updateWorkStateAction(formData);

      if (result.success && result.data != null) {
        onStateChanged?.(result.data.state);
        setOpen(false);
        toast.success(result.message ?? "状態を変更しました");
      }
      return result;
    },
    { success: false },
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            状態変更
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>視聴状態を変更</DialogTitle>
            <DialogDescription>
              この作品の視聴状態を設定してください
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className="space-y-4">
            <input type="hidden" name="workId" value={workId} />
            {/* mediaTypeはint値をフォームに埋め込む */}
            <input type="hidden" name="mediaType" value={mediaType} />

            {/* 状態セレクトボックス */}
            <div className="space-y-2">
              <Label htmlFor="state">状態</Label>
              {/* Select の value は文字列として扱われるため、int値を文字列変換して送信する */}
              <Select
                name="state"
                defaultValue={
                  currentState != null ? String(currentState) : undefined
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="状態を選択" />
                </SelectTrigger>
                <SelectContent>
                  {WORK_STATES.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {WORK_STATE_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.state && (
                <p className="text-sm text-destructive">
                  {state.errors.state[0]}
                </p>
              )}
            </div>

            {/* メモテキストエリア */}
            <div className="space-y-2">
              <Label htmlFor="description">メモ</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                placeholder="メモや感想を入力（任意）"
              />
              {state.errors?.description && (
                <p className="text-sm text-destructive">
                  {state.errors.description[0]}
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
                {isPending ? "変更中..." : "変更する"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
