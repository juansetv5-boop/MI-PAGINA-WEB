'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

interface Project {
  id: string;
  tabLabel: string;
  title: string;
  domain: string;
  url?: string;
  category: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    badge: string;
  }[];
  tags: string[];
  mockupType: 'rlp' | 'ai';
}

const projects: Project[] = [
  {
    id: 'rlp',
    tabLabel: 'RLP Compliance',
    title: 'RLP Compliance S.A.S.',
    url: 'https://rlpcompliance.com',
    domain: 'rlpcompliance.com',
    category: 'PÁGINA WEB CORPORATIVA',
    description:
      'Plataforma web desarrollada para RLP Compliance. Un sitio rápido, sobrio y ordenado que transmite autoridad y tranquilidad inmediata a quienes buscan asesoría jurídica y normativa.',
    metrics: [
      { label: 'Velocidad', value: 'Instantánea', badge: 'SIN ESPERAS' },
      { label: 'Claridad', value: '100%', badge: 'FÁCIL DE NAVEGAR' },
      { label: 'Experiencia', value: 'Mobile-First', badge: 'EN CUALQUIER PANTALLA' },
    ],
    tags: ['Diseño a Medida', 'Estructura Clara', 'Carga Rápida', 'Presencia Corporativa'],
    mockupType: 'rlp',
  },
  {
    id: 'dactilologia',
    tabLabel: 'Traductor Dactilología Alpha',
    title: 'Traductor de Dactilología Alpha',
    domain: 'dactilologia.clickshop.dev',
    category: 'INVESTIGACIÓN & DESARROLLO',
    description:
      'Proyecto de desarrollo con inteligencia artificial para la traducción en tiempo real de lenguaje de señas mediante la cámara, pensado para facilitar la comunicación inclusiva.',
    metrics: [
      { label: 'Fluidez', value: 'Tiempo Real', badge: 'AL INSTANTE' },
      { label: 'Precisión', value: '98.4%', badge: 'ALTA EXACTITUD' },
      { label: 'Enfoque', value: 'Inclusivo', badge: 'ACCESIBILIDAD' },
    ],
    tags: ['Inteligencia Artificial', 'Cámara en Vivo', 'Visión Computarizada', 'Innovación'],
    mockupType: 'ai',
  },
];

