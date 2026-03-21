import type { MediaType, WorkSearchResult, WorkDetail } from "@/types/media";

/**
 * 作品の基本情報
 */
export type WorkBasicInfo = {
  workId: number;
  mediaType: MediaType;
  title: string;
  posterUrl: string | null;
};

/**
 * メディアAPIのインターフェース定義
 */
export type MediaApi = {
  /**
   * 作品をキーワードで検索する
   * @param query
   * @param mediaType
   * @param limit
   */
  searchWorks(
    query: string,
    mediaType: MediaType,
    limit?: number,
  ): Promise<WorkSearchResult[]>;

  /**
   * 作品の詳細情報を取得する
   * @param id
   * @param mediaType
   */
  getWorkDetail(id: number, mediaType: MediaType): Promise<WorkDetail | null>;

  /**
   * 複数の作品情報をIDリストから一括取得する
   * @param works
   */
  getWorksByIds(
    works: { workId: number; mediaType: MediaType }[],
  ): Promise<Map<string, WorkBasicInfo>>;

  /**
   * 作品のユニークキーを生成する
   * @param workId
   * @param mediaType
   */
  getWorkKey(workId: number, mediaType: MediaType): string;

  /**
   * 作品をuniqueにする
   * workIdとmediaTypeの複合キーでuniqueになるようにする
   * 重複データがあるとき、配列indexが後のデータを排除するので、
   * 関数利用側であらかじめソートしておくこと
   * @param workStates
   */
  uniqueByWork<T extends { workId: number; mediaType: number }>(
    workStates: T[],
  ): T[];
};
