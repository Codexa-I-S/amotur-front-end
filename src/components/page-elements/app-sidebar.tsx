"use client"

import { Home, MapPin, Plus, TrendingUp, Users } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Métricas",
    url: "/metricas",
    icon: <TrendingUp className="h-4 w-4" />,
  },  
  {
    title: "Locais",
    url: "/dashboard/locais",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Adicionar Local",
    url: "#",
    icon: <Plus className="h-4 w-4" />,
  },
  {
    title: "Usuários",
    url: "#",
    icon: <Users className="h-4 w-4" />,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-[] text-black">
      <SidebarHeader className="p-4 border-b border-[#4a4a4a]">
        <div className="flex items-center gap-2">
          <span className={
            "font-bold text-lg truncate " +
            "opacity-0 transition-opacity duration-200 " +
            "group-hover/sidebar-wrapper:opacity-100"
          }>
            Amotur
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                icon={item.icon}
                className="hover:bg-[#4a4a4a] data-[active=true]:bg-[#4e73df]"
              >
                <a href={item.url} className="block w-full">
                  {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}