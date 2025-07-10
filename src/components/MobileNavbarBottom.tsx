import { Button } from "@/components/ui/button"
import { Hotel, BedDouble, Utensils, Menu, Martini } from "lucide-react";

export default function MobileNavbarBottom({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#009089] h-[80px] px-4 flex justify-around items-center md:hidden rounded-t-3xl shadow-md">
      <Button variant="mobileButton" className="h-[50px] w-[50px]">
        <Hotel className="size-6" />
        {/* Hotéis */}
      </Button>
      <Button variant="mobileButton" className="h-[50px] w-[50px]">
        <BedDouble className="size-6" />
        {/* Pousadas */}
      </Button>
      <Button variant="mobileButton" className="h-[50px] w-[50px]">
        <Utensils className="size-6" />
        {/* Restaurantes */}
      </Button>
      <Button variant="mobileButton" className="h-[50px] w-[50px]">
        <Martini className="size-6" />
        {/* Restaurantes */}
      </Button>
      <Button
        onClick={onMenuClick}
        variant="mobileButton" className="h-[50px] w-[50px]">
        <Menu className="size-6" />
        {/* Menu */}
      </Button>
    </div>
  );
}

