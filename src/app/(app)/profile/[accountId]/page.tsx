import { ProfilePage } from "@/features/profile/components/ProfilePage";

/**
 * プロフィールページ
 * @param param0
 * @returns
 */
export default async function Page({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const { accountId } = await params;
  return <ProfilePage accountId={accountId} />;
}
