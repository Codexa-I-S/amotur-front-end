"use client";

import React from "react";

interface DropdownMenuGenericoProps {
  label: string;
  options: string[];
}

export function DropdownMenuGenerico({ label, options }: DropdownMenuGenericoProps) {
  return (
    <div className="relative group">
      {/* Botão que ativa o dropdown */}
      <button className="text-base font-semibold px-2 transition-transform group-hover:scale-100">
        {label}
      </button>

      {/* Menu que aparece no hover */}
      <div className="absolute top-full left-0 mt-3 w-35 bg-[#009089] text-white rounded-none shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {options.map((option, index) => (
          <div
            key={index}
            className="px-4 py-2 text-sm hover:bg-[#007878] cursor-pointer"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

