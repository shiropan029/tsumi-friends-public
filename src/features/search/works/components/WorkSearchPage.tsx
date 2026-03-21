"use client";

import { useRouter } from "next/navigation";
import { useWorkSearch } from "../hooks/useWorkSearch";
import { SearchResults } from "./SearchResults";
import {
  MEDIA_TYPE_LABELS,
  MEDIA_TYPE_TO_URL,
  type MediaType,
} from "@/features/works/types";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/**
 * 作品検索ページ
 * @param param0
 * @returns
 */
export function WorkSearchPage({ mediaType }: { mediaType: MediaType }) {
  const router = useRouter();
  const { query, results, isLoading, error, setQuery } =
    useWorkSearch(mediaType);

  // int値からラベル文字列を取得
  const label = MEDIA_TYPE_LABELS[mediaType];

  // 作品を選択したときに詳細ページへ遷移（URLパスは文字列形式）
  function handleSelectWork(id: number) {
    const mediaTypeUrl = MEDIA_TYPE_TO_URL[mediaType];
    router.push(`/works/${mediaTypeUrl}/${id}`);
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{label}を探す</CardTitle>
          </CardHeader>

          <CardContent>
            {/* 検索フォーム */}
            <div className="mb-4">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`${label}のタイトルを入力...`}
                className="w-full"
                autoFocus
              />
            </div>

            {/* 検索結果 */}
            <SearchResults
              results={results}
              isLoading={isLoading}
              error={error}
              query={query}
              mediaType={mediaType}
              onSelectWork={handleSelectWork}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
