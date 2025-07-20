"use client"

import * as React from "react"
import { PanelLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"

type SidebarContextProps = {
  isCollapsed: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

function SidebarProvider({
  children,
  defaultCollapsed = true,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const toggleSidebar = React.useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const contextValue = React.useMemo(() => ({
    isCollapsed,
    toggleSidebar,
  }), [isCollapsed, toggleSidebar])

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties}
        className="group/sidebar-wrapper"
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  className,
  children,
}: {
  side?: "left" | "right"
  className?: string
  children: React.ReactNode
}) {
  const { isCollapsed } = useSidebar()

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-10 hidden h-svh transition-all duration-200 ease-in-out md:flex",
        side === "left" ? "left-0" : "right-0",
        isCollapsed ? "w-[var(--sidebar-width-icon)]" : "w-[var(--sidebar-width)]",
        "hover:w-[var(--sidebar-width)]", // Expand on hover
        className
      )}
    >
      <div className="flex h-full w-full flex-col bg-background border-r">
        {children}
      </div>
    </div>
  )
}

function SidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={toggleSidebar}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarHeader({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("flex items-center p-4 border-b", className)}>
      {children}
    </div>
  )
}

function SidebarContent({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-2", className)}>
      {children}
    </div>
  )
}

function SidebarMenu({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <ul className={cn("space-y-1", className)}>
      {children}
    </ul>
  )
}

function SidebarMenuItem({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <li className={cn("relative", className)}>
      {children}
    </li>
  )
}

function SidebarMenuButton({
  className,
  children,
  icon,
}: {
  className?: string
  children: React.ReactNode
  icon: React.ReactNode
}) {
  const { isCollapsed } = useSidebar()

  return (
    <button
      className={cn(
        "flex items-center w-full p-2 rounded-md transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "text-sm font-medium",
        className
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className={cn(
        "ml-3 truncate",
        "opacity-0 transition-opacity duration-200",
        "group-hover/sidebar-wrapper:opacity-100", // Show text on sidebar hover
        !isCollapsed && "opacity-100" // Always show if expanded
      )}>
        {children}
      </span>
    </button>
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
}