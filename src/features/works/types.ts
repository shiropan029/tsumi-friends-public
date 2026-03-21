export type {
  MediaType,
  WorkState,
  Rating,
  WorkMedia,
  WorkSearchResult,
  WorkDetail,
  UrlMediaType,
} from "@/types/media";
export {
  MEDIA_TYPE_LABELS,
  MEDIA_TYPES,
  MEDIA_TYPE_TO_URL,
  URL_TO_MEDIA_TYPE,
  URL_MEDIA_TYPES,
  WORK_STATES,
  WORK_STATE_LABELS,
  RATING_VALUES,
  RATING_LABELS,
  isValidUrlMediaType,
} from "@/types/media";

import type { MediaType, WorkState, Rating } from "@/types/media";
import type { UserBasicInfo } from "@/types/user";

/**
 * 作品視聴状態のデータ型（rating/reviewはUserWorkReviewに分離済み）
 */
export type UserWorkStateData = {
  userId: string;
  workId: number;
  mediaType: MediaType;
  state: WorkState;
  description: string;
};

/**
 * レビューデータ型
 */
export type ReviewData = UserBasicInfo & {
  rating: Rating;
  review: string;
  updatedAt: Date;
};

import type { ActionResult } from "@/types/actionResult";

/**
 * 作品視聴状態変更ServerActionのレスポンス型
 */
export type WorkActionResult = ActionResult<UserWorkStateData>;
