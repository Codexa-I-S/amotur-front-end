'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/NavBar';
import { useState } from 'react';

const SimpleMap = dynamic(() => import('@/components/page elements/SimpleMap'), {
  ssr: false,
});

export default function Home() {
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null)

  return (
    <div className="flex flex-col h-screen">
      <Navbar setFocusCoords={setFocusCoords} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <SimpleMap focusCoords={focusCoords} setFocusCoords={setFocusCoords}/>
        </div>
      </div>
    </div>
  );
}