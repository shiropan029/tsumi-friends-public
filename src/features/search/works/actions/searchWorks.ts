"use server";

import { tmdbMediaApi as mediaApi } from "@/lib/media/tmdbMediaApi";
import { MEDIA_TYPES } from "@/features/works/types";
import type { WorkSearchResult, MediaType } from "@/features/works/types";

/**
 * 作品検索ServerAction
 * @param query
 * @param mediaType
 * @returns
 */
export async function searchWorksAction(
  query: string,
  mediaType: MediaType,
): Promise<WorkSearchResult[]> {
  if (query.trim() === "") {
    return [];
  }

  if (!MEDIA_TYPES.includes(mediaType as MediaType)) {
    return [];
  }

  return mediaApi.searchWorks(query, mediaType);
}
