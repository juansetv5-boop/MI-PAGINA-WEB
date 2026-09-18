'use client';

import React from 'react';
import { useWizard } from './WizardContext';
import ScrollReveal from './ScrollReveal';

const RocketIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7fee64" strokeWidth="1.5">
    <path d="M24 6C15 14 12 24 14 34L24 42L34 34C36 24 33 14 24 6Z" />
    <circle cx="24" cy="20" r="4" />
    <path d="M14 34H34" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7fee64" strokeWidth="1.5">
    <rect x="10" y="8" width="28" height="34" rx="4" />
    <line x1="16" y1="16" x2="20" y2="16" />
    <line x1="28" y1="16" x2="32" y2="16" />
    <line x1="16" y1="24" x2="20" y2="24" />
    <line x1="28" y1="24" x2="32" y2="24" />
    <line x1="16" y1="32" x2="20" y2="32" />
    <line x1="28" y1="32" x2="32" y2="32" />
  </svg>
);

const CpuIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7fee64" strokeWidth="1.5">
    <rect x="12" y="12" width="24" height="24" rx="4" />
    <rect x="18" y="18" width="12" height="12" rx="2" />
    <line x1="24" y1="6" x2="24" y2="12" />
    <line x1="24" y1="36" x2="24" y2="42" />
    <line x1="6" y1="24" x2="12" y2="24" />
    <line x1="36" y1="24" x2="42" y2="24" />
  </svg>
);

const cards = [
  {
    icon: <RocketIcon />,
    title: 'Landing Page',
    desc: 'Ideal para ofrecer un producto o servicio específico y captar clientes de inmediato.',
  },
  {
    icon: <BuildingIcon />,
    title: 'Página Web Corporativa',
    desc: 'Tu vitrina digital completa para dar credibilidad, mostrar tu equipo y portafolio.',
  },
  {
    icon: <CpuIcon />,
    title: 'Sistema Web a Medida',
    desc: 'Plataforma con funciones avanzadas (gestión, usuarios, procesos o automatizaciones únicas).',
  }
];

export default function ValuePropositionGrid() {
  const { openWizard } = useWizard();

  return (
    <section id="services" className="w-full bg-[#000000] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1360px] mx-auto">
        <ScrollReveal delay={0}>
          <h2 className="text-[#ddffdc] text-[32px] md:text-[42px] tracking-[-0.336px] mb-12 font-medium">
            Soluciones diseñadas para <span className="text-[#7fee64]">cada etapa de tu negocio</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <ScrollReveal key={idx} delay={idx * 150} className="h-full">
              <div 
                className="bg-[#181818] rounded-lg border border-[#485346] p-[32px] transition-all duration-300 hover:border-[#677d64] hover:shadow-[0_0_30px_rgba(127,238,100,0.06)] flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-[6px]">
                      <div className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
                      <div className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
                      <div className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
                    </div>
                  </div>
                  <div className="h-12 mb-6 flex items-center">
                    {card.icon}
                  </div>
                  <h3 className="text-[#ddffdc] text-[24px] font-medium tracking-[-0.013em] mt-4">
                    {card.title}
                  </h3>
                  <p className="text-[#8cab87] text-[16px] tracking-[-0.022em] mt-3 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#485346]/40 flex items-center justify-between">
                  <button
                    onClick={openWizard}
                    className="text-[14px] font-medium text-[#ddffdc] hover:text-[#7fee64] active:text-[#7fee64] transition-colors flex items-center gap-1.5 min-h-[44px] py-2"
                  >
                    <span>Solicitar propuesta</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
