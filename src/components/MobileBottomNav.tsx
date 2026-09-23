'use client';

import React from 'react';
import Link from 'next/link';
import { useWizard } from './WizardContext';

export default function MobileBottomNav() {
  const { openWizard } = useWizard();

  return (
    <nav 
      aria-label="Navegación móvil"
      className="md:hidden fixed bottom-3 left-3 right-3 sm:left-4 sm:right-4 z-50 bg-[#121612]/80 backdrop-blur-xl border border-[#7fee64]/25 rounded-2xl px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-between max-w-md mx-auto px-1 sm:px-2">
        <Link
          href="/#work"
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-1.5 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors group"
        >
          <svg className="w-5 h-5 mb-1 transition-colors group-active:text-[#7fee64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[10px] text-[#8cab87] active:text-[#7fee64] transition-colors font-medium">Proyectos</span>
        </Link>

        <Link
          href="/#services"
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-1.5 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors group"
        >
          <svg className="w-5 h-5 mb-1 transition-colors group-active:text-[#7fee64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[10px] text-[#8cab87] active:text-[#7fee64] transition-colors font-medium">Servicios</span>
        </Link>

        {/* Central thumb-action button */}
        <button
          onClick={openWizard}
          className="-mt-5 bg-[#7fee64] text-[#000000] w-12 h-12 rounded-full shadow-[0_0_22px_rgba(127,238,100,0.45)] border-2 border-[#121612] flex flex-col items-center justify-center active:scale-95 transition-transform shrink-0 mx-1"
          aria-label="Cotizar proyecto"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[8px] font-sans font-bold uppercase tracking-tight -mt-0.5">Cotizar</span>
        </button>

        <Link
          href="/#process"
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-1.5 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors group"
        >
          <svg className="w-5 h-5 mb-1 transition-colors group-active:text-[#7fee64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-[10px] text-[#8cab87] active:text-[#7fee64] transition-colors font-medium">Proceso</span>
        </Link>

        <Link
          href="/#contact"
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-1.5 py-1 text-[#8cab87] active:text-[#7fee64] transition-colors group"
        >
          <svg className="w-5 h-5 mb-1 transition-colors group-active:text-[#7fee64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-[10px] text-[#8cab87] active:text-[#7fee64] transition-colors font-medium">Contacto</span>
        </Link>
      </div>
    </nav>
  );
}
