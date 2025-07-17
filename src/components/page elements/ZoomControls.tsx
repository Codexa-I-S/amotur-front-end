'use client'

import { useMap } from 'react-leaflet';

export default function ZoomControls() {
  const map = useMap();

  return (
    <div className='fixed z-[9999] right-6 top-36'>
        
        <div
          className="
           
            rounded-full bg-zinc-100/90 backdrop-blur-sm
            shadow-lg border-2 border-[#009089]
            hover:bg-zinc-100 transition-all hover:rounded-full
          "
        >
          <button
            onClick={() => map.zoomIn()}
            className="
              text-black hover:text-zinc-700 hover:rounded-full
              w-9 h-9 md:h-12 md:w-12
              flex items-center justify-center
              text-xl font-sm
              hover:bg-zinc-200/50 active:bg-zinc-300/50
              transition-colors
              border-b border-zinc-200
            "
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => map.zoomOut()}
            className="
              text-black hover:text-zinc-700 hover:rounded-full
              w-9 h-9 md:h-12 md:w-12
              flex items-center justify-center
              text-xl font-medium
              hover:bg-zinc-200/50 active:bg-zinc-300/50
              transition-colors
            "
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
    </div>
  );
}