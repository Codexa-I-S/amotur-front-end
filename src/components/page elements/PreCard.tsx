import ModalCard from "./ModalCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  name: string;
  type: string;
  instagramUrl: string;
  email: string;
  telefone: string;
  description: string;
  images: string[];
  logo: string;
};

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
  return (
    <div className="w-[280px] rounded-2xl overflow-visible">
      
      <div className="w-full h-[120px] rounded-t-2xl overflow-hidden">

        <Carousel opts={{ loop: true }} className="w-full h-full">
          <CarouselContent>
            {images.map((src, idx) => (
              <CarouselItem key={idx} className="h-full">
                <img
                  src={src}
                  alt={`Imagem ${idx + 1}`}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 top-1/2 -translate-y-1/2" />
          <CarouselNext className="right-1 top-1/2 -translate-y-1/2" />
        </Carousel>
        
      </div>

        <div className="relative px-2 pt-2 pb-4" >

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
  );
}
