import Image from "next/image";
import type { WorkSearchResult } from "@/features/works/types";
import { formatDateJP } from "@/lib/utils/time";

/**
 * 作品カード（検索結果の1件分）
 * @param param0
 * @returns
 */
export function WorkCard({
  work,
  onClickWork,
}: {
  work: WorkSearchResult;
  onClickWork: (id: number) => void;
}) {
  // 日付フォーマット変更
  const broadcastInfo = formatDateJP(work.releaseDate);

  return (
    <button
      onClick={() => onClickWork(work.id)}
      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted/50 text-left"
    >
      {/* サムネイル画像 */}
      <div className="shrink-0 w-12 h-16 rounded overflow-hidden bg-muted">
        {work.posterUrl != null ? (
          <Image
            src={work.posterUrl}
            alt={work.title}
            width={48}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            画像なし
          </div>
        )}
      </div>

      {/* テキスト情報 */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate text-sm">{work.title}</p>
        {broadcastInfo != null && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {broadcastInfo}
          </p>
        )}
      </div>
    </button>
  );
}
