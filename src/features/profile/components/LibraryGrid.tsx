import Link from "next/link";
import Image from "next/image";
import type { LibraryItem } from "../types";
import { WorkStatusBadge } from "@/components/elements/WorkStatusBadge";
import { MEDIA_TYPE_TO_URL } from "@/types/media";

/**
 * ライブラリの作品グリッド表示
 * @param param0
 * @returns
 */
export function LibraryGrid({ items }: { items: LibraryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground py-8">
        ライブラリに作品がありません
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => {
        // URLパス用のmediaType文字列（anime/movie/drama）に変換する
        const mediaTypeUrl = MEDIA_TYPE_TO_URL[item.work.mediaType];
        return (
          <Link
            key={`${item.work.mediaType}-${item.work.workId}`}
            href={`/works/${mediaTypeUrl}/${item.work.workId}`}
            className="group rounded-lg border border-border overflow-hidden hover:bg-muted/50"
          >
            <div className="relative w-full aspect-3/4">
              {item.work.posterUrl != null ? (
                <Image
                  src={item.work.posterUrl}
                  alt={item.work.title}
                  fill
                  sizes="(max-width: 768px) 33vw, 200px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>
            <div className="p-2 space-y-1">
              <p className="text-xs font-medium line-clamp-2">
                {item.work.title}
              </p>
              <div className="flex gap-1 flex-wrap">
                <WorkStatusBadge state={item.state} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
