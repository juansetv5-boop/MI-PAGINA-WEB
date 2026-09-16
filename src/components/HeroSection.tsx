'use client';

import React from 'react';
import Link from 'next/link';
import { useWizard } from './WizardContext';

export default function HeroSection() {
  const { openWizard } = useWizard();

  return (
    <section className="relative w-full bg-[#000000] min-h-[92vh] pt-[160px] pb-16 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Ambient phosphor glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[360px] md:h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(127, 238, 100, 0.07), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="relative z-10 max-w-[1360px] w-full mx-auto flex flex-col items-center">
        {/* Display Headline Stack */}
        <h1 
          className="flex flex-col font-medium text-[36px] sm:text-[48px] md:text-[62px] lg:text-[72px] leading-[1.05] mb-8"
          style={{ 
            letterSpacing: '-0.015em', 
            fontFamily: 'var(--font-sans, sans-serif)' 
          }}
        >
          <span className="text-[#7fee64]">Te entendemos a ti</span>
          <span className="text-[#ddffdc]">tanto como a tu página web.</span>
        </h1>

        {/* Subhead */}
        <p className="text-[#aed2a4] text-[16px] sm:text-[18px] md:text-[20px] max-w-[720px] tracking-[-0.018em] leading-relaxed mb-10">
          Sin tecnicismos raros ni procesos complicados. Transformamos la visión de tu negocio en una herramienta digital que genera confianza, transmite profesionalismo y atrae más clientes.
        </p>

        {/* CTA Pair */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
          <button
            onClick={openWizard}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#7fee64] text-[#000000] rounded-full px-8 py-3.5 font-medium text-[16px] tracking-[-0.022em] transition-all hover:opacity-95 hover:shadow-[0_0_24px_rgba(127,238,100,0.3)] active:scale-[0.98]"
          >
            Diseña tu muestra
          </button>
          <Link
            href="#process"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-[#ddffdc] text-[#ddffdc] rounded-[12px] px-8 py-3.5 font-medium text-[16px] tracking-[-0.022em] transition-colors hover:bg-[#ddffdc]/10 active:scale-[0.98]"
          >
            Ver cómo trabajamos
          </Link>
        </div>

        {/* Specs Bar focused on Value & Trust */}
        <div className="mt-16 pt-8 border-t border-[#1f2a33] w-full max-w-2xl grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-[#ddffdc] font-sans text-lg md:text-xl font-medium">+100%</div>
            <div className="text-[#677d64] text-xs font-sans mt-0.5">Imagen Profesional</div>
          </div>
          <div>
            <div className="text-[#7fee64] font-sans text-lg md:text-xl font-medium">3 Revision de Estrategia</div>
            <div className="text-[#677d64] text-xs font-sans mt-0.5">Garantía a Medida</div>
          </div>
          <div>
            <div className="text-[#ddffdc] font-sans text-lg md:text-xl font-medium">100% Móvil</div>
            <div className="text-[#677d64] text-xs font-sans mt-0.5">Optimización Total</div>
          </div>
        </div>
      </div>
    </section>
  );
}
