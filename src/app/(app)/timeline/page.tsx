import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { TimelinePage } from "@/features/timeline/components/TimelinePage";
import { getTimeline } from "@/features/timeline/api/getTimeline";

/**
 * タイムラインページ
 * @returns
 */
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    redirect("/signin");
  }

  const items = await getTimeline(session.user.id);

  return <TimelinePage items={items} />;
}
