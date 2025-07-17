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
    lon: number
  }
}

//Propriedades que o componente recebe
type Props = {
  tipo: string
  open: boolean
  onOpenChange: (v: boolean) => void
}

export default function SideBarLocais({ tipo, open, onOpenChange }: Props) {

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

      const token = localStorage.getItem("authToken");
        
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      axios.get("https://squad-03-server-production.up.railway.app/place", {
        params: {
          type: tipo
        },
        headers: {
            'Authorization': `Bearer ${token}`
          }
      })

        .then(res => {
          setLocais(res.data)
        })
        .catch(err => console.error("Erro:", err))
    }

  }, [tipo, open])

  return (

    <Sheet open={open} onOpenChange={onOpenChange}>
      
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className={`flex flex-col ${
          isMobile ? "h-[65%]" : "w-[360px] sm:w-[350px] h-full z-[2000]"
        } bg-white/10 backdrop-blur-lg border border-white/20`}
        aria-describedby={undefined}
      >
        <SheetHeader className="h-[10%] ">

          <SheetTitle className="text-white" >{tipo}</SheetTitle>

        </SheetHeader>

        <div className="flex flex-col justify-start items-center gap-8 overflow-y-auto flex-1 px-2 scrollbar-hidden">

          {locais.map((local, idx) => (
            <PreCard
              key={idx}
              name={local.name}
              type={local.type}
              email={local.contacts.email}
              telefone={local.contacts.telefone}
              instagramUrl={local.contacts.site} // ou outro campo
              description={local.description}
              images={local.images}
              logo={local.logo}
            />
          ))}

        </div>

      </SheetContent>
    </Sheet>

  )
}
