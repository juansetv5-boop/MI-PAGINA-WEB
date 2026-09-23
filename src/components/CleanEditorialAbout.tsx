'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function CleanEditorialAbout() {
  return (
    <section id="about" className="relative w-full max-w-full bg-[#0a0a0a] text-[#ddffdc] py-24 sm:py-32 px-4 md:px-12 lg:px-24 scroll-mt-12 selection:bg-[#7fee64]/20 selection:text-[#ddffdc] border-t border-[#1f2a33]">
      <div id="process" className="scroll-mt-12" />

      <div className="max-w-[1080px] mx-auto">
        {/* Editorial Eyebrow */}
        <ScrollReveal delay={0}>
          <div className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-[#7fee64] mb-8">
            // MANIFIESTO & FILOSOFÍA // CLICKSHOP LABS
          </div>
        </ScrollReveal>

        {/* Large Editorial Headline */}
        <ScrollReveal delay={100}>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-medium leading-[1.04] tracking-[-0.025em] mb-16 text-[#ddffdc]"
            style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
          >
            No hacemos páginas web para rellenar internet.{' '}
            <span className="text-[#7fee64]">
              Construimos herramientas digitales que imponen respeto y generan negocio.
            </span>
          </h1>
        </ScrollReveal>

        {/* Intro lead paragraph */}
        <ScrollReveal delay={200}>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#aed2a4] font-normal leading-relaxed tracking-[-0.015em] mb-20 max-w-3xl">
            Vivimos en una época donde casi todas las páginas web se sienten idénticas: lentas, genéricas y repletas de texto corporativo que nadie lee. Nosotros decidimos hacer lo opuesto.
          </p>
        </ScrollReveal>

        <div className="w-full h-px bg-[#212525] mb-20" />

        {/* Story Section 1: The Problem */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-28">
          <div className="md:col-span-4">
            <span className="text-xs font-mono text-[#677d64] uppercase tracking-wider block mb-2">01 / DIAGNÓSTICO</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#ddffdc] leading-tight">
              La trampa de las agencias tradicionales.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-base sm:text-lg text-[#8cab87] leading-relaxed">
            <p>
              La mayoría de agencias funcionan como fábricas de montaje: cobran sumas astronómicas para instalar una plantilla prefabricada de WordPress, montarle 30 plugins lentos y delegar el proyecto a subcontratistas mientras te cobran cuotas de mantenimiento parasitarias.
            </p>
            <p>
              El resultado es predecible: un sitio web que tarda 4 segundos en cargar en un teléfono móvil, pierde la mitad del tráfico antes del primer clic y se rompe ante la primera actualización de seguridad.
            </p>
          </div>
        </div>

        {/* Story Section 2: Our Craft */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <span className="text-xs font-mono text-[#677d64] uppercase tracking-wider block mb-2">02 / ARTESANÍA</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#ddffdc] leading-tight">
              Ingeniería de software, no maquillaje cosmético.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-base sm:text-lg text-[#8cab87] leading-relaxed">
            <p>
              En Clickshop Labs no usamos constructores visuales. Cada vista, botón y micro-interacción se codifica a medida utilizando Next.js 16, TypeScript estricto y Tailwind CSS. Tratamos cada milisegundo de latencia como una pérdida inadmisible de atención para tu cliente.
            </p>
            <p>
              Creemos que un diseño excepcional no es aquel que añade adornos innecesarios, sino el que elimina toda fricción entre la propuesta de valor de tu negocio y la decisión de compra de tu cliente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
