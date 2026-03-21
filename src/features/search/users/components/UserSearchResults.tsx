import type { UserBasicInfo } from "@/types/user";
import { UserCard } from "./UserCard";

type UserSearchResultsProps = {
  results: UserBasicInfo[];
  isLoading: boolean;
  error: string | null;
  query: string;
  onSelectUser: (accountId: string) => void;
};

/**
 * ユーザー検索結果リスト
 * @param param0
 * @returns
 */
export function UserSearchResults({
  results,
  isLoading,
  error,
  query,
  onSelectUser,
}: UserSearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="ml-2 text-sm text-muted-foreground">検索中...</span>
      </div>
    );
  }

  if (error != null) {
    return (
      <div className="py-4 text-center">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (query.trim() === "") {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">
          ユーザー名またはIDを入力して検索してください
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-sm">
          「{query}」に一致するユーザーが見つかりませんでした
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {results.map((user) => (
        <UserCard key={user.userId} user={user} onClickUser={onSelectUser} />
      ))}
    </div>
  );
}
