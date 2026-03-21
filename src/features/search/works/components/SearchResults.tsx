import type { WorkSearchResult, MediaType } from "@/features/works/types";
import { MEDIA_TYPE_LABELS } from "@/features/works/types";
import { WorkCard } from "./WorkCard";

type SearchResultsProps = {
  results: WorkSearchResult[];
  isLoading: boolean;
  error: string | null;
  query: string;
  mediaType: MediaType;
  onSelectWork: (id: number) => void;
};

/**
 * 検索結果リスト
 * @param param0
 * @returns
 */
export function SearchResults({
  results,
  isLoading,
  error,
  query,
  mediaType,
  onSelectWork,
}: SearchResultsProps) {
  // メディアタイプの日本語ラベル
  const label = MEDIA_TYPE_LABELS[mediaType];

  // ローディング中
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">検索中...</span>
      </div>
    );
  }

  // エラー
  if (error != null) {
    return (
      <div className="py-4 text-center">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  // クエリが空（初期状態）
  if (query.trim() === "") {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">
          {label}のタイトルを入力して検索してください
        </p>
      </div>
    );
  }

  // 結果なし
  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">
          「{query}」に一致する{label}が見つかりませんでした
        </p>
      </div>
    );
  }

  // 検索結果リスト
  return (
    <div className="divide-y divide-border">
      {results.map((work) => (
        <WorkCard key={work.id} work={work} onClickWork={onSelectWork} />
      ))}
    </div>
  );
}
