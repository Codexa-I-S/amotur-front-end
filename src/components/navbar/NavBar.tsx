"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchDialog } from "./SearchDialog";

export default function Navbar() {
  const links = [
    { label: "Pontos Turísticos", href: "/" },
    { label: "Hotéis", href: "/" },
    { label: "Pousadas", href: "/" },
    { label: "Restaurantes", href: "/" },
    { label: "Petiscarias", href: "/" },
    { label: "Bares", href: "/" },
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

        <ul className="flex items-center gap-6 font-semibold text-base">
          {links.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <button className="text-[#f5f5f5] px-4 py-1 hover:scale-105 transition-transform">
                  {item.label}
                </button>
              </Link>
            </li>
          ))}
          <li>
            <SearchDialog />
          </li>
        </ul>
      </div>

      {/* Mobile: Barra de pesquisa flutuante com estilo personalizado */}
      <div className="md:hidden fixed top-8 left-0 right-0 z-[1002] px-4">
        <div className="bg-white/80 rounded-full px-4 py-3 shadow-md backdrop-blur">
          <SearchDialog variant="mobile" />
        </div>
      </div>

      {/* Botões flutuantes no topo - somente mobile */}
      <div className="md:hidden fixed top-20 left-0 right-0 z-[1001] px-2 py-2 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-3 w-max">
          {links.map((item, index) => (
            <Link key={index} href={item.href}>
              <button className="bg-[#009089] text-white px-4 py-2 rounded-full whitespace-nowrap shadow hover:scale-105 transition text-sm">
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
