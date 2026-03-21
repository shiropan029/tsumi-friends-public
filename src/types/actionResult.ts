/**
 * ServerActionの汎用レスポンス型
 * 各機能のServerActionで共通して使用する
 * dataフィールドにジェネリクスで機能固有のデータを指定可能
 */
export type ActionResult<T = void> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
};
