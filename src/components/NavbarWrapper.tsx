"use client";

import { useState } from "react";
import MobileNavbarBottom from "./MobileNavbarBottom";
import SideMenuMobile from "./SideMenuMobile";

export default function NavbarWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Aqui pode entrar sua navbar do desktop (já pronta!) */}

      {/* Barra inferior mobile */}
      <MobileNavbarBottom onMenuClick={() => setMenuOpen(true)} />

      {/* Menu lateral mobile */}
      <SideMenuMobile isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
