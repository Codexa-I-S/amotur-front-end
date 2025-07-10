"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


type CardProps = {
  name: string
  type: string
  instagramUrl: string
  description: string
  images: string[]
  logo: string
}

export default function CardInfo({
  name,
  type,
  instagramUrl,
  description,
  images,
  logo,
}: CardProps) {

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-xl overflow-hidden shadow-md bg-white">
      {/* Carrossel no topo */}
      <Carousel className="w-full opts={{ loop: true }}">
        <CarouselContent>
          {images.map((src, idx) => (
            <CarouselItem key={idx}>
              <Image
                src={src}
                alt={`Imagem ${idx + 1}`}
                width={800}
                height={400}
                className="w-full h-60 md:h-80 object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Informações da empresa */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">

          {/* Logo e nome/tipo */}
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt={`${name} logo`}
              width={48}
              height={48}
              className="rounded-full border object-cover w-12 h-12"
            />

            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-sm text-gray-500">{type}</p>
            </div>
          </div>

          {/* Instagram */}
          <Link
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800"
          >
            <Instagram className="w-6 h-6" />
          </Link>
        </div>

        {/* Descrição */}
        <p className="text-gray-700"> <br/> {description} </p>
      </div>
    </div>    
  )

}