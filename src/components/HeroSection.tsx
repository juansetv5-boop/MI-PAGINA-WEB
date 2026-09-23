'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWizard } from './WizardContext';

export default function HeroSection() {
  const { openWizard } = useWizard();
  const [isHeroAnimating, setIsHeroAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroAnimating(false);
    }, 3700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#000000] min-h-[80vh] pt-16 sm:pt-20 md:pt-24 pb-16 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Ambient phosphor glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[360px] md:h-[500px] pointer-events-none animate-lonzo-glow"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(127, 238, 100, 0.07), transparent 70%)',
          filter: 'blur(50px)',
          willChange: isHeroAnimating ? 'opacity' : 'auto',
        }}
      />

      <div className="relative z-10 max-w-[1360px] w-full mx-auto flex flex-col items-center">
        {/* Display Headline Stack */}
        <div
          className="animate-lonzo-h1"
          style={{
            willChange: isHeroAnimating ? 'transform, opacity' : 'auto',
          }}
        >
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
        </div>

        {/* Subhead */}
        <div
          className="animate-lonzo-paragraph"
          style={{
            willChange: isHeroAnimating ? 'transform, opacity' : 'auto',
          }}
        >
          <p className="text-[#aed2a4] text-[16px] sm:text-[18px] md:text-[20px] max-w-[760px] tracking-[-0.018em] leading-relaxed mb-10">
            Da mucha rabia cuando pagas por una web prometiendo profesionalismo y te entregan algo básico, lento y sin alma que hace pensar que tener una página no sirve. Nosotros no solo ordenamos tu información: hacemos que quien entre sienta tranquilidad, entienda lo que ofreces y se quede hasta el final.
          </p>
        </div>

        {/* CTA Pair */}
        <div
          className="animate-lonzo-buttons"
          style={{
            willChange: isHeroAnimating ? 'transform, opacity' : 'auto',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <button
              onClick={openWizard}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#7fee64] text-[#000000] rounded-full px-8 py-3.5 font-medium text-[16px] tracking-[-0.022em] transition-all hover:opacity-95 hover:shadow-[0_0_24px_rgba(127,238,100,0.3)] active:scale-[0.98]"
            >
              Hablemos de tu idea
            </button>
            <Link
              href="#work"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-[#ddffdc] text-[#ddffdc] rounded-[12px] px-8 py-3.5 font-medium text-[16px] tracking-[-0.022em] transition-colors hover:bg-[#ddffdc]/10 active:scale-[0.98]"
            >
              Ver proyectos reales
            </Link>
          </div>
        </div>

        {/* Specs Bar focused on Value & Trust */}
        <div
          className="w-full max-w-3xl animate-lonzo-metrics"
          style={{
            willChange: isHeroAnimating ? 'transform, opacity' : 'auto',
          }}
        >
          <div className="mt-16 pt-8 border-t border-[#1f2a33] w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center">
            <div>
              <div className="text-[#ddffdc] font-sans text-base sm:text-lg font-medium">Se ve bien, funciona mejor</div>
              <div className="text-[#677d64] text-xs font-sans mt-0.5">Tu portada cumple lo que promete</div>
            </div>
            <div>
              <div className="text-[#7fee64] font-sans text-base sm:text-lg font-medium">Sin enredos raros</div>
              <div className="text-[#677d64] text-xs font-sans mt-0.5">Hablas directo con quien hace tu página, de tú a tú</div>
            </div>
            <div>
              <div className="text-[#ddffdc] font-sans text-base sm:text-lg font-medium">Carga en un pestañeo</div>
              <div className="text-[#677d64] text-xs font-sans mt-0.5">Porque nadie espera una página lenta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
