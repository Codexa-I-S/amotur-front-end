"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Home, LogOut, MapPin, BarChart2} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isClient) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { href: "#visao-geral", icon: Home, label: "Visão Geral" },
    { href: "#graficos", icon: BarChart2, label: "Análise de Gráficos" },
    { href: "#tabela-locais", icon: MapPin, label: "Gerenciar Locais" },
    { href: "/", icon: LogOut, label: "Voltar ao Mapa",className: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30" },
  ];

  return (
    <div className={cn(
      "flex w-full flex-1 flex-col overflow-hidden bg-gray-100 dark:bg-neutral-800",
      "h-screen"
    )}>
      {/* Header fixo */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="items-center gap-2 sm:gap-4 flex">
            {/* Botão de menu removido já que não teremos sidebar mobile */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 hidden md:block"
            >
              <Image
                src="/Litormap.png" 
                alt="Logo da Amotur"
                width={100}
                height={50}
                className="object-contain dark:filter dark:brightness-0 dark:invert"
              />
            </button>
            <h1 className="text-xl ml-3 font-semibold text-gray-700 dark:text-gray-200 truncate">
              Painel Administrativo
            </h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar apenas para desktop */}
        <aside className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-col z-10",
          "hidden md:flex",
          sidebarOpen ? "w-64" : "w-20",
          "dark:bg-neutral-900 dark:border-neutral-700"
        )}>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => {
                const isAnchor = item.href.startsWith('#');
                const isActive = isClient && (pathname === item.href || 
                  (isAnchor && window.location.hash === item.href));

                if (isAnchor) {
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href.substring(1))}
                      className={cn(
                        "flex items-center p-3 rounded-lg transition-colors w-full text-left",
                        isActive 
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800",
                        sidebarOpen ? "justify-start" : "justify-center",
                        item.className
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {sidebarOpen && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </button>
                  );
                } else {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center p-3 rounded-lg transition-colors",
                        isActive 
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800",
                        sidebarOpen ? "justify-start" : "justify-center",
                        item.className
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {sidebarOpen && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </Link>
                  );
                }
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-600 dark:hover:bg-neutral-800 dark:text-gray-300"
            >
              <ChevronDown className={cn(
                "h-5 w-5 transform transition-transform",
                sidebarOpen ? "rotate-90" : "-rotate-90"
              )} />
              {sidebarOpen && <span className="ml-2">Recolher</span>}
            </button>
          </div>
        </aside>

        {/* Área de conteúdo */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </div>
  );
}