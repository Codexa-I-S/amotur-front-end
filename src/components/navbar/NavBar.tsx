"use client";

import Image from "next/image";
import { SearchDialog } from "./SearchDialog";
import SideBarLocais from "../page-elements/SideBarLocais";
import { useState } from "react";
import {
  MdLocationOn,
  MdHotel,
  MdRestaurant,
} from "react-icons/md";
import { FaPizzaSlice, FaMartiniGlass, FaHotel } from "react-icons/fa6";


type NavbarProps = {
  setFocusCoords: (coords: [number, number] | null) => void;
}

export default function Navbar({setFocusCoords} : NavbarProps) {
  const [openSheet, setOpenSheet] = useState(false)
  const [categoria, setCategoria] = useState<string>("")
  const [label, setlabel] = useState<string>("")

  const links = [
    { label: "Pontos Turísticos", tipo: "Ponto", icon: MdLocationOn },
    { label: "Hotéis", tipo: "Hotel", icon: FaHotel },
    { label: "Pousadas", tipo: "Pousada", icon: MdHotel },
    { label: "Restaurantes", tipo: "Restaurante", icon: MdRestaurant },
    { label: "Petiscarias", tipo: "Petiscaria", icon: FaPizzaSlice },
    { label: "Bares", tipo: "Bar", icon: FaMartiniGlass },
  ];

  const handleAbrirCategoria = (tipo: string, label:string) => {
    setCategoria(tipo)
    setlabel(label)
    setOpenSheet(true)
  }

  return (
    <div className="relative z-[1001]">
      {/* Navbar Desktop */}
      <div className="hidden md:flex items-center justify-between px-7 h-16 fixed top-0 left-0 right-0 z-50 bg-[#009089] text-white tracking-wide">
        <div className="flex-shrink-0">
          <Image
            className="cursor-pointer"
            src="/amotur_png.png"
            width={100}
            height={80}
            alt="Logo-Amotur"
          />
        </div>

        <div className="flex items-center justify-end flex-grow gap-6 font-semibold text-base">
          <ul className="flex items-center gap-3">
            {links.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => handleAbrirCategoria(item.tipo, item.label)}
                    className="flex items-center gap-2 text-[#f5f5f5] px-4 py-1 hover:scale-105 transition-transform"
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div>
            <SearchDialog />
          </div>
        </div>
      </div>

      {/* Mobile: Barra de pesquisa flutuante com estilo moderno */}
      <div className="md:hidden fixed top-8 left-0 right-0 z-[1002] px-4">
        <div className="bg-white/60 rounded-full px-4 py-3 shadow backdrop-blur-md">
          <SearchDialog variant="mobile" />
        </div>
      </div>

      {/* Botões flutuantes no topo - somente mobile */}
      <div className="md:hidden fixed top-20 left-0 right-0 z-[1001] px-2 py-2 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-3 w-max">
          {links.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleAbrirCategoria(item.tipo, item.label)}
                className="flex items-center gap-2 bg-[#009089] text-white px-6 py-3 rounded-full whitespace-nowrap shadow hover:scale-105 transition text-base"
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <SideBarLocais tipo={categoria} label={label} open={openSheet} onOpenChange={setOpenSheet} setFocusCoords={setFocusCoords} />
    </div>
  );
}
