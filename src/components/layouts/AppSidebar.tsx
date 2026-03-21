import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarUserFooter } from "./SidebarUserFooter";
import { Clock, Users, Tv, Film, Clapperboard } from "lucide-react";

/**
 * サイドバー
 * 各ページへの遷移と下部にユーザー情報
 * @param param0
 * @returns
 */
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {/* タイムラインリンク */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/timeline">
                  <Clock className="mr-2 h-4 w-4" />
                  タイムライン
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* 検索メニュー */}
        <SidebarGroup>
          <SidebarGroupLabel>検索する</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/search/users">
                    <Users className="mr-2 h-4 w-4" />
                    ユーザー検索
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/search/works?mediaType=anime">
                    <Tv className="mr-2 h-4 w-4" />
                    アニメ検索
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/search/works?mediaType=movie">
                    <Film className="mr-2 h-4 w-4" />
                    映画検索
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/search/works?mediaType=drama">
                    <Clapperboard className="mr-2 h-4 w-4" />
                    ドラマ検索
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
