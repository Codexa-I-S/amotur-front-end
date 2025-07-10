"use client";

import Image from "next/image";
import { SearchDialog } from "./SearchDialog";
import { DropdownMenuGenerico } from "./DropdownMenuGenerico";

export default function Navbar() {
  return (
    <div className="relative z-[1001]">
      <div className="hidden md:flex items-center justify-between px-7 h-14 fixed top-0 left-0 right-0 z-50 bg-[#009089] text-white">
        {/* Logo */}
        <div>
          <Image
            className="cursor-pointer"
            src={"/amotur_png.png"}
            width={100}
            height={80}
            alt="Logo-Amotur"
          />
        </div>

        {/* Menu de navegação - apenas desktop */}
        <ul className="hidden md:flex items-center gap-12 font-semibold text-base">
          <li>
            <DropdownMenuGenerico
              label="Hotéis"
              options={["Club de Mar", "De Praia Brasil", "Icaraí Beach"]}
            />
          </li>
          <li>
            <DropdownMenuGenerico
              label="Pousadas"
              options={[
                "Aloha Village",
                "Brisa del Mar",
                "Casa Florzinha",
                "Casa Janjão",
                "Laculá",
              ]}
            />
          </li>
          <li>
            <DropdownMenuGenerico
              label="Bares"
              options={["Sunset", "Temáticos", "Rooftop"]}
            />
          </li>
          <li>
            <DropdownMenuGenerico
              label="Restaurantes"
              options={["Aroma", "Brisa Bistrô", "Fogão de Lenha", "Vivian's"]}
            />
          </li>
          <li>
            <SearchDialog />
          </li>
        </ul>
      </div>
    </div>
  );
}
