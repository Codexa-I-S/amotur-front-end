"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/page-elements/app-sidebar"
import { DashboardContent } from "@/components/page-elements/dashboard-content"

export default function Dashboard() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-gray-100">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardContent />
        </div>
      </div>
    </SidebarProvider>
  )
}
