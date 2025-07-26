"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

type SearchDialogProps = {
  variant?: "desktop" | "mobile";
  setFocusCoords: (coords: [number, number]) => void;

};

type LocalItem = {
  name: string
  coordinates: {
    lat: number;
    lng: number;
  }
}

export function SearchDialog({ variant = "desktop", setFocusCoords }: SearchDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [localsItem, setLocalsItem] = useState<LocalItem[]>([])
  

  // Atalho Ctrl+K para abrir
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/place/all`);

        setLocalsItem(response.data);
      } catch (err) {
        console.error("Erro ao carregar os locais:", err);
      };
    }

    fetchPlaces();

  }, [])

  const handleSearch = (local: LocalItem) => {
    setFocusCoords([local.coordinates.lat, local.coordinates.lng]);
    setOpen(false)

  }
   

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          variant === "mobile"
            ? "flex items-center gap-2 text-[#003f5c] w-full"
            : "text-white hover:scale-110 transition-transform"
        }
      >
        <Search
          size={20}
          strokeWidth={2.5}
          className={variant === "mobile" ? "text-[#003f5c]" : "text-[#003f5c]"}
        />
        {variant === "mobile" && (
          <span className="md:text-base text-zinc-700">Pesquisar</span>
        )}
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar..." />
        <CommandList className="scrollbar-hidden">
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

            {localsItem.map((local, idx) => (
                <CommandItem onSelect={() => {handleSearch(local)}} key={idx}> {local.name} </CommandItem>
              ))
            }

        </CommandList>
      </CommandDialog>
    </>
  );
}
