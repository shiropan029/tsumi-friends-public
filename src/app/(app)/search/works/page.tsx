import { WorkSearchPage } from "@/features/search/works/components/WorkSearchPage";
import { isValidUrlMediaType, URL_TO_MEDIA_TYPE } from "@/features/works/types";
import { notFound } from "next/navigation";

/**
 * 作品検索ページ
 * @param param0
 * @returns
 */
export default async function Page({
  searchParams,
}: {
  // クエリパラメータ（?mediaType=animeなど）
  searchParams: Promise<{ mediaType?: string }>;
}) {
  const { mediaType: mediaTypeUrl } = await searchParams;

  // mediaTypeが未指定または不正な値の場合は404
  if (mediaTypeUrl == null || !isValidUrlMediaType(mediaTypeUrl)) {
    notFound();
  }

  // URLパス文字列（anime/movie/drama）をMediaType（1/2/3）に変換
  const mediaType = URL_TO_MEDIA_TYPE[mediaTypeUrl];

  return <WorkSearchPage mediaType={mediaType} />;
}
