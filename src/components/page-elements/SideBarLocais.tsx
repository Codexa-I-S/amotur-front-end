// components/LocaisSheet.tsx
'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from "react"
import axios from "axios"
import PreCard from "./PreCard"
import { Skeleton } from "../ui/skeleton"

type Local = {
  id: string
  name: string
  type: string
  contacts: {
    email: string
    telefone: string
    site: string
  }
  description: string
  logo: string
  images: string[]
  coordinates: {
    lat: number
    lng: number
  }
  localization: string
}

//Propriedades que o componente recebe
type Props = {
  tipo: string;
  label: string;
  open: boolean
  onOpenChange: (v: boolean) => void
  setFocusCoords: (coords: [number, number]) => void;  // nova prop
}

export default function SideBarLocais({ tipo, label, open, onOpenChange, setFocusCoords }: Props) {

  const [loading, setLoading] = useState(false)
  const [expectdeCount, setExpectedCount] = useState(3)
  const [locais, setLocais] = useState<Local[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [filtroLocais, setFiltroLocais] = useState<Local[]>([])

  useEffect(() => {
    setFiltroLocais(locais)
  }, [locais])

  //Verifica se a tela está em um tamanho mobile para atualizar o componente
  useEffect(() => {

    const checkSize = () => setIsMobile(window.innerWidth < 640)

    checkSize()
    window.addEventListener('resize', checkSize)

    return () => window.removeEventListener('resize', checkSize)

  }, [])

  //faz a requisição dos locais pelo tipo escolhido se o componente estiver aberto
  useEffect(() => {

    if (open) {
      setLoading(true)

      axios.get("https://squad-03-server-production.up.railway.app/place", {
        params: {
          type: tipo
        }
      })

        .then(res => {
          setLocais(res.data)
          setExpectedCount(res.data.length)
        })
        .catch(err => console.error("Erro:", err))
        .finally( () => setLoading(false) )
    }

  }, [tipo, open])

  return (

    <Sheet open={open} onOpenChange={onOpenChange}>
      
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className={`flex flex-col [&>button.absolute]:hidden ${
          isMobile ? "h-[65%]" : "w-[360px] sm:w-[350px] h-full z-[2000]"
        } bg-white`}
        aria-describedby={undefined}
      >
        <SheetHeader className="flex flex-col gap-2 px-4 py-3">
          <SheetTitle className="text-[#6A87A0]">{label}</SheetTitle>

          <Select onValueChange={(valor) => {
            if (valor === "Todos") {
              setFiltroLocais(locais)
            } else {
              const filtrados = locais.filter(local => local.localization === valor)
              setFiltroLocais(filtrados)
            }
          }}>
            <SelectTrigger className="w-full border text-[#0E2C66] border-gray-300 rounded-md focus:ring-1 focus:ring-[#6A87A0] focus:border-[#6A87A0] transition">
              <SelectValue placeholder="Região" />
            </SelectTrigger>

            <SelectContent className="z-[2001] text-[#0E2C66]">
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="Icaraí">Icaraí</SelectItem>
              <SelectItem value="Moitas">Moitas</SelectItem>
              <SelectItem value="Caetanos">Caetanos</SelectItem>
              <SelectItem value="Flecheiras">Flecheiras</SelectItem>
            </SelectContent>
          </Select>

        </SheetHeader>

        <div className="flex flex-col flex-1 items-center overflow-y-auto px-4 gap-8 scrollbar-hidden">
          {loading
            ? Array.from({ length: expectdeCount }).map((_, i) => (
                <div key={i} className="w-[280px]">
                  <Skeleton className="w-full h-45 rounded-xl" />
                </div>
              ))
            : filtroLocais.map((local, idx) => (
                <div className="shadow-md rounded-2xl" key={idx}>
                  <PreCard
                    name={local.name}
                    type={local.type}
                    email={local.contacts.email}
                    telefone={local.contacts.telefone}
                    instagramUrl={local.contacts.site}
                    description={local.description}
                    images={local.images}
                    logo={local.logo}
                    onClick={() => {
                      setFocusCoords([local.coordinates.lat, local.coordinates.lng])
                      onOpenChange(false)
                    }}
                  />
                </div>
              ))}
        </div>
        
      </SheetContent>

    </Sheet>

  )
}
