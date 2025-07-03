"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink} from "@/components/ui/sidebar"
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function MenuM() {
  const links = [
    {
      label: "Restaurantes",
      href: "#",
      icon: (
         <Image src="/restaurantes.png" width={30} height={30} alt="Restaurantes" />
      ),
    },
    {
      label: "Hotéis",
      href: "#",
      icon: (
        <Image src="/hotel.png" width={30} height={30} alt="Hotéis" />
      ),
    },
    {
      label: "Lojas",
      href: "#",
      icon: (
        <Image src="/lojas.png" width={30} height={30} alt="Lojas" />
      ),
    },
    {
      label: "Locais",
      href: "#",
      icon: (
           <Image src="/map.png" width={30} height={30} alt="Locais" /> 
      ),
    },
    {
      label: "Avaliações",
      href: "#",
      icon: (
           <Image src="/star.png" width={30} height={30} alt="Avaliações" />
      ),
    },
    {
      label: "Pousadas",
      href: "#",
      icon: (
           <Image src="/star.png" width={30} height={30} alt="Avaliações" />
      ),
    }
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "relative z-10 flex flex-col md:flex-row bg-transparent justify-center", 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col items-center  gap-4 flex-1"> {/*"className="justify-between gap-10"*/}
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-10 flex flex-col gap-2 py-20">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Usuario",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-9 w-9 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
