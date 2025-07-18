"use client"

import { Home, MapPin, Plus, TrendingUp, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Locais",
    url: "#",
    icon: MapPin,
  },
  {
    title: "Adicionar Local",
    url: "#",
    icon: Plus,
  },
  {
    title: "Métricas",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "Usuários",
    url: "#",
    icon: Users,
  },
]

export function AppSidebar() {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r-0">
      <SidebarHeader className="bg-[#3a3a3a] text-white p-3 sm:p-4">
        <div className="flex items-center gap-2">

          <span className="font-bold text-base sm:text-lg group-data-[collapsible=icon]:hidden truncate">
            Amotur
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#3a3a3a]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-[#4a4a4a] hover:text-white data-[active=true]:bg-[#4e73df] data-[active=true]:text-white"
                    isActive={item.title === "Dashboard"}
                  >
                    <a href={item.url} className="flex items-center gap-3 px-3 sm:px-4 py-3">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden text-sm sm:text-base truncate">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
