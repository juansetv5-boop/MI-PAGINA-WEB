'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function CleanEditorialAbout() {
  return (
    <section id="about" className="relative w-full max-w-full bg-[#0a0a0a] text-[#ddffdc] py-24 sm:py-32 px-4 md:px-12 lg:px-24 scroll-mt-12 selection:bg-[#7fee64]/20 selection:text-[#ddffdc]">
      <div id="process" className="scroll-mt-12" />

      <div className="max-w-[1080px] mx-auto">
        {/* Editorial Eyebrow */}
        <ScrollReveal variant="text" delay={0}>
          <div className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-[#7fee64] mb-8">
            // CÓMO PENSAMOS // NUESTRA FILOSOFÍA
          </div>
        </ScrollReveal>

        {/* Large Editorial Headline */}
        <ScrollReveal variant="text" delay={80}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium leading-[1.08] tracking-[-0.025em] mb-14 text-[#ddffdc]"
            style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
          >
            Una página no es solo para verse bonita.{' '}
            <span className="text-[#7fee64]">
              Es para transmitir tranquilidad.
            </span>
          </h1>
        </ScrollReveal>

        {/* Intro lead paragraph with the Book Analogy */}
        <ScrollReveal variant="text" delay={160}>
          <div className="space-y-6 text-lg sm:text-xl md:text-2xl text-[#aed2a4] font-normal leading-relaxed tracking-[-0.015em] mb-20 max-w-4xl">
            <p>
              Imagina que tu web es como un libro. Si la portada es hermosa pero abres las páginas y todo está desordenado, confuso o no habla de lo que prometía la carátula, el lector simplemente lo cierra y se va decepcionado.
            </p>
            <p className="text-[#ddffdc]">
              Nuestro trabajo es ser el escritor que guía a tu cliente paso a paso desde la primera línea hasta la última. Cuando una página cumple lo que promete y se siente fácil de recorrer, la gente confía. Y cuando la gente confía, tu negocio se muestra más. Así de simple funciona.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Section 1: The Principle */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-24">
          <ScrollReveal direction="left" delay={100} className="md:col-span-4">
            <span className="text-xs font-mono text-[#677d64] uppercase tracking-wider block mb-2">01 / ORDEN Y CLARIDAD</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#ddffdc] leading-tight">
              La portada abre la puerta, el contenido convence.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={180} className="md:col-span-8 space-y-6 text-base sm:text-lg text-[#8cab87] leading-relaxed">
            <p>
              Muchos creen que una página web es solo colores llamativos. Pero si la estructura no guía a quien entra o la información está tirada sin orden, el visitante se siente perdido y busca otra opción en segundos.
            </p>
            <p>
              Cuando todo está en su lugar y se lee con calma, la persona no tiene que esforzarse para entender qué haces por ella ni por qué debería elegirte.
            </p>
          </ScrollReveal>
        </div>

        {/* Story Section 2: Transparency & Human Connection */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <ScrollReveal direction="left" delay={100} className="md:col-span-4">
            <span className="text-xs font-mono text-[#677d64] uppercase tracking-wider block mb-2">02 / DE TÚ A TÚ</span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#ddffdc] leading-tight">
              Hablar claro genera confianza.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={180} className="md:col-span-8 space-y-6 text-base sm:text-lg text-[#8cab87] leading-relaxed">
            <p>
              No nos interesan los rodeos ni prometer cosas que no necesitas. Trabajamos de tú a tú, escuchando la historia de tu negocio para que tu página web transmita exactamente la misma seguridad y calidez que tú transmites en persona.
            </p>
            <p>
              Una página bien hecha no presume: acompaña, explica y deja una sensación de tranquilidad en quien la visita.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
