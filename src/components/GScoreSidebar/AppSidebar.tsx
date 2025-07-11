import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ResultCheckSidebarGroup from "./SidebarGroup/ResultCheckSidebarGroup";
import ScoreStatisticSidebarGroup from "./SidebarGroup/ScoreStatisticSidebarGroup";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold text-center">G-Scores</h2>
      </SidebarHeader>
      <SidebarContent>
        <ResultCheckSidebarGroup />
        <ScoreStatisticSidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
