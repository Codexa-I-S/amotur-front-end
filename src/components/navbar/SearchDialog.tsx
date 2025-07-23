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

type SearchDialogProps = {
  variant?: "desktop" | "mobile";
};

export function SearchDialog({ variant = "desktop" }: SearchDialogProps) {
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          variant === "mobile"
            ? "flex items-center gap-2 text-[#6A87A0] w-full"
            : "text-white hover:scale-110 transition-transform"
        }
      >
        <Search
          size={20}
          strokeWidth={2.5}
          className={variant === "mobile" ? "text-[#6A87A0]" : "text-white"}
        />
        {variant === "mobile" && (
          <span className="md:text-base text-zinc-700">Pesquisar</span>
        )}
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandItem>Hotéis</CommandItem>
          <CommandItem>Pousadas</CommandItem>
          <CommandItem>Restaurantes</CommandItem>
        </CommandList>
      </CommandDialog>
    </>
  );
}
