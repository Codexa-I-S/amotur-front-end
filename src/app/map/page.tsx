'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/NavBar';
import NavbarWrapper from '@/components/NavbarWrapper';

const SimpleMap = dynamic(() => import('@/components/page elements/SimpleMap'), {
  ssr: false,
});

export default function Home() {

//   const rounter = useRouter()

  

//   useEffect(() => {
//     const token = localStorage.getItem("authToken")

//     if (!token) {
//       rounter.push("/login")
//     }
//   })


  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <NavbarWrapper />
          <SimpleMap />
        </div>
      </div>
    </div>
  );
}