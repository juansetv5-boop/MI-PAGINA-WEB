'use client';

import React from 'react';
import { useWizard } from './WizardContext';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Estrategia y Diagnóstico',
    desc: 'Analizamos los objetivos de tu negocio, tu audiencia ideal y la propuesta de valor única de tu marca antes de escribir una sola línea de código.',
  },
  {
    number: '02',
    title: '3 Revisiones Estratégicas',
    desc: 'Te integramos en la creación con 3 revisiones estratégicas para que el resultado sea exacto a lo que necesitas.',
  },
  {
    number: '03',
    title: 'Despliegue y Garantía Total',
    desc: 'Publicamos tu web optimizada para motores de búsqueda, con velocidad ultrarrápida y 100% adaptada a dispositivos móviles.',
  },
];

export default function TrustToolSection() {
  const { openWizard } = useWizard();

  return (
    <section id="process" className="w-full bg-[#000000] py-24 px-6 md:px-12 lg:px-20 border-t border-[#1f2a33]">
      <div className="max-w-[1360px] mx-auto">
        {/* Header Block */}
        <ScrollReveal delay={0} className="max-w-3xl mb-16">
          <h2 
            className="text-[#ddffdc] text-[32px] md:text-[46px] font-medium leading-tight tracking-[-0.015em] mb-6"
            style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
          >
            Tu página web es el activo que demuestra el <span className="text-[#7fee64]">nivel real de tu marca</span>.
          </h2>

          <p className="text-[#aed2a4] text-[17px] md:text-[19px] leading-relaxed tracking-[-0.018em]">
            En un mercado competitivo, tu presencia digital no es solo un folleto con información. Es la primera impresión que determina si un cliente decide contratarte o buscar a la competencia. Diseñamos plataformas que transmiten solidez, seriedad y el respaldo que tu negocio merece.
          </p>
        </ScrollReveal>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 150} className="h-full">
              <div
                className="bg-[#181818] rounded-lg border border-[#485346] p-8 flex flex-col justify-between h-full transition-colors hover:border-[#677d64]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-sans font-semibold text-[#7fee64]">
                      PASO {step.number}
                    </span>
                  </div>
                  <h3 className="text-[#ddffdc] text-[22px] font-medium mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#8cab87] text-[15px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust Callout */}
        <ScrollReveal delay={300} className="mt-12">
          <div className="p-8 rounded-lg bg-[#181818] border border-[#7fee64]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7fee64]/10 border border-[#7fee64] flex items-center justify-center text-[#7fee64] text-xl font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-[#ddffdc] text-lg font-medium">Garantía de Satisfacción y Transparencia</h4>
                <p className="text-[#8cab87] text-sm mt-0.5">
                  Te integramos en cada fase del desarrollo para que el resultado supere tus expectativas.
                </p>
              </div>
            </div>
            <button
              onClick={openWizard}
              className="w-full sm:w-auto min-h-[48px] whitespace-nowrap bg-[#7fee64] text-[#000000] rounded-full px-6 py-3 font-medium text-sm transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(127,238,100,0.3)] active:scale-[0.98] flex items-center justify-center"
            >
              Solicitar Muestra Personalizada
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
