import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartArea, Trophy } from "lucide-react";
import { NavLink } from "react-router";

const ScoreStatisticSidebarGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Score Statistics</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <ChartArea />
              <NavLink to="/score-statistics">Score Statistics</NavLink>
            </SidebarMenuButton>
            <SidebarMenuButton>
              <Trophy />
              <NavLink to="/score-ranking">Score Group Ranking</NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ScoreStatisticSidebarGroup;
