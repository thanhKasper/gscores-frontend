import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText } from "lucide-react";
import { NavLink } from "react-router";

const ResultCheckSidebarGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Result Check</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FileText />
              <NavLink to="/result-check">Score Checking</NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ResultCheckSidebarGroup;
