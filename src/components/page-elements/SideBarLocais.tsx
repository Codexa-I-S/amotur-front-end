// components/LocaisSheet.tsx
'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import axios from "axios"
import PreCard from "./PreCard"
import { Skeleton } from "../ui/skeleton"

type Local = {
  id: string
  name: string
  type: string // ou PointsType, se você tiver esse enum/interface
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
        <SheetHeader className="h-[10%] ">

          <SheetTitle className="text-[#6A87A0]" >{label}</SheetTitle>

        </SheetHeader>

        <div className="flex flex-col justify-start items-center gap-8 overflow-y-auto flex-1 px-2 scrollbar-hidden">
          {loading ? Array.from({ length: expectdeCount }).map((_, i) => (
            <div key={i} className="w-[280px]">
                <Skeleton className="w-full h-45 rounded-xl"/>
            </div>
          ))
          :
            locais.map((local, idx) => (
              <div className="shadow-md rounded-2xl" key={idx}>
                <PreCard
                  key={idx}
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
            ))
          }
        </div>

      </SheetContent>
    </Sheet>

  )
}
