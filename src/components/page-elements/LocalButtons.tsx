"use client";

import { useMap, useMapEvent } from "react-leaflet";
import React, { useState } from "react";

// Ícones
import { FaUmbrellaBeach } from "react-icons/fa6";
import { GiPalmTree, GiSeaStar } from "react-icons/gi";
import { MdOutlineKitesurfing } from "react-icons/md";

type Coordenada = [number, number];

interface Localidade {
  nome: string;
  coordenadas: Coordenada;
  icon: React.ReactNode;
}

export default function BotoesLocalidades() {
  const mapa = useMap();
  const mapaCarregado = useMapEvent("load", () => {});

  const localidades: Localidade[] = [
    {
      nome: "Icaraí",
      coordenadas: [-3.027, -39.65],
      icon: <MdOutlineKitesurfing className="text-lg mr-2" />,
    },
    {
      nome: "Moitas",
      coordenadas: [-3.006, -39.694],
      icon: <GiPalmTree className="text-lg mr-2" />,
    },
    {
      nome: "Caetanos",
      coordenadas: [-3.078, -39.561],
      icon: <GiSeaStar className="text-lg mr-2" />,
    },
    {
      nome: "Flecheiras",
      coordenadas: [-3.065, -39.651],
      icon: <FaUmbrellaBeach className="text-lg mr-2" />,
    },
  ];

  const [ativo, setAtivo] = useState<string>(localidades[0].nome);

  const centralizarNoMapa = (local: Localidade) => {
    setAtivo(local.nome);
    mapa.flyTo(local.coordenadas, 16, {
      duration: 1,
    });
  };

  if (!mapaCarregado) return null;

  return (
    <div
      className="
    fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999] 
    flex md:flex justify-center items-center md:gap-4 md:mb-3
    md:justify-center md:w-auto
    w-full px-2 py-2 h-[140px] md:h-auto
    bg-[#003f5c]/40 md:bg-transparent backdrop-blur rounded-t-3xl md:rounded-none
  "
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:flex md:gap-4">
        {localidades.map((local) => (
          <button
            key={local.nome}
            onClick={() => centralizarNoMapa(local)}
            aria-current={ativo === local.nome ? "location" : undefined}
            aria-label={`Centralizar mapa em ${local.nome}`}
            className={`
    flex justify-center items-center
    px-4 py-3 sm:px-6 md:px-6 lg:px-8 md:py-3 cursor-pointer
    text-sm text-white uppercase tracking-wide font-medium
    rounded-2xl transition-all duration-200
    ${ativo === local.nome ? "bg-[#0077b6]" : "bg-[#003f5c] hover:bg-[#005377]"}
  `}
          >
            {local.icon}
            {local.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
