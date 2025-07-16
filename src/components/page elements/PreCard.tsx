'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import ModalCard from './ModalCard'

type Props = {
  name: string
  type: string
  instagramUrl: string
  email: string
  telefone: string
  description: string
  images: string[]
  logo: string
}

export default function PreCard({
  logo,
  name,
  type,
  instagramUrl,
  email,
  telefone,
  description,
  images,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, 2000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="w-[280px] rounded-2xl overflow-visible">
      <div className="w-full h-[120px] rounded-t-2xl overflow-hidden">
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((src, idx) => (
              <div key={idx} className="flex-[0_0_100%] h-full">
                <img
                  src={src}
                  alt={`Imagem ${idx + 1}`}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-2 pt-2 pb-4">
        <div className="pr-5">
          <span className="text-[15px] font-semibold break-words block">{name}</span>
          <span className="text-amber-600 block">{type}</span>
        </div>

        <div className="absolute right-2 bottom-2">
          <ModalCard
            name={name}
            type={type}
            instagramUrl={instagramUrl}
            email={email}
            telefone={telefone}
            description={description}
            logo={logo}
            images={images}
          />
        </div>
      </div>
    </div>
  )
}
