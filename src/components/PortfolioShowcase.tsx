'use client';

import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  url?: string;
  metrics: {
    perf: string;
    badgeText: string;
  };
  tags: string[];
  mockupType: 'rlp' | 'ai' | 'lab';
}

const projects: Project[] = [
  {
    id: 'rlp',
    title: 'RLP Compliance',
    url: 'https://rlpcompliance.com',
    category: 'PÁGINA WEB CORPORATIVA',
    description:
      'Plataforma web institucional desarrollada para RLP Compliance. Enfoque en autoridad de marca, arquitectura de información clara y rendimiento óptimo para el sector corporativo.',
    metrics: {
      perf: '100/100',
      badgeText: 'EN VIVO',
    },
    tags: ['Next.js', 'UX/UI Design', 'Mobile-First', 'High Performance'],
    mockupType: 'rlp',
  },
  {
    id: 'dactilologia',
    title: 'Traductor de Dactilología Alpha',
    category: 'VISIÓN POR COMPUTADORA & IA (PYTHON)',
    description:
      'Proyecto de investigación y desarrollo enfocado en el reconocimiento en tiempo real de lenguaje de señas (deletreo dactilológico) mediante procesamiento de visión artificial.',
    metrics: {
      perf: '60 FPS',
      badgeText: 'I+D IA',
    },
    tags: ['Python', 'Computer Vision', 'Real-time AI', 'R&D'],
    mockupType: 'ai',
  },
  {
    id: 'lab',
    title: 'Clickshop UI/UX Lab',
    category: 'CONCEPTOS & PROTOTIPOS INTERACTIVOS',
    description:
      'Demostraciones visuales y prototipos de alto rendimiento desarrollados internamente para probar micro-interacciones, velocidad de carga y conversión.',
    metrics: {
      perf: '99/100',
      badgeText: 'LAB RENDER',
    },
    tags: ['UX/UI Research', 'Micro-Interactions', 'Tailwind CSS'],
    mockupType: 'lab',
  },
];

