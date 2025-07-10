import { X, User, Settings, MapPin, Star } from "lucide-react";

export default function SideMenuMobile({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#009089]/70 backdrop-blur-md text-white z-[1002] transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        rounded-r-4xl shadow-xl
      `}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/30">
        <h2 className="text-lg font-medium">Menu</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <ul className="p-6 space-y-6 mt-5">
        <li className="flex items-center gap-4"><User size={18} /> Usuário</li>
        <li className="flex items-center gap-4"><MapPin size={18} /> Locais</li>
        <li className="flex items-center gap-4"><Star size={18} /> Avaliações</li>
        <li className="flex items-center gap-4"><Settings size={18} /> Configurações</li>
      </ul>
    </div>
  );
}
