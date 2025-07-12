import { AppSidebar } from "@/components/GScoreSidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import ContentLayout from "./ContentLayout";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="px-6 w-full">
        <nav className="py-4">
          <SidebarTrigger />
        </nav>
        <ContentLayout>
          <Outlet />
        </ContentLayout>
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
