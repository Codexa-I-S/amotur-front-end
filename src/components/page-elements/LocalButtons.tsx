'use client'

import { useMap, useMapEvent } from 'react-leaflet'
import React, { useState } from 'react'

type Coordenada = [number, number]

// Interface para representar uma localidade  
interface Localidade {
  nome: string
  coordenadas: Coordenada
}

export default function BotoesLocalidades() {
  const mapa = useMap() // Acessa a instância do mapa
  const mapaCarregado = useMapEvent('load', () => {}) // Verifica se o mapa foi carregado

 
  const localidades: Localidade[] = [
    { nome: 'Icaraí', coordenadas: [-3.027, -39.650] },
    { nome: 'Moitas', coordenadas: [-3.006, -39.694] },
    { nome: 'Caetanos', coordenadas: [-3.078, -39.561] },
    { nome: 'Freicheras', coordenadas: [-3.065,-39.651 ] }
  ]

  // Qual local está selecionado
  const [ativo, setAtivo] = useState<string>(localidades[0].nome)

  //centralizar o mapa 
  const centralizarNoMapa = (local: Localidade) => {
    setAtivo(local.nome)
    mapa.flyTo(local.coordenadas, 16, {
      duration: 1
    })
  }

  // Só renderiza os botões se o mapa estiver carregado
  if (!mapaCarregado) return null

  return (
    <div
  className="
    fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999] 
    flex justify-center items-center gap-2 md:gap-4  md:mb-3
    md:justify-center md:bg-transparent md:w-auto
   bg-[#009089]/87  w-full px-4 py-2  h-[90px]  shadow-md
  rounded-t-3xl 
    
  "
>
  {localidades.map((local) => (
    <button
      key={local.nome}
      onClick={() => centralizarNoMapa(local)}
      aria-current={ativo === local.nome ? 'location' : undefined}
      aria-label={`Centralizar mapa em ${local.nome}`}
      className={`
        flex justify-center items-center
        px-4 py-3 sm:px-8 md:px-14  lg:px-12 md:py-4 cursor-pointer
        text-sm mb-4 mb:text-[15px]  font-semibold
        rounded-3xl  border-1
        transition-all duration-200 
        ${
          ativo === local.nome
            ? 'bg-white text-teal-700 border-teal-700'
            : 'bg-[#009089] text-white border-teal-700 hover:bg-teal-800'
        }
      `}
    >
      {local.nome}
    </button>
  ))}
</div>

  )
}
