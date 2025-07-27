"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { MdEmail, MdWhatsapp } from "react-icons/md"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getUserRole } from "../page-elements/GetUserRole"

type CardProps = {
  name: string
  type: string
  instagramUrl: string
  email?: string
  telefone?: string
  description: string
  images: string[]
  logo: string
}

export default function CardInfo({
  name,
  type,
  instagramUrl,
  email,
  telefone,
  description,
  images,
  logo,
}: CardProps) {
  return (
    <div className="w-full max-w-md md:max-w-2xl mx-auto rounded-xl bg-white overflow-hidden">
      {/* Carrossel de Imagens */}
      <Carousel opts={{ loop: true }} className="w-full relative">
        <CarouselContent>
          {images.map((src, idx) => (
            <CarouselItem key={idx}>
              <Image
                src={src}
                width={500}
                height={200}
                alt={`Imagem ${idx + 1}`}
                className="w-full h-60 sm:h-72 md:h-80 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 top-1/2 -translate-y-1/2" />
        <CarouselNext className="right-1 top-1/2 -translate-y-1/2" />
       
      </Carousel>

      {/* Informações */}
      <div className="p-4 space-y-4">
        {/* Topo: Logo, Nome, Tipo, Instagram */}
        <div className="flex items-start justify-between gap-2">
          {/* Logo + Nome + Tipo */}
          <div className="flex items-center gap-3 overflow-hidden">
              <Image
                src={logo}
                width={50}
                height={50}
                alt={`${name} logo`}
                className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full border object-cover flex-shrink-0"
              />
            <div className="min-w-0 flex flex-col">
              <h2 className="text-lg sm:text-xl font-bold break-words leading-snug">
                {name}
              </h2>
              <p className="text-sm text-gray-500 truncate">{type}</p>
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-center items-center">
            {/* Instagram */}
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 flex-shrink-0"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            {telefone && (
                <Link
                  href={`https://wa.me/55${telefone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-green-600"
                >
                  <MdWhatsapp className="w-6 h-6 "/>
                </Link>
              )
            }
            
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-700 text-sm sm:text-base">{description}</p>

        {/* Contato */}
        <div className="flex flex-col gap-2 text-gray-700">
          {getUserRole() === 'ADMIN' && (

            <div className="flex items-center gap-2">
              <MdEmail className="text-xl text-blue-600" />
              <span className="text-sm">{email}</span>
            </div>

            )
          }

          
        </div>
      </div>
    </div>
  )
}