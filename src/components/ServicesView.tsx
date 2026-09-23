'use client';

import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface ServiceItem {
  id: string;
  name: string;
  identifier: string;
  description: string;
  serviceVal: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'landing',
    identifier: '// 01',
    name: 'Landing Page',
    serviceVal: 'Landing Page',
    description:
      'Una página directa y sin rodeos, pensada para presentar lo que ofreces y guiar a tu cliente a contactarte sin enredos.',
  },
  {
    id: 'corporate',
    identifier: '// 02',
    name: 'Página Corporativa',
    serviceVal: 'Página Web Corporativa',
    description:
      'La casa digital de tu negocio. Ordena quién eres y tus proyectos para transmitir confianza sólida desde el primer segundo.',
  },
  {
    id: 'custom',
    identifier: '// 03',
    name: 'Sistema a Medida',
    serviceVal: 'Sistema Web a Medida',
    description:
      'Herramientas y paneles creados a la medida de tu operación para resolver procesos específicos de tu día a día.',
  },
];

export default function ServicesView() {
  const [viewMode, setViewMode] = useState<'cards' | 'json'>('cards');

  const handleServiceClick = (serviceVal: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('select-service', { detail: serviceVal }));
    }
    const el = document.getElementById('contact') || document.getElementById('start');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="w-full bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 lg:px-20 text-[#ddffdc]">
      <div className="max-w-[1360px] mx-auto">
        {/* Header Bar */}
        <ScrollReveal variant="text" delay={0}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7fee64] mb-2 uppercase tracking-widest">
                <span>ESTRUCTURA:</span>
                <span className="text-[#ddffdc] font-bold">src/data/services.json</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-[#ddffdc]">
                Servicios a tu medida
              </h1>
              <p className="text-[#8cab87] text-base mt-2 max-w-2xl">
                Soluciones directas, trato humano y el compromiso de entregarte una página que realmente cumpla lo que promete.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-lg bg-[#181818] border border-[#485346] self-start md:self-auto">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
                  viewMode === 'cards'
                    ? 'bg-[#7fee64] text-[#000000] font-bold shadow-[0_0_12px_rgba(127,238,100,0.3)]'
                    : 'text-[#8cab87] hover:text-[#ddffdc]'
                }`}
              >
                Visual Grid
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={`px-4 py-2 rounded text-xs font-mono font-medium transition-all ${
                  viewMode === 'json'
                    ? 'bg-[#7fee64] text-[#000000] font-bold shadow-[0_0_12px_rgba(127,238,100,0.3)]'
                    : 'text-[#8cab87] hover:text-[#ddffdc]'
                }`}
              >
                JSON Schema
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* View Mode 1: Clean Minimalist Interactive Cards */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {servicesData.map((service, index) => {
              const cardDirection: 'left' | 'right' | 'up' = index === 0 ? 'left' : index === 2 ? 'right' : 'up';
              return (
                <ScrollReveal key={service.id} direction={cardDirection} delay={index * 100}>
                  <div className="h-full p-7 md:p-8 rounded-2xl bg-[#141616] border border-[#485346] hover:border-[#7fee64]/70 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                    <div>
                      {/* Subtle identifier */}
                      <div className="font-mono text-xs font-semibold text-[#7fee64] tracking-widest mb-4">
                        {service.identifier}
                      </div>

                      <h2 className="text-xl md:text-2xl font-medium text-[#ddffdc] group-hover:text-[#7fee64] transition-colors mb-4">
                        {service.name}
                      </h2>

                      <p className="text-[#8cab87] text-sm md:text-base leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#212525]">
                      <button
                        onClick={() => handleServiceClick(service.serviceVal)}
                        className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-[#212525] hover:bg-[#7fee64] hover:text-[#000000] border border-[#485346] hover:border-[#7fee64] text-xs font-mono font-bold transition-all text-[#ddffdc] text-center flex items-center justify-center gap-1.5"
                      >
                        Hablemos de este proyecto →
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          /* View Mode 2: Syntax Highlighted JSON Editor View */
          <div className="rounded-2xl bg-[#141616] border border-[#485346] p-6 sm:p-8 font-mono text-xs sm:text-sm overflow-x-auto shadow-2xl mb-16">
            <pre className="text-[#aed2a4] leading-relaxed">
              <code>{JSON.stringify({ services: servicesData.map(({ id, name, description }) => ({ id, name, description })) }, null, 2)}</code>
            </pre>
          </div>
        )}

        {/* Bottom Commitment Banner */}
        <ScrollReveal variant="card" direction="up" delay={200}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#141616] via-[#1a2219] to-[#141616] border border-[#485346] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-[#7fee64] uppercase font-bold tracking-widest mb-1">
                COMPROMISO CLICKSHOP
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-[#ddffdc]">
                Sin sorpresas ni cargos ocultos.
              </h3>
              <p className="text-[#8cab87] text-sm mt-1 max-w-xl">
                Hablamos claro desde el primer mensaje. Código 100% de tu propiedad, trato directo y soluciones pensadas para tu negocio.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('contact') || document.getElementById('start');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto px-8 min-h-[48px] py-3.5 rounded-full bg-[#7fee64] text-[#000000] font-sans font-bold text-sm uppercase tracking-wider hover:opacity-95 shadow-[0_0_20px_rgba(127,238,100,0.3)] transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Hablemos de tu idea</span>
              <span>→</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
