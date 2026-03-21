import Link from "next/link";
import { SigninForm } from "./SigninForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

/**
 * ログインページ
 * @returns
 */
export function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">ログイン</CardTitle>
          <CardDescription>
            アカウントIDとパスワードを入力してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            アカウントをお持ちでない方は
            <Link href="/signup" className="text-primary underline ml-1">
              新規アカウント作成
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
