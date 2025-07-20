'use client'

import { useMap } from 'react-leaflet';
import { Plus, Minus } from 'lucide-react';

export default function ZoomControls() {
  const map = useMap();

  return (
    <div className="fixed z-[9999] right-4 bottom-16">
      <div
        className="
          hidden md:flex flex-col
          rounded-full bg-zinc-100/90 backdrop-blur-sm
          shadow-md border border-[#009089]
          transition-all
        "
      >
        <button
          onClick={() => map.zoomIn()}
          className="
            text-black hover:text-zinc-700
            w-8 h-8 md:w-10 md:h-10
            flex items-center justify-center
            hover:bg-zinc-200/50 active:bg-zinc-300/50
            transition-colors border-b border-zinc-200
          "
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => map.zoomOut()}
          className="
            text-black hover:text-zinc-700
            w-8 h-8 md:w-10 md:h-10
            flex items-center justify-center
            hover:bg-zinc-200/50 active:bg-zinc-300/50
            transition-colors
          "
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
