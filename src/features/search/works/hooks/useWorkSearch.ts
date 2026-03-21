"use client";

import { useState, useEffect, useCallback } from "react";
import { searchWorksAction } from "../actions/searchWorks";
import type { WorkSearchResult, MediaType } from "@/features/works/types";

const DEBOUNCE_DELAY = 500;

/**
 * 作品検索のカスタムフック
 * @param mediaType
 * @returns
 */
export function useWorkSearch(mediaType: MediaType) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WorkSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const searchResults = await searchWorksAction(query, mediaType);
        setResults(searchResults);
      } catch (err) {
        console.error("検索エラー:", err);
        setError("検索中にエラーが発生しました");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [query, mediaType]);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearResults = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    results,
    isLoading,
    error,
    setQuery: handleQueryChange,
    clearResults,
  };
}
