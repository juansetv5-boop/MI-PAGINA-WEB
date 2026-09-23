'use client';

import React, { useState } from 'react';
import { useWizard } from './WizardContext';
import ScrollReveal from './ScrollReveal';

interface ServiceItem {
  id: string;
  name: string;
  badge: string;
  deliveryTime: string;
  description: string;
  features: string[];
  techStack: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'landing',
    name: 'Landing Page & E-Commerce de Alta Conversión',
    badge: 'ENTREGA RÁPIDA',
    deliveryTime: '5 a 7 días hábiles',
    description:
      'Páginas de aterrizaje diseñadas milimétricamente para campañas de tráfico pago y captación masiva. Cero plantillas lentas de WordPress, arquitectura Next.js pura para convertir visitantes en clientes.',
    features: [
      'Puntuación Lighthouse 100/100 garantizada',
      'Micro-interacciones y animaciones a 60 FPS',
      'Integración directa a WhatsApp y CRM',
      'Copywriting persuasivo y diseño Mobile-First',
    ],
    techStack: ['Next.js 16', 'Tailwind CSS v4', 'TypeScript', 'Turbopack'],
  },
  {
    id: 'corporate',
    name: 'Plataforma Web Corporativa & Compliance',
    badge: 'MÁXIMA AUTORIDAD',
    deliveryTime: '10 a 14 días hábiles',
    description:
      'Soluciones digitales institucionales de alto calibre para empresas que requieren transmitir solidez normativa, seguridad de datos y prestigio corporativo ante clientes de alto valor.',
    features: [
      'Renderizado híbrido SSR en servidores Edge distribuidos',
      'Estructura modular lista para escalar sin deuda técnica',
      'Cumplimiento de estándares de accesibilidad y SEO técnico',
      'Panel administrativo a medida sin dependencias inseguras',
    ],
    techStack: ['Next.js App Router', 'TypeScript Estricto', 'Edge Cache', 'Security Hardened'],
  },
  {
    id: 'custom-ai',
    name: 'Sistemas Web & Pipelines de IA a Medida',
    badge: 'INGENIERÍA AVANZADA',
    deliveryTime: 'Según alcance de ingeniería',
    description:
      'Desarrollo de software y aplicaciones web interactivas con visión artificial, procesamiento de lenguaje natural o paneles de control analíticos de alto rendimiento en tiempo real.',
    features: [
      'Procesamiento y visión computarizada en tiempo real',
      'APIs RESTful y WebSockets de latencia ultra baja',
      'Infraestructura Cloud resiliente con 99.9% Uptime',
      'Bancos de pruebas de estrés y validación automatizada',
    ],
    techStack: ['Python 3.10', 'OpenCV / AI', 'React Full-Stack', 'PostgreSQL / Redis'],
  },
  {
    id: 'advisory',
    name: 'Auditoría Técnica y Asesoría 1 a 1',
    badge: 'DIAGNÓSTICO EN 24H',
    deliveryTime: 'Inmediata / Sesión 1 a 1',
    description:
      'Revisión profunda del código, velocidad de carga y embudo de conversión de tu sitio web actual. Identificamos cuellos de botella exactos y te entregamos un plan de acción sin tecnicismos.',
    features: [
      'Auditoría completa de Core Web Vitals (LCP, INP, CLS)',
      'Detección de vulnerabilidades y fugas de rendimiento',
      'Revisión de arquitectura y sugerencias de refactorización',
      'Sesión de consultoría privada con ingenieros senior',
    ],
    techStack: ['Chrome DevTools', 'Lighthouse CLI', 'Next.js Profiler'],
  },
];

export default function ServicesView() {
  const { openWizard } = useWizard();
  const [viewMode, setViewMode] = useState<'cards' | 'json'>('cards');

  return (
    <section className="w-full bg-[#0a0a0a] min-h-screen py-16 px-6 md:px-12 lg:px-20 text-[#ddffdc]">
      <div className="max-w-[1360px] mx-auto">
        {/* Header Bar */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1f2a33] mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#7fee64] mb-2 uppercase tracking-widest">
                <span>FILE:</span>
                <span className="text-[#ddffdc] font-bold">src/data/services.json</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-[#ddffdc]">
                Estructura de Servicios & Tiempos de Entrega
              </h1>
              <p className="text-[#8cab87] text-base mt-2 max-w-2xl">
                Garantizamos código de precisión, tiempos pactados por contrato y cero concesiones de calidad.
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

        {/* View Mode 1: Interactive Cards */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesData.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100}>
                <div className="h-full p-7 md:p-8 rounded-2xl bg-[#141616] border border-[#485346] hover:border-[#7fee64]/70 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                  <div>
                    {/* Card Top */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#212525] border border-[#485346] text-[#7fee64]">
                        {service.badge}
                      </span>
                      <span className="text-xs font-mono text-[#8cab87] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7fee64]" />
                        {service.deliveryTime}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-medium text-[#ddffdc] group-hover:text-[#7fee64] transition-colors mb-4">
                      {service.name}
                    </h2>

                    <p className="text-[#8cab87] text-sm md:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-6 pt-4 border-t border-[#212525]">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#ddffdc]/90">
                          <span className="text-[#7fee64] mt-0.5">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack & Action */}
                  <div className="pt-6 border-t border-[#212525] flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#1e231e] text-[#aed2a4] border border-[#485346]/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={openWizard}
                      className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#212525] hover:bg-[#7fee64] hover:text-[#000000] border border-[#485346] hover:border-[#7fee64] text-xs font-mono font-bold transition-all text-[#ddffdc] text-center"
                    >
                      Cotizar este servicio →
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* View Mode 2: Syntax Highlighted JSON Editor View */
          <div className="rounded-2xl bg-[#141616] border border-[#485346] p-6 sm:p-8 font-mono text-xs sm:text-sm overflow-x-auto shadow-2xl mb-16">
            <pre className="text-[#aed2a4] leading-relaxed">
              <code>{JSON.stringify({ services: servicesData }, null, 2)}</code>
            </pre>
          </div>
        )}

        {/* Bottom Guarantee Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#141616] via-[#1a2219] to-[#141616] border border-[#485346] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono text-[#7fee64] uppercase font-bold tracking-widest mb-1">
              GARANTÍA CLICKSHOP LABS
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-[#ddffdc]">
              Sin sorpresas, sin cargos ocultos, sin retrasos.
            </h3>
            <p className="text-[#8cab87] text-sm mt-1">
              Acuerdo de nivel de servicio (SLA) con hitos de entrega transparentes y código 100% de tu propiedad.
            </p>
          </div>
          <button
            onClick={openWizard}
            className="w-full md:w-auto px-8 min-h-[48px] py-3.5 rounded-full bg-[#7fee64] text-[#000000] font-sans font-bold text-sm uppercase tracking-wider hover:opacity-95 shadow-[0_0_20px_rgba(127,238,100,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>Iniciar Cotización Guiada</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
