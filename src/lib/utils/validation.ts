import type { ZodError } from "zod";

/**
 * ZodのZodErrorからフィールドごとのエラーメッセージを整形する
 * @param error ZodのsafeParseで得られたZodError
 * @returns フィールド名をキー、エラーメッセージ配列を値とするRecord
 */
export function formatZodErrors(error: ZodError): Record<string, string[]> {
  const errorRecord: Record<string, string[]> = {};
  error.issues.forEach((issue) => {
    const path = issue.path[0] as string; // フィールド名
    if (errorRecord[path] == null) {
      errorRecord[path] = [];
    }
    errorRecord[path].push(issue.message); // メッセージ
  });
  return errorRecord;
}