export default function PortfolioShowcase() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="work" className="w-full bg-[#000000] py-24 px-6 md:px-12 lg:px-20 border-t border-[#1f2a33]">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1f2a33]">
          <div>
            <h2
              className="text-[#ddffdc] text-[32px] md:text-[44px] font-medium leading-tight"
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                letterSpacing: '-0.012em',
              }}
            >
              Proyectos Destacados e Investigación
            </h2>
          </div>
          <p className="text-[#8cab87] text-[15px] max-w-md mt-4 md:mt-0 tracking-[-0.022em]">
            Desde sitios corporativos en producción hasta algoritmos de inteligencia artificial e investigación de interfaz.
          </p>
        </div>

        {/* Project Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-[#181818] rounded-lg border border-[#485346] p-6 md:p-7 transition-all duration-300 hover:border-[#677d64] flex flex-col justify-between overflow-hidden"
              style={{
                background:
                  hoveredCard === project.id
                    ? 'radial-gradient(circle at 50% 0%, rgba(127, 238, 100, 0.08) 0%, #181818 70%)'
                    : '#181818',
              }}
            >
              <div>
                {/* Top Bar: Traffic Light Dots + Performance Label */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#485346]/40">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="text-xs font-sans text-[#677d64] ml-2">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#7fee64] transition-colors"
                        >
                          rlpcompliance.com ↗
                        </a>
                      ) : (
                        `${project.id}.clickshop.dev`
                      )}
                    </span>
                  </div>
                  <span className="text-[#7fee64] text-xs font-medium font-sans">
                    {project.metrics.badgeText}
                  </span>
                </div>

                {/* Mockup Preview Area */}
                <div className="w-full h-44 rounded-md bg-[#0e120e] border border-[#485346]/60 p-4 mb-5 relative overflow-hidden flex flex-col justify-between">
                  {/* Mockup 1: RLP Compliance */}
                  {project.mockupType === 'rlp' && (
                    <div className="w-full h-full flex flex-col justify-between font-sans text-[11px]">
                      <div className="flex justify-between text-[#8cab87]">
                        <span>SITIO INSTITUCIONAL</span>
                        <span className="text-[#7fee64]">99.8% DISPONIBILIDAD</span>
                      </div>
                      <div className="bg-[#181818] border border-[#485346] rounded p-2.5 my-auto">
                        <div className="text-[10px] text-[#7fee64] font-bold mb-1">
                          RLP COMPLIANCE EN VIVO
                        </div>
                        <div className="text-[#ddffdc] text-xs font-sans font-medium">
                          Servicios Corporativos &amp; Cumplimiento Normativo
                        </div>
                        <div className="text-[9px] text-[#677d64] mt-1">
                          Navegación fluida &bull; Optimizado para dispositivos móviles
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-[#677d64]">
                        <span>HTTPS SECURE</span>
                        <span className="text-[#7fee64]">HTTP/3 EDGE CACHE</span>
                      </div>
                    </div>
                  )}

                  {/* Mockup 2: Python AI Dactilología */}
                  {project.mockupType === 'ai' && (
                    <div className="w-full h-full flex flex-col justify-between font-sans text-[11px]">
                      <div className="flex justify-between text-[#8cab87]">
                        <span>COMPUTER VISION PIPELINE</span>
                        <span className="text-[#7fee64]">60 FPS RECOG</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 my-auto">
                        <div className="bg-[#181818] border border-[#485346] rounded p-2 text-center">
                          <div className="text-[9px] text-[#677d64]">LANDMARKS</div>
                          <div className="text-xs font-bold text-[#7fee64]">21 KEYPOINTS</div>
                        </div>
                        <div className="bg-[#181818] border border-[#485346] rounded p-2 text-center">
                          <div className="text-[9px] text-[#677d64]">PRECISIÓN</div>
                          <div className="text-xs font-bold text-[#ddffdc]">98.4% IA</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#677d64] flex justify-between">
                        <span>MODEL: DACTILOLOGIA_V1</span>
                        <span className="text-[#7fee64]">PYTHON 3.10</span>
                      </div>
                    </div>
                  )}

                  {/* Mockup 3: Clickshop UI/UX Lab */}
                  {project.mockupType === 'lab' && (
                    <div className="w-full h-full flex flex-col justify-between font-sans text-[11px]">
                      <div className="flex justify-between text-[#8cab87]">
                        <span>INTERACTIVE LAB BENCHMARK</span>
                        <span className="text-[#7fee64]">RENDER: 0.4ms</span>
                      </div>
                      <div className="flex items-center justify-around py-2 my-auto bg-[#181818] border border-[#485346] rounded">
                        <div className="text-center">
                          <div className="text-[9px] text-[#677d64]">MICRO-ANIM</div>
                          <div className="text-xs font-bold text-[#7fee64]">FLUID 60FPS</div>
                        </div>
                        <div className="h-6 w-[1px] bg-[#485346]" />
                        <div className="text-center">
                          <div className="text-[9px] text-[#677d64]">LIGHTHOUSE</div>
                          <div className="text-xs font-bold text-[#ddffdc]">100 SCORE</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-[#677d64] text-center">
                        PROTOTIPADO RÁPIDO &bull; TAILWIND CSS &bull; NEXT.JS
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <span className="text-[#9cbf93] text-xs font-sans font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3
                  className="text-[#ddffdc] text-[20px] md:text-[22px] font-medium mt-1 mb-2 leading-snug"
                  style={{
                    fontFamily: 'var(--font-sans, sans-serif)',
                    letterSpacing: '-0.013em',
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-[#8cab87] text-[14px] leading-relaxed mb-5">
                  {project.description}
                </p>
              </div>

              {/* Bottom Area: Clean Minimalist Tags & External Link */}
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 border-t border-[#485346]/40 text-xs font-sans text-[#8cab87]">
                  {project.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      {idx > 0 && <span className="text-[#485346]">&bull;</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </div>

                {project.url && (
                  <div className="mt-4 pt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans text-[#7fee64] hover:underline font-medium"
                    >
                      <span>Visitar sitio web ({project.url.replace('https://', '')})</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
