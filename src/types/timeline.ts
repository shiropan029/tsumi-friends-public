import type { WorkState } from "@/types/media";
import type { WorkBasicInfo } from "@/lib/media/types";
import type { UserBasicInfo } from "@/types/user";

/**
 * タイムラインのアイテム
 */
export type TimelineItem = {
  user: UserBasicInfo;
  work: WorkBasicInfo;
  state: WorkState;
  description: string;
  updatedAt: Date;
};
