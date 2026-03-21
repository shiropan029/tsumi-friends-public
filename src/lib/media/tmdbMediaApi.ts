import type { MediaType } from "@/types/media";
import type { WorkSearchResult, WorkDetail } from "@/features/works/types";
import type { MediaApi, WorkBasicInfo } from "./types";

// APIのエンドポイントと画像ベースURL
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

// アニメーションのジャンルID
const ANIMATION_GENRE_ID = 16;

/**
 * TV検索のレスポンス型
 */
type TmdbSearchTvResponse = {
  results: {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    first_air_date: string;
    genre_ids: number[];
  }[];
};

/**
 * 映画検索のレスポンス型
 */
type TmdbSearchMovieResponse = {
  results: {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
  }[];
};

/**
 * TV詳細のレスポンス型
 */
type TmdbTvDetailResponse = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  homepage: string | null;
};

/**
 * 映画詳細のレスポンス型
 */
type TmdbMovieDetailResponse = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  homepage: string | null;
};

/**
 * TV基本情報の型（一括取得用）
 */
type TmdbTvBasic = {
  id: number;
  name: string;
  poster_path: string | null;
};

/**
 * 映画基本情報の型（一括取得用）
 */
type TmdbMovieBasic = {
  id: number;
  title: string;
  poster_path: string | null;
};

/**
 * MediaApiのインターフェースの実態の定義
 */
export const tmdbMediaApi: MediaApi = {
  /**
   * 作品情報を検索する
   * @param query
   * @param mediaType
   * @param limit
   * @returns
   */
  async searchWorks(
    query: string,
    mediaType: MediaType,
    limit: number = 10,
  ): Promise<WorkSearchResult[]> {
    if (query.trim() === "") {
      return [];
    }

    const endpoint = getTmdbEndpoint(mediaType);

    // mediaType 2 = 映画
    if (mediaType === 2) {
      const data = await fetchTmdb<TmdbSearchMovieResponse>(
        `/search/${endpoint}`,
        { query, page: "1" }, // pageで検索結果絞り込み
      );
      return data.results.slice(0, limit).map((item) => ({
        id: item.id,
        mediaType,
        title: item.title,
        originalTitle: item.original_title,
        posterUrl: getTmdbImageUrl(item.poster_path),
        overview: item.overview !== "" ? item.overview : null,
        releaseDate: item.release_date !== "" ? item.release_date : null,
        homepage: null,
      }));
    }

    const data = await fetchTmdb<TmdbSearchTvResponse>(`/search/${endpoint}`, {
      query,
      page: "1",
    });

    // tmdbはアニメとドラマを絞り込んだ状態で検索できないので、取得した後に絞り込みをする
    // mediaType 1 = アニメ
    // mediaType 3 = ドラマ
    const filtered = data.results.filter((item) => {
      const isAnimation = item.genre_ids.includes(ANIMATION_GENRE_ID);
      return mediaType === 1 ? isAnimation : !isAnimation;
    });
    return filtered.slice(0, limit).map((item) => ({
      id: item.id,
      mediaType,
      title: item.name,
      originalTitle: item.original_name,
      posterUrl: getTmdbImageUrl(item.poster_path),
      overview: item.overview !== "" ? item.overview : null,
      releaseDate: item.first_air_date !== "" ? item.first_air_date : null,
      homepage: null,
    }));
  },

  /**
   * 作品の詳細情報を取得する
   * @param id
   * @param mediaType
   * @returns
   */
  async getWorkDetail(
    id: number,
    mediaType: MediaType,
  ): Promise<WorkDetail | null> {
    try {
      const endpoint = getTmdbEndpoint(mediaType);

      // mediaType 2 = 映画
      if (mediaType === 2) {
        const data = await fetchTmdb<TmdbMovieDetailResponse>(
          `/${endpoint}/${id}`,
        );
        return {
          id: data.id,
          mediaType,
          title: data.title,
          originalTitle: data.original_title,
          posterUrl: getTmdbImageUrl(data.poster_path),
          overview: data.overview !== "" ? data.overview : null,
          releaseDate: data.release_date !== "" ? data.release_date : null,
          homepage: data.homepage,
        };
      }

      const data = await fetchTmdb<TmdbTvDetailResponse>(`/${endpoint}/${id}`);
      return {
        id: data.id,
        mediaType,
        title: data.name,
        originalTitle: data.original_name,
        posterUrl: getTmdbImageUrl(data.poster_path),
        overview: data.overview !== "" ? data.overview : null,
        releaseDate: data.first_air_date !== "" ? data.first_air_date : null,
        homepage: data.homepage,
      };
    } catch (error) {
      console.error("作品詳細取得エラー:", error);
      return null;
    }
  },

  /**
   * 複数の作品情報をIDリストから一括取得する
   * @param works
   * @returns
   */
  async getWorksByIds(
    works: { workId: number; mediaType: MediaType }[],
  ): Promise<Map<string, WorkBasicInfo>> {
    if (works.length === 0) {
      return new Map();
    }

    // 全作品を並列で取得する。取得失敗した場合はnullを返して結果から除外する
    const results = await Promise.all(
      works.map(async ({ workId: id, mediaType }) => {
        try {
          const endpoint = getTmdbEndpoint(mediaType);
          // mediaType 2 = 映画
          if (mediaType === 2) {
            const data = await fetchTmdb<TmdbMovieBasic>(`/${endpoint}/${id}`);
            return {
              workId: data.id,
              mediaType,
              title: data.title,
              posterUrl: getTmdbImageUrl(data.poster_path),
            } satisfies WorkBasicInfo;
          } else {
            const data = await fetchTmdb<TmdbTvBasic>(`/${endpoint}/${id}`);
            return {
              workId: data.id,
              mediaType,
              title: data.name,
              posterUrl: getTmdbImageUrl(data.poster_path),
            } satisfies WorkBasicInfo;
          }
        } catch {
          return null;
        }
      }),
    );

    const map = new Map<string, WorkBasicInfo>();
    for (const work of results) {
      if (work != null) {
        map.set(tmdbMediaApi.getWorkKey(work.workId, work.mediaType), work);
      }
    }
    return map;
  },

  /**
   * 作品のユニークキーを生成する
   * @param workId
   * @param mediaType
   * @returns
   */
  getWorkKey(workId: number, mediaType: MediaType): string {
    return `${mediaType}:${workId}`;
  },

  /**
   * 作品をuniqueにする
   * workIdとmediaTypeの複合キーでuniqueになるようにする
   * 重複データがあるとき、配列indexが後のデータを排除するので、
   * 関数利用側であらかじめソートしておくこと
   * @param workStates
   * @returns
   */
  uniqueByWork<T extends { workId: number; mediaType: number }>(
    workStates: T[],
  ): T[] {
    const seen = new Set<string>();
    const result: T[] = [];

    for (const ws of workStates) {
      const mediaType = ws.mediaType as MediaType;
      const key = tmdbMediaApi.getWorkKey(ws.workId, mediaType);

      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      result.push(ws);
    }

    return result;
  },
};

