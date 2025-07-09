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
    { nome: 'Moitas', coordenadas: [-3.014, -39.687] },
    { nome: 'Caetanos', coordenadas: [-3.081, -39.560] }
  ]

  // Qual local está selecionado
  const [ativo, setAtivo] = useState<string>(localidades[0].nome)

  //centralizar o mapa 
  const centralizarNoMapa = (local: Localidade) => {
    setAtivo(local.nome)
    mapa.flyTo(local.coordenadas, 15, {
      duration: 1
    })
  }

  // Só renderiza os botões se o mapa estiver carregado
  if (!mapaCarregado) return null

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex gap-4 bg-transparent">
      {localidades.map((local) => (
        <button
          key={local.nome}
          onClick={() => centralizarNoMapa(local)}
          aria-current={ativo === local.nome ? 'location' : undefined}
          aria-label={`Centralizar mapa em ${local.nome}`}
          className={`
            px-10 py-4 rounded-full text-sm font-semibold border-2 w-50 mb-8
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
