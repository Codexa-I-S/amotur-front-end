"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchDialog } from "./SearchDialog";

// Ícones preenchidos
import {
  MdHotel,
  MdRestaurant
} from "react-icons/md";
import { FaPizzaSlice, FaMartiniGlass, FaHotel } from "react-icons/fa6";
import { BsGeoAltFill } from "react-icons/bs";

export default function Navbar() {
  const links = [
    { label: "Pontos Turísticos", href: "/", icon: BsGeoAltFill },
    { label: "Hotéis", href: "/", icon: FaHotel }, // Substituído
    { label: "Pousadas", href: "/", icon: MdHotel }, // Mantém cama
    { label: "Restaurantes", href: "/", icon: MdRestaurant },
    { label: "Petiscarias", href: "/", icon: FaPizzaSlice },
    { label: "Bares", href: "/", icon: FaMartiniGlass },
  ];

  return (
    <div className="relative z-[1001]">
      {/* Navbar Desktop */}
      <div className="hidden md:flex items-center justify-between px-7 h-16 fixed top-0 left-0 right-0 z-50 bg-[#009089] text-white">
        <div>
          <Image
            className="cursor-pointer"
            src="/amotur_png.png"
            width={100}
            height={80}
            alt="Logo-Amotur"
          />
        </div>

        <ul className="flex items-center gap-6 font-medium text-base tracking-wide">
          {links.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link href={item.href}>
                  <button className="flex items-center gap-2 text-[#f5f5f5] px-4 py-1 hover:scale-105 transition-transform">
                    <Icon size={18} />
                    {item.label}
                  </button>
                </Link>
              </li>
            );
          })}
          <li>
            <SearchDialog />
          </li>
        </ul>
      </div>

      {/* Mobile: Barra de pesquisa flutuante com estilo atualizado */}
      <div className="md:hidden fixed top-8 left-0 right-0 z-[1002] px-4">
        <div className="bg-white/60 rounded-full px-5 py-4 shadow backdrop-blur-md shadow-gray-300">
          <SearchDialog variant="mobile" />
        </div>
      </div>

      {/* Botões flutuantes no topo - somente mobile */}
      <div className="md:hidden fixed top-20 left-0 right-0 z-[1001] px-2 py-2 overflow-x-auto scrollbar-hide mt-3">
        <div className="flex items-center gap-3 w-max">
          {links.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href}>
                <button className="flex items-center gap-2 bg-[#009089] text-white px-5 py-3 rounded-full whitespace-nowrap shadow-md hover:scale-105 transition text-[15px]">
                  <Icon size={16} />
                  {item.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
