import { WorkDetailPage } from "@/features/works/components/WorkDetailPage";
import { isValidUrlMediaType, URL_TO_MEDIA_TYPE } from "@/features/works/types";
import { notFound } from "next/navigation";

/**
 * 作品詳細ページ
 * URLパスのmediaType文字列（anime/movie/drama）をint値に変換してWorkDetailPageに渡す
 * @param param0
 * @returns
 */
export default async function Page({
  params,
}: {
  params: Promise<{ mediaTypeUrl: string; id: string }>;
}) {
  const { mediaTypeUrl, id } = await params;

  if (!isValidUrlMediaType(mediaTypeUrl)) {
    notFound();
  }

  const mediaType = URL_TO_MEDIA_TYPE[mediaTypeUrl];

  const workId = Number(id);
  if (isNaN(workId) || workId <= 0) {
    notFound();
  }

  return <WorkDetailPage id={workId} mediaType={mediaType} />;
}
