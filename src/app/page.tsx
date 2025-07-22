'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/NavBar';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getUserRole } from '@/components/page-elements/GetUserRole';

const SimpleMap = dynamic(() => import('@/components/page-elements/SimpleMap'), {
  ssr: false,
});

export default function Home() {
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null)
  
  useEffect(() => {
    const token = localStorage.getItem("authToken")

    if (token) {
      if (getUserRole() === "TURISTA") {
        toast('Seja bem-vindo de volta', {
          duration: 3000,
        })
      }

      if (getUserRole() === "ADMIN") {
        toast('Seja bem-vindo de volta Admin', {
          duration: 3000,
        })
      }
    }
    
  }, [])

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