  'use client';

  import dynamic from 'next/dynamic';
  import MenuMain from '@/components/page elements/MenuMain';
  const SimpleMap = dynamic(() => import('@/components/page elements/SimpleMap'), {
    ssr: false, 
  });

  export default function Home() {
    return (
      <div>
        <MenuMain/>
        <SimpleMap/>
      </div>
    );
  } 