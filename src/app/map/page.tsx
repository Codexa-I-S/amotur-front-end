'use client';
import dynamic from 'next/dynamic';
import { MenuM } from '@/components/page elements/SidebarM';
import Navbar from '@/components/ui/NavBar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SimpleMap = dynamic(() => import('@/components/page elements/SimpleMap'), {
  ssr: false,
});

export default function Home() {

  const rounter = useRouter()

  

  useEffect(() => {
    const token = localStorage.getItem("authToken")

    if (!token) {
      rounter.push("/login")
    }
  })


  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <MenuM />
        <div className="flex-1">
          <SimpleMap />
        </div>
      </div>
    </div>
  );
}