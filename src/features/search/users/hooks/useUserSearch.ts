"use client";

import { useState, useEffect, useCallback } from "react";
import { searchUsersAction } from "../actions/searchUsers";
import type { UserBasicInfo } from "@/types/user";

const DEBOUNCE_DELAY = 500;

/**
 * ユーザー検索のカスタムフック（デバウンス付き）
 * @returns
 */
export function useUserSearch() {
  const [query, setQuery] = useState(""); // 検索文字列
  const [results, setResults] = useState<UserBasicInfo[]>([]); // 検索結果
  const [isLoading, setIsLoading] = useState(false); // ローディング中か
  const [error, setError] = useState<string | null>(null); // エラーメッセージ

  // 検索文字列変更で実行する
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // 入力のたびにタイマーをリセットして、DEBOUNCE_DELAY後に検索を実行
    const timer = setTimeout(async () => {
      try {
        const result = await searchUsersAction(query);

        if (result.success && result.data != null) {
          // 検索結果反映
          setResults(result.data);
        } else {
          setError(result.message ?? "検索エラー");
          setResults([]);
        }
      } catch {
        setError("検索中にエラーが発生しました");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_DELAY);

    // クリーンアップでタイマーリセット(検索も破棄)
    return () => clearTimeout(timer);
  }, [query]);

  // 検索文字列を更新
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  return {
    query,
    results,
    isLoading,
    error,
    setQuery: handleQueryChange,
  };
}
