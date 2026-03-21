"use client";

import { ErrorDisplay } from "@/components/elements/ErrorDisplay";

/**
 * エラーページ
 * @param param0
 * @returns
 */
export default function Error({ reset }: { reset: () => void }) {
  return <ErrorDisplay onReset={reset} />;
}
