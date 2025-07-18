"use client";

import Image from "next/image";
import { SearchDialog } from "./SearchDialog";
import SideBarLocais from "../page elements/SideBarLocais";
import { useState } from "react";

export default function Navbar() {
  const [openSheet, setOpenSheet] = useState(false)
  const [categoria, setCategoria] = useState<string>("")
  const [label, setlabel] = useState<string>("")

  const links = [
    { label: "Pontos Turísticos", tipo: "Ponto" },
    { label: "Hotéis", tipo: "Hotel" },
    { label: "Pousadas", tipo: "Pousada" },
    { label: "Restaurantes", tipo: "Restaurante" },
    { label: "Petiscarias", tipo: "Petiscaria" },
    { label: "Bares", tipo: "Bar" },
  ];

  const handleAbrirCategoria = (tipo: string, label:string) => {
    setCategoria(tipo)
    setlabel(label)
    setOpenSheet(true)
  }

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
                <button 
                  onClick={() => handleAbrirCategoria(item.tipo, item.label)}
                  className="text-[#f5f5f5] px-4 py-1 hover:scale-105 transition-transform">
                  {item.label}
                </button>
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
              <button 
                key={index}
                onClick={() => handleAbrirCategoria(item.tipo, item.label)}
                className="bg-[#009089] text-white px-4 py-2 rounded-full whitespace-nowrap shadow hover:scale-105 transition text-sm">
                {item.label}
              </button>
          ))}
        </div>
      </div>

      <SideBarLocais tipo={categoria} label={label} open={openSheet} onOpenChange={setOpenSheet} />
    </div>
  );
}
