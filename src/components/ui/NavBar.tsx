import Image from "next/image";

export default function Navbar() {
  return (
    <div className="relative z-[1001]">
      <div className="flex items-center justify-between p-4 px-7 h-24 absolute top-0 left-0 right-0 z-50 bg-[#009089] text-white shadow-md">
        <div className='flex items-center gap-5'>
          <div>
            <button>
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
            type="text"
            placeholder="Procure por lugares"
            className="rounded-full px-4 h-12 w-full bg-white py-2 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}