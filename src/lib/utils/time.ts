/**
 * 相対的な時間表示に変換する
 * @param date
 * @returns
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  // ミリ秒を変換
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (minutes < 1) {
    return "たった今";
  }
  if (minutes < 60) {
    return `${minutes}分前`;
  }
  if (hours < 24) {
    return `${hours}時間前`;
  }
  if (days < 7) {
    return `${days}日前`;
  }
  return date.toLocaleDateString("ja-JP");
}

/**
 * リリース日文字列から「YYYY年M月D日」形式の文字列を生成する
 * @param dateStr
 * @returns
 */
export function formatDateJP(dateStr: string | null): string | null {
  if (dateStr == null) {
    return null;
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0=1月なので+1する
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}
