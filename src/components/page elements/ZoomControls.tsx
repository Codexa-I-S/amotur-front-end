'use client'

import { useMap } from 'react-leaflet';

export default function ZoomControls() {
  const map = useMap();

  return (
    <div className='fixed z-[9999] w-full
            flex justify-end px-6 py-30'>
        
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
              w-10 h-10 sm:w-12 sm:h-12
              flex items-center justify-center
              text-xl font-medium
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
              w-10 h-10 sm:w-12 sm:h-12
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