export default function PortfolioShowcase() {
  const [activeProjectId, setActiveProjectId] = useState<string>('rlp');
  const [isAnimating, setIsAnimating] = useState(false);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleSelectTab = (id: string) => {
    if (id === activeProjectId) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveProjectId(id);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <section id="work" className="w-full bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2
              className="text-[#ddffdc] text-[32px] md:text-[44px] font-medium leading-tight"
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                letterSpacing: '-0.012em',
              }}
            >
              Proyectos reales <span className="text-[#7fee64]">que hablan por sí solos</span>
            </h2>
            <p className="text-[#8cab87] text-[15px] md:text-base mt-3 tracking-[-0.022em]">
              Echa un vistazo a cómo ayudamos a otros negocios a transformar ideas confusas en páginas claras, profesionales y que generan confianza desde el primer segundo.
            </p>
          </div>
        </ScrollReveal>

        {/* 1. SegmentedControl (Top Tabs Bar: responsive auto width with no-scrollbar) */}
        <ScrollReveal delay={100}>
          <div className="w-full flex justify-center mb-8 md:mb-12 px-2">
            <div className="w-full max-w-sm sm:max-w-md mx-auto p-1 bg-[#121612] border border-[#2d2d2d] rounded-xl flex items-center justify-between overflow-x-auto no-scrollbar gap-1">
              {projects.map((p) => {
                const isSelected = activeProjectId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectTab(p.id)}
                    className={`whitespace-nowrap px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg flex-1 text-center transition-all font-sans min-h-[40px] flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#7fee64] text-[#000000] font-bold shadow-[0_0_16px_rgba(127,238,100,0.35)]'
                        : 'text-[#8cab87] hover:text-[#ddffdc] hover:bg-[#212525] active:bg-[#212525]'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#000000] shrink-0" />}
                    {p.id === 'dactilologia' ? (
                      <>
                        <span className="sm:hidden">Dactilología AI</span>
                        <span className="hidden sm:inline">Traductor Dactilología Alpha</span>
                      </>
                    ) : (
                      <span>{p.tabLabel}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Split Layout (2 Columns: Info Left, Preview Right) */}
        <ScrollReveal delay={200}>
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-12 items-center bg-[#181818] border border-[#485346] rounded-2xl p-4 sm:p-7 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 ${
              isAnimating ? 'opacity-40 scale-[0.995]' : 'opacity-100 scale-100'
            }`}
          >
            {/* LEFT COLUMN: Project Info (Minimalist on mobile: Title only) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 md:space-y-6">
              <div>
                <div className="hidden md:block text-xs font-sans font-bold text-[#7fee64] tracking-widest uppercase mb-2">
                  // {activeProject.category}
                </div>
                <h3
                  className="text-[#ddffdc] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight mb-2 md:mb-4 text-center md:text-left"
                  style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
                >
                  {activeProject.title}
                </h3>
                <p className="hidden md:block text-[#8cab87] text-sm md:text-base leading-relaxed mb-6">
                  {activeProject.description}
                </p>

                {/* Metrics Row - Hidden on mobile */}
                <div className="hidden md:grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#0e120e] border border-[#485346]/60 mb-6">
                  {activeProject.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-[10px] md:text-xs text-[#677d64] uppercase font-sans tracking-wider font-medium">
                        {m.label}
                      </div>
                      <div className="text-sm md:text-lg font-bold text-[#7fee64] font-sans mt-0.5">
                        {m.value}
                      </div>
                      <div className="text-[9px] text-[#8cab87] font-mono mt-0.5">
                        {m.badge}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags - Hidden on mobile */}
                <div className="hidden md:block">
                  <div className="text-xs text-[#677d64] uppercase tracking-wider mb-2.5 font-sans font-medium">
                    Stack Tecnológico:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-[#212525] border border-[#485346] text-[#ddffdc]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button - Only rendered for projects without direct live URL (Desktop only) */}
              {!activeProject.url && (
                <div className="hidden md:block pt-4 border-t border-[#485346]/40">
                  <a
                    href="#start"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#212525] border border-[#7fee64] text-[#7fee64] px-6 min-h-[48px] py-3 rounded-lg font-sans text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-[#7fee64] hover:text-[#000000] active:scale-98 transition-all"
                  >
                    <span>Solicitar Consulta o Muestra</span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Dual Presentation (Clean Edge-to-Edge on Mobile, Detailed Browser Mockup on Desktop) */}
            <div className="lg:col-span-6 w-full h-full flex flex-col justify-center">
              {/* --- MOBILE VIEW: Clean Touch Card with Edge-to-Edge Preview (block md:hidden) --- */}
              <div className="block md:hidden">
                {activeProject.mockupType === 'rlp' ? (
                  <a
                    href="https://rlpcompliance.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden border border-[#485346] bg-[#0e120e] shadow-xl relative"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#000000]">
                      <Image
                        src="/assets/portfolio/rlpcompliance-preview.webp"
                        alt="Previsualización de RLP Compliance S.A.S."
                        fill
                        sizes="100vw"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-[#000000]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#485346] flex items-center gap-1.5 font-mono text-[10px] text-[#7fee64]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7fee64] animate-ping" />
                        <span className="font-bold">EN VIVO</span>
                      </div>
                    </div>
                    <div className="p-4 bg-[#181818] border-t border-[#485346] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#8cab87]">https://{activeProject.domain}</span>
                      <span className="text-xs font-sans font-bold text-[#7fee64] flex items-center gap-1">
                        Visitar ↗
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="rounded-xl overflow-hidden border border-[#485346] bg-[#181818] p-5 shadow-xl space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono border-b border-[#485346]/60 pb-3">
                      <span className="text-[#ddffdc] font-bold">DACTILOLOGIA AI PIPELINE</span>
                      <span className="text-[#7fee64]">● 60 FPS</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#0e120e] p-3 rounded-lg border border-[#485346]/40 text-center">
                        <div className="text-[10px] text-[#677d64] uppercase font-mono">Detección</div>
                        <div className="text-base font-bold text-[#7fee64] mt-1">21 Keypoints</div>
                      </div>
                      <div className="bg-[#0e120e] p-3 rounded-lg border border-[#485346]/40 text-center">
                        <div className="text-[10px] text-[#677d64] uppercase font-mono">Precisión</div>
                        <div className="text-base font-bold text-[#ddffdc] mt-1">98.4%</div>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-[#677d64] text-center pt-1">
                      MODELO: PYTHON 3.10 / OPENCV
                    </div>
                  </div>
                )}
              </div>

              {/* --- DESKTOP VIEW: Detailed Browser Mockup with Window Controls & Hover Glow (hidden md:block) --- */}
              <div className="hidden md:block w-full h-full">
                {activeProject.mockupType === 'rlp' ? (
                  <a
                    href="https://rlpcompliance.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full aspect-[16/10] min-h-[380px] lg:min-h-[440px] rounded-xl overflow-hidden border border-[#485346] bg-[#0e120e] shadow-2xl flex flex-col transition-all duration-300 hover:border-[#7fee64] hover:shadow-[0_0_30px_rgba(127,238,100,0.2)] block"
                  >
                    {/* Browser Header Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#181818] border-b border-[#485346] z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="text-xs font-mono text-[#8cab87] flex items-center gap-2 bg-[#212525] px-3.5 py-1 rounded border border-[#485346]/60 transition-colors group-hover:border-[#7fee64]/50 group-hover:text-[#ddffdc]">
                        <span className="text-[#7fee64]">https://</span>
                        <span>{activeProject.domain}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#7fee64]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7fee64] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7fee64]"></span>
                        </span>
                        <span className="font-semibold">EN VIVO</span>
                      </div>
                    </div>

                    {/* Mockup Preview Screen: Screenshot Image */}
                    <div className="relative flex-1 w-full overflow-hidden bg-[#0a0a0a]">
                      <Image
                        src="/assets/portfolio/rlpcompliance-preview.webp"
                        alt="Previsualización del sitio web RLP Compliance S.A.S."
                        fill
                        sizes="(max-width: 1024px) 100vw, 640px"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />

                      {/* Hover Overlay Feedback */}
                      <div className="absolute inset-0 bg-[#000000]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-2 bg-[#7fee64] text-[#000000] font-sans font-bold text-xs md:text-sm px-5 py-2.5 rounded-lg shadow-[0_0_20px_rgba(127,238,100,0.4)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <span>Visitar sitio en vivo</span>
                          <span>↗</span>
                        </span>
                      </div>
                    </div>

                    {/* Browser Footer Status Bar */}
                    <div className="flex justify-between items-center px-4 py-2 bg-[#181818] border-t border-[#485346] text-[11px] text-[#677d64] font-mono z-10">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7fee64]"></span>
                        <span>ESTADO: 200 OK</span>
                      </span>
                      <span className="text-[#7fee64] font-semibold">HTTP/3 FAST CACHE</span>
                    </div>
                  </a>
                ) : (
                  <div className="relative w-full aspect-[16/10] min-h-[380px] lg:min-h-[440px] rounded-xl overflow-hidden border border-[#485346] bg-[#0e120e] shadow-2xl flex flex-col">
                    {/* Browser Header Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#181818] border-b border-[#485346]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="text-xs font-mono text-[#8cab87] flex items-center gap-2 bg-[#212525] px-3.5 py-1 rounded border border-[#485346]/60">
                        <span className="text-[#7fee64]">https://</span>
                        <span>{activeProject.domain}</span>
                      </div>
                      <div className="w-8" />
                    </div>

                    {/* Mockup Preview Screen */}
                    <div className="relative flex-1 p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0e120e] via-[#141d14] to-[#0a120a]">
                      <div className="w-full h-full flex flex-col justify-between font-sans text-xs">
                        <div className="flex justify-between items-center text-[#8cab87] pb-2 border-b border-[#485346]/40">
                          <span className="font-semibold text-[#ddffdc]">DACTILOLOGIA AI PIPELINE</span>
                          <span className="text-[#7fee64] font-mono text-[11px]">● 60 FPS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 my-auto">
                          <div className="bg-[#181818] border border-[#485346] rounded-lg p-3 text-center shadow-lg">
                            <div className="text-[10px] text-[#677d64] uppercase font-mono">Detección de Manos</div>
                            <div className="text-sm md:text-base font-bold text-[#7fee64] mt-1">21 Keypoints</div>
                          </div>
                          <div className="bg-[#181818] border border-[#485346] rounded-lg p-3 text-center shadow-lg">
                            <div className="text-[10px] text-[#677d64] uppercase font-mono">Modelo IA</div>
                            <div className="text-sm md:text-base font-bold text-[#ddffdc] mt-1">98.4% Precision</div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[11px] text-[#677d64] pt-2 border-t border-[#485346]/40 font-mono">
                          <span>MODEL: DACTILOLOGIA_V1</span>
                          <span className="text-[#7fee64]">PYTHON 3.10 / OPENCV</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
