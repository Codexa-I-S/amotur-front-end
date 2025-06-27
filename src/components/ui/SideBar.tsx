'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Navbar - mantido como você aprovou */}
      <div className="flex items-center justify-between p-4 px-7 h-24 absolute top-0 left-0 right-0 z-50 bg-[#009089] text-white shadow-md">
        <div className='flex items-center gap-5'>
          <div>
            <button onClick={() => setOpen(!open)}>
              <Image
                src={'/tabler_menu-deep.png'}
                width={40}
                height={40}
                alt="Menu"
                className='cursor-pointer'
              />
            </button>
          </div>
          
          <div>
            <Image
              className="hidden md:block cursor-pointer"
              src={'/amotur_png.png'}
              width={160}
              height={100}
              alt="Logo-Amotur"
            />
          </div>
        </div>
        
        <div className='w-96'>
          <input
            width={60}
            type="text"
            placeholder="Sua localização"
            className="rounded-full px-4 h-12 w-full bg-white py-2 text-gray-700"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#009089] text-white flex flex-col justify-between py-10 transform transition-transform duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '96px' }}
      >
      
        {/* Menu principal*/}
        <ul className="py-10 space-y-3 px-6 text-lg">
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#007a75] p-2 rounded">
            <Image src="/restaurantes.png" width={30} height={30} alt="Restaurantes" />
            Restaurantes
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#007a75] p-2 rounded">
            <Image src="/hotel.png" width={30} height={30} alt="Hotéis" />
            Hotéis
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#007a75] p-2 rounded">
            <Image src="/lojas.png" width={30} height={30} alt="Lojas" />
            Lojas
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#007a75] p-2 rounded">
            <Image src="/map.png" width={30} height={30} alt="Locais" />
            Locais Turísticos
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:bg[#007a75] p-2 rounded">
            <Image src="/star.png" width={30} height={30} alt="Avaliações" />
            Avaliações
          </li>
        </ul>
        
        {/* Menu inferior */}
        <ul className='space-y-3 px-6 text-lg mb-15'>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#007a75] p-2 rounded">
            <Image src="/person.png" width={30} height={30} alt="Perfil" />
            Meu Perfil
          </li>
          <li className="flex items-center gap-4 cursor-pointer hover:bg-[#007a75] p-2 rounded">
            <Image src="/configuraçoes.png" width={30} height={30} alt="Configurações" />
            Configurações
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}