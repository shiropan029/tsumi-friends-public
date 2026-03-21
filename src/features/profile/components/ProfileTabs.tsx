"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimelineItem } from "@/components/elements/TimelineItem";
import { LibraryGrid } from "./LibraryGrid";
import type { TimelineItem as TimelineItemData } from "@/types/timeline";
import type { LibraryItem } from "../types";
import { MEDIA_TYPE_LABELS, MEDIA_TYPES } from "@/types/media";

// 「すべて」のメディアタイプを表すフィルター値
const ALL_MEDIA_TYPES = -1;

/**
 * 記録・ライブラリの表示(タブ切り替え)
 * @param param0
 * @returns
 */
export function ProfileTabs({
  recordItems,
  libraryItems,
}: {
  recordItems: TimelineItemData[];
  libraryItems: LibraryItem[];
}) {
  const [mediaTypeFilter, setMediaTypeFilter] = useState(ALL_MEDIA_TYPES);

  // メディアタイプでライブラリを絞り込む
  const filteredLibrary = useMemo(() => {
    if (mediaTypeFilter === ALL_MEDIA_TYPES) {
      return libraryItems;
    }
    return libraryItems.filter(
      (item) => item.work.mediaType === mediaTypeFilter,
    );
  }, [libraryItems, mediaTypeFilter]);

  function handleMediaTypeChange(value: string) {
    setMediaTypeFilter(Number(value));
  }

  return (
    <Tabs defaultValue="records">
      <TabsList className="w-full">
        <TabsTrigger value="records" className="flex-1">
          記録
        </TabsTrigger>
        <TabsTrigger value="library" className="flex-1">
          ライブラリ
        </TabsTrigger>
      </TabsList>

      {/* 記録 */}
      <TabsContent value="records">
        {recordItems.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            記録がありません
          </p>
        ) : (
          <div className="divide-y divide-border">
            {recordItems.map((item, index) => (
              <TimelineItem key={`${item.work.workId}-${index}`} item={item} />
            ))}
          </div>
        )}
      </TabsContent>

      {/* ライブラリ */}
      <TabsContent value="library">
        <div className="flex items-center gap-2 mb-4">
          {/* メディアタイプフィルター */}
          <Select
            value={String(mediaTypeFilter)}
            onValueChange={handleMediaTypeChange}
          >
            <SelectTrigger className="w-35">
              <SelectValue placeholder="ジャンル" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={String(ALL_MEDIA_TYPES)}>すべて</SelectItem>
              {MEDIA_TYPES.map((mediaType) => (
                <SelectItem key={mediaType} value={String(mediaType)}>
                  {MEDIA_TYPE_LABELS[mediaType]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <LibraryGrid items={filteredLibrary} />
      </TabsContent>
    </Tabs>
  );
}