/**
 * TMDB APIへのリクエストを実行する共通関数
 * @param endpoint
 * @param params
 * @returns
 */
async function fetchTmdb<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  // 環境変数取得
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (accessToken == null || accessToken === "") {
    throw new Error("TMDB_ACCESS_TOKEN が設定されていません");
  }

  // urlの組み立て
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("language", "ja-JP"); // 日本語レスポンス
  // クエリがあれば追加
  if (params != null) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    next: { revalidate: 60 * 60 }, // 作品の更新はそんなにないと思うので1時間結果をキャッシュ
  });

  if (!response.ok) {
    throw new Error(`TMDB API エラー: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/**
 * TMDBのposter_pathからフルURLを生成する
 * @param path
 * @param size
 * @returns
 */
function getTmdbImageUrl(
  path: string | null,
  size: string = "w500",
): string | null {
  if (path == null || path === "") {
    return null;
  }
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

/**
 * アニメとドラマはTMDBのtvエンドポイントを使用する
 * 映画/ドラマ・アニメで使用するapiが異なる
 * mediaType: 1 = アニメ → "tv"
 * mediaType: 2 = 映画   → "movie"
 * mediaType: 3 = ドラマ → "tv"
 * @param mediaType
 * @returns
 */
function getTmdbEndpoint(mediaType: MediaType): string {
  return mediaType === 2 ? "movie" : "tv";
}
