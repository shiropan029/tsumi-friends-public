"use client";

import { ErrorDisplay } from "@/components/elements/ErrorDisplay";

/**
 * グローバルエラーページ（layoutがエラーになった時用の表示。サイドバーなし）
 * @param param0
 * @returns
 */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="ja">
      <body>
        <ErrorDisplay onReset={reset} />
      </body>
    </html>
  );
}
