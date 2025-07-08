"use client";

import Image from "next/image";
import { SearchDialog } from "./SearchDialog";
import { DropdownMenuGenerico } from "./DropdownMenuGenerico";

export default function Navbar() {
  return (
    <div className="relative z-[1001]">
      <div className="flex items-center justify-between px-7 h-14 absolute top-0 left-0 right-0 z-50 bg-[#009089] text-white">
        {/* Logo - fica à esquerda */}
        <div>
          <Image
            className="hidden md:block cursor-pointer"
            src={"/amotur_png.png"}
            width={100}
            height={80}
            alt="Logo-Amotur"
          />
        </div>

        {/* Links - ficam à direita */}
        <ul className="flex items-center gap-12 font-semibold text-base">
          <li className="transition-transform duration-200 ease-in-out hover:scale-110">
            <DropdownMenuGenerico
              label="Hotéis"
              options={["Club de Mar", "De Praia Brasil", "Icaraí Beach"]}
            />
          </li>
          <li className="transition-transform duration-200 ease-in-out hover:scale-110">
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
          <li className="transition-transform duration-200 ease-in-out hover:scale-110">
            <DropdownMenuGenerico
              label="Bares"
              options={["Sunset", "Temáticos", "Rooftop"]}
            />
          </li>
          <li className="transition-transform duration-200 ease-in-out hover:scale-110">
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
