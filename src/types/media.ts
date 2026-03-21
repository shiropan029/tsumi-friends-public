/**
 * *******************************************************************************
 * MediaType関係
 * *******************************************************************************
 */

// すべてのMediaTypeのint値配列（1:アニメ, 2:映画, 3:ドラマ）
export const MEDIA_TYPES = [1, 2, 3] as const;

/**
 * メディアの種別を表す型（int）
 */
export type MediaType = (typeof MEDIA_TYPES)[number];

// MediaTypeごとの日本語ラベル（UI表示用）
export const MEDIA_TYPE_LABELS: Record<MediaType, string> = {
  1: "アニメ",
  2: "映画",
  3: "ドラマ",
};

// URLパス文字列（anime/movie/drama）の定数配列
export const URL_MEDIA_TYPES = ["anime", "movie", "drama"] as const;

/**
 * URLパス文字列の型
 */
export type UrlMediaType = (typeof URL_MEDIA_TYPES)[number];

// URLパス文字列からMediaType intへの変換マップ
export const URL_TO_MEDIA_TYPE: Record<UrlMediaType, MediaType> = {
  anime: 1,
  movie: 2,
  drama: 3,
};

// MediaType intからURLパス文字列への変換マップ
export const MEDIA_TYPE_TO_URL: Record<MediaType, UrlMediaType> = {
  1: "anime",
  2: "movie",
  3: "drama",
};

/**
 * URLパス文字列のバリデーション関数
 * @param value
 * @returns
 */
export function isValidUrlMediaType(value: string): value is UrlMediaType {
  return URL_MEDIA_TYPES.includes(value as UrlMediaType);
}

/**
 * *******************************************************************************
 * 作品状態・レビュー関係
 * *******************************************************************************
 */

/**
 * メディア作品の基本情報
 */
export type WorkMedia = {
  id: number;
  mediaType: MediaType;
  title: string;
  originalTitle: string;
  posterUrl: string | null;
  overview: string | null;
  releaseDate: string | null;
  homepage: string | null;
};

/**
 * 作品検索結果の型
 */
export type WorkSearchResult = WorkMedia;

/**
 * 作品詳細の型
 */
export type WorkDetail = WorkMedia;

// 作品の視聴状態を表す定数配列（0:未設定, 1:見たい, 2:見てる, 3:見た）
export const WORK_STATES = [0, 1, 2, 3] as const;

/**
 * 作品の視聴状態を表す型（int）
 */
export type WorkState = (typeof WORK_STATES)[number];

// WorkStateごとの日本語ラベル（UI表示用）
export const WORK_STATE_LABELS: Record<WorkState, string> = {
  0: "未設定",
  1: "見たい",
  2: "見てる",
  3: "見た",
};

// 評価値を表す定数配列（1:普通, 10:好き, 100:最高）
export const RATING_VALUES = [1, 10, 100] as const;

/**
 * 評価値を表す型（int）
 */
export type Rating = (typeof RATING_VALUES)[number];

// Ratingごとの日本語ラベル（UI表示用）
export const RATING_LABELS: Record<Rating, string> = {
  1: "普通",
  10: "好き",
  100: "最高",
};
