"use client";

import { useRouter } from "next/navigation";
import { useUserSearch } from "../hooks/useUserSearch";
import { UserSearchResults } from "./UserSearchResults";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/**
 * ユーザー検索ページ
 * @returns
 */
export function UserSearchPage() {
  const router = useRouter();
  const { query, results, isLoading, error, setQuery } = useUserSearch();

  function handleSelectUser(accountId: string) {
    router.push(`/profile/${accountId}`);
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">ユーザーを探す</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ユーザー名またはIDで検索..."
                className="w-full"
                autoFocus
              />
            </div>
            <UserSearchResults
              results={results}
              isLoading={isLoading}
              error={error}
              query={query}
              onSelectUser={handleSelectUser}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
