'use client';

import React from 'react';
import Link from 'next/link';
import { useWizard } from './WizardContext';

export default function MobileBottomNav() {
  const { openWizard } = useWizard();

  return (
    <nav 
      aria-label="Navegación móvil"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#181818]/95 backdrop-blur-lg border-t border-[#485346]/80 px-2 py-2 pb-safe shadow-[0_-4px_25px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/#work"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors"
        >
          <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[10px] font-sans font-medium tracking-tight">Proyectos</span>
        </Link>

        <Link
          href="/#services"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors"
        >
          <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[10px] font-sans font-medium tracking-tight">Servicios</span>
        </Link>

        {/* Central thumb-action button */}
        <button
          onClick={openWizard}
          className="flex flex-col items-center justify-center -mt-4 bg-[#7fee64] text-[#000000] w-14 h-14 rounded-full shadow-[0_0_20px_rgba(127,238,100,0.4)] active:scale-95 transition-transform"
          aria-label="Cotizar proyecto"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[8px] font-sans font-bold uppercase tracking-tight -mt-0.5">Cotizar</span>
        </button>

        <Link
          href="/#process"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors"
        >
          <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-[10px] font-sans font-medium tracking-tight">Proceso</span>
        </Link>

        <Link
          href="/#contact"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors"
        >
          <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-[10px] font-sans font-medium tracking-tight">Contacto</span>
        </Link>
      </div>
    </nav>
  );
}
