"use client";

import Image from "next/image";
import { SearchDialog } from "./SearchDialog";
import SideBarLocais from "../page-elements/SideBarLocais";
import { useState } from "react";
import { MdLocationOn, MdHotel, MdRestaurant } from "react-icons/md";
import { FaPizzaSlice, FaMartiniGlass, FaHotel } from "react-icons/fa6";
import Dropdown from "./Dropdown";

type NavbarProps = {
  setFocusCoords: (coords: [number, number] | null) => void;
};

export default function Navbar({ setFocusCoords }: NavbarProps) {
  const [openSheet, setOpenSheet] = useState(false);
  const [categoria, setCategoria] = useState<string>("");
  const [label, setlabel] = useState<string>("");


  const links = [
    { label: "Pontos Turísticos", tipo: "Ponto Turístico", icon: MdLocationOn },
    { label: "Hotéis", tipo: "Hotel", icon: FaHotel },
    { label: "Pousadas", tipo: "Pousada", icon: MdHotel },
    { label: "Restaurantes", tipo: "Restaurante", icon: MdRestaurant },
    { label: "Petiscarias", tipo: "Petiscaria", icon: FaPizzaSlice },
    { label: "Bares", tipo: "Bar", icon: FaMartiniGlass },
  ];

  const handleAbrirCategoria = (tipo: string, label: string) => {
    setCategoria(tipo);
    setlabel(label);
    setOpenSheet(true);
  };

  return (
    <div className="relative z-[1001]">
      {/* Navbar Desktop */}
      <div className="hidden md:flex items-center justify-between px-7 h-16 fixed top-0 left-0 right-0 z-50 bg-[#F9FAFB] text-[#003f5c] tracking-wide">
        <div className="flex-shrink-0">
          <Image
            className="cursor-pointer"
            src="/amotur_blue.png"
            width={100}
            height={80}
            alt="Logo do projeto Amotur"
          />
        </div>

        <div className="flex items-center justify-end flex-grow gap-6 font-medium text-sm uppercase tracking-wide">
          <ul className="flex items-center gap-4">
            {links.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => handleAbrirCategoria(item.tipo, item.label)}
                    className="flex items-center gap-2 text-[#003f5c] hover:text-[#005377] hover:scale-105 duration-500 ease-in-out uppercase px-3 py-1 transition-transform"
                  >
                    <Icon size={16} className="text-[#003f5c]" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <div>
            <SearchDialog setFocusCoords={setFocusCoords}/>
          </div>
          <div>
              <Dropdown/>
          </div>
        </div>
      </div>

      {/* Barra de pesquisa flutuante - mobile */}
      <div className="md:hidden fixed top-6 left-2 right-2 z-[1002] bg-[#F9FAFB]/70 backdrop-blur-md rounded-2xl shadow border px-4 py-2.5 flex items-center gap-3">
        <div className="flex-grow">
          <SearchDialog variant="mobile" setFocusCoords={setFocusCoords} />
        </div>
        <div>
            <Dropdown/>
        </div>
      </div>

      {/* Botões flutuantes no topo - mobile */}
      <div className="md:hidden fixed top-[72px] left-2 right-2 z-[1001] bg-transparent px-2 py-2 overflow-x-auto scrollbar-hide flex items-center gap-2 w-max max-w-full mt-1">
        {links.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleAbrirCategoria(item.tipo, item.label)}
              className="flex items-center gap-2 bg-[#F9FAFB]/70 text-[#003f5c] uppercase text-[13px] px-4 py-2 rounded-2xl shadow-md backdrop-blur-md font-medium tracking-wide hover:bg-teal-50 transition-all whitespace-nowrap"
            >
              <Icon size={14} className="text-[#003f5c]" />
              {item.label}
            </button>
          );
        })}
      </div>

      <SideBarLocais
        tipo={categoria}
        label={label}
        open={openSheet}
        onOpenChange={setOpenSheet}
        setFocusCoords={setFocusCoords}
      />
    </div>
  );
}
