import type { TimelineItem as TimelineItemData } from "@/types/timeline";
import { TimelineItem } from "@/components/elements/TimelineItem";

/**
 * タイムラインページ
 * フォローしているユーザーの作品状態変更を時系列で表示する
 * @param param0
 * @returns
 */
export function TimelinePage({ items }: { items: TimelineItemData[] }) {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">タイムライン</h1>

      {items.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          タイムラインはまだありません
        </p>
      ) : (
        <div className="divide-y divide-border border border-border rounded-lg">
          {items.map((item, index) => (
            <TimelineItem
              key={`${item.user.userId}-${item.work.workId}-${index}`}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
