import type { ActionResult } from "@/types/actionResult";
import type { UserBasicInfo } from "@/types/user";

/**
 * ユーザー検索ServerActionのレスポンス型
 */
export type SearchUsersResult = ActionResult<UserBasicInfo[]>;
