"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, User, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      label: "Metricas",
      href: "/dashboard/metricas",
      icon: <IconBrandTabler className="h-7 w-7 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Locais",
      href: "/dashboard/locais",
      icon: <IconUserBolt className="h-7 w-7 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Voltar para o mapa",
      href: "/",
      icon: <IconArrowLeft className="h-7 w-7 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];
  
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(
      "flex w-full flex-1 flex-col overflow-hidden bg-gray-100 dark:bg-neutral-800",
      "h-screen"
    )}>
      {/* Header fixo */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="items-center gap-2 sm:gap-4 flex">
            <button onClick={() => setOpen(!open)} className="p-1 hidden md:flex rounded-md hover:bg-gray-100">
              <Image
                src="/amotur_png.png" 
                alt="Logo da Amotur"
                width={100}
                height={50}
                className="object-contain"
              />
            </button>
            <h1 className="text-xl font-bold text-gray-700 truncate">Painel Administrativo</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Buscar..." className="pl-10 w-48 lg:w-64 bg-gray-50 border-gray-300" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 flex-shrink-0">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">João Silva</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar só aparece em telas md pra cima */}
        <div className="hidden md:flex">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10 ">
              <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>
              <div>
              </div>
            </SidebarBody>
          </Sidebar>
        </div>

        {/* Área de conteúdo */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <div className="h-8 w-8 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre"
      >
        Amotur
      </motion.span>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center justify-center py-1 text-sm font-normal text-black dark:text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};