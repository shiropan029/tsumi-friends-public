"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, LogOut } from "lucide-react";
import { UserInfo } from "@/components/elements/UserInfo";

/**
 * サイドバー下部のユーザー情報表示
 * @param param0
 * @returns
 */
export function SidebarUserFooter() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user == null) {
    return null;
  }

  const { user } = session;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center">
        <SidebarMenuButton
          onClick={() => router.push(`/profile/${user.accountId}`)}
          className="cursor-pointer flex-1"
        >
          <UserInfo
            name={user.name}
            accountId={user.accountId}
            profileImageUrl={user.profileImageUrl}
            size="sm"
          />
        </SidebarMenuButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-md hover:bg-sidebar-accent shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end">
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/signin" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
