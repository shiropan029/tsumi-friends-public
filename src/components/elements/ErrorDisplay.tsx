"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * エラー表示コンポーネント（error.tsx/global-error.tsxから使用）
 * @param param0
 * @returns
 */
export function ErrorDisplay({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>アクセスが集中しております</CardTitle>
          <CardDescription>
            ご不便をおかけして申し訳ございません。
            <br />
            しばらくしてから再度お試しください。
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button onClick={onReset}>もう一度試す</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
