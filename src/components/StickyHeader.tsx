'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWizard } from './WizardContext';

const navItems = [
  { label: 'Proyectos', href: '#work' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proceso', href: '#process' },
  { label: 'Contacto', href: '#contact' },
];

export default function StickyHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openWizard } = useWizard();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#212525]/80 backdrop-blur-md border-b border-[#1f2a33] h-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1360px] mx-auto h-full flex items-center justify-between">
        
        {/* Left side: Clean Brand Logo JPG (No border/outline) */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.jpg"
            alt="Clickshop"
            width={220}
            height={60}
            className="h-12 md:h-14 w-auto rounded-lg object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[#ddffdc] text-[14px] font-medium tracking-[-0.026em] transition-colors hover:text-[#7fee64]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: CTA (Desktop) - Triggers Conversion Wizard */}
        <div className="hidden md:block">
          <button
            onClick={openWizard}
            className="inline-block bg-[#7fee64] text-[#000000] rounded-full px-6 py-2.5 font-medium transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(127,238,100,0.3)] text-[14px] font-sans tracking-tight"
          >
            INICIAR PROYECTO
          </button>
        </div>

        {/* Mobile menu toggle — Oculto en móvil (Navegación cubierta ergonómicamente por MobileBottomNav) */}
        <button
          className="hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Alternar menú"
        >
          <span className={`block w-5 h-[2px] bg-[#ddffdc] transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-[2px] bg-[#ddffdc] transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[2px] bg-[#ddffdc] transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#212525] border-b border-[#485346] px-6 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#ddffdc] text-[16px] font-medium tracking-[-0.026em] min-h-[44px] flex items-center px-2 py-1 rounded hover:bg-[#181818]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#485346]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openWizard();
              }}
              className="inline-flex items-center justify-center bg-[#7fee64] text-[#000000] rounded-full px-5 min-h-[44px] font-medium w-full text-center font-sans font-bold"
            >
              INICIAR PROYECTO
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
