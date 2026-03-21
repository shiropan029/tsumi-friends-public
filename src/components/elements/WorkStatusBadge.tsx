import { Badge } from "@/components/ui/badge";
import type { WorkState } from "@/types/media";
import { WORK_STATE_LABELS } from "@/types/media";

// 見た目変更値
const STATE_VARIANT: Record<WorkState, "default" | "secondary" | "outline"> = {
  0: "outline", // 未設定
  1: "secondary", // 見たい
  2: "default", // 見てる
  3: "default", // 見た
};

/**
 * 視聴状態をバッジ
 * @param param0
 * @returns
 */
export function WorkStatusBadge({ state }: { state: WorkState }) {
  return (
    <Badge variant={STATE_VARIANT[state]}>{WORK_STATE_LABELS[state]}</Badge>
  );
}
