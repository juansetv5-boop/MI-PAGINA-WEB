'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from './HeroSection';
import TrustToolSection from './TrustToolSection';
import PortfolioShowcase from './PortfolioShowcase';
import TerminalContactFooter from './TerminalContactFooter';
import ServicesView from './ServicesView';
import CleanEditorialAbout from './CleanEditorialAbout';

export type TabId = 'page.tsx' | 'portfolio.ts' | 'services.json';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  badgeColor: string;
  languageMode: string;
  description: string;
}

const tabs: TabConfig[] = [
  {
    id: 'page.tsx',
    label: 'page.tsx',
    badgeColor: '#00d8ff',
    languageMode: 'TypeScript React',
    description: 'Landing Page & Inicio',
    icon: (
      <span className="text-[#00d8ff] font-bold text-[11px] font-mono">
        ⚛
      </span>
    ),
  },
  {
    id: 'portfolio.ts',
    label: 'portfolio.ts',
    badgeColor: '#3178c6',
    languageMode: 'TypeScript',
    description: 'Proyectos & Casos de Estudio',
    icon: (
      <span className="text-[#3178c6] font-bold text-[10px] font-mono px-1 rounded bg-[#3178c6]/10">
        TS
      </span>
    ),
  },
  {
    id: 'services.json',
    label: 'services.json',
    badgeColor: '#cbcb41',
    languageMode: 'JSON',
    description: 'Estructura de Servicios & Tiempos',
    icon: (
      <span className="text-[#cbcb41] font-bold text-[11px] font-mono">
        &#123;&#125;
      </span>
    ),
  },
];

export default function IDETabManager() {
  const [activeTab, setActiveTab] = useState<TabId>('page.tsx');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync with URL hashes for seamless deep-linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#work' || hash === '#portfolio') {
        setActiveTab('portfolio.ts');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#services') {
        setActiveTab('services.json');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#home') {
        setActiveTab('page.tsx');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#process') {
        if (activeTab !== 'page.tsx') setActiveTab('page.tsx');
        setTimeout(() => {
          const el = document.getElementById('process');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === '#about') {
        setTimeout(() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === '#contact') {
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  const currentTabConfig = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="w-full bg-[#0a0a0a] flex flex-col min-h-screen overflow-x-clip">
      {/* ── 1. WRAPPER EXTERIOR DEL MARCO FLOTANTE SUPERIOR (CABECERA + HERO) ── */}
      <div className="w-full p-2.5 sm:p-5 md:p-8 pb-0 sm:pb-0 md:pb-0 pt-3 sm:pt-6 md:pt-8 flex flex-col items-center">
        {/* ── CONTENEDOR DE LA VENTANA PRINCIPAL REDONDEADA (LOOK LONZO VISUALS) ── */}
        <div className="w-full max-w-7xl mx-auto bg-[#1e1e1e] rounded-2xl md:rounded-3xl border border-[#2d2d2d] shadow-2xl overflow-hidden relative flex flex-col">
          {/* Cabecera de Ventana (Titlebar + Tab Strip + Breadcrumbs) */}
          <header className="sticky top-0 z-40 w-full bg-[#181818] border-b border-[#2a2d2e] select-none">
            {/* Top Window Titlebar */}
            <div className="w-full px-4 py-2.5 flex items-center justify-between text-xs">
              {/* Left: Window Controls + Logo */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block shadow-sm" />
                </div>

                <Link
                  href="/"
                  onClick={() => {
                    setActiveTab('page.tsx');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 group"
                >
                  <Image
                    src="/logo.jpg"
                    alt="Clickshop"
                    width={120}
                    height={32}
                    className="h-6 w-auto rounded object-contain transition-opacity group-hover:opacity-85"
                    priority
                  />
                </Link>
              </div>

              {/* Center: Command Palette Trigger / Workspace Title */}
              <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-4">
                <button
                  onClick={() => setIsCommandPaletteOpen(!isCommandPaletteOpen)}
                  className="w-full px-3 py-1 rounded bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] text-[11px] font-mono text-[#858585] hover:text-[#ddffdc] flex items-center justify-between transition-colors shadow-inner"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-[#7fee64]">clickshop-labs</span>
                    <span>&gt;</span>
                    <span className="text-[#ddffdc]">{activeTab}</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e1e1e] border border-[#3c3c3c] text-[#858585]">
                    ⌘P
                  </span>
                </button>
              </div>

              {/* Right: Clean right side */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#677d64]">
                {/* Clean */}
              </div>
            </div>

            {/* Tab Strip */}
            <div className="w-full bg-[#252526] border-t border-b border-[#1f2a33] flex items-center overflow-x-auto no-scrollbar snap-x">
              <div className="flex items-center">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        window.history.replaceState(
                          null,
                          '',
                          tab.id === 'page.tsx' ? '/' : `#${tab.id.split('.')[0]}`
                        );
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-mono whitespace-nowrap snap-center min-h-[44px] transition-all border-r border-[#1f2a33] ${
                        isActive
                          ? 'bg-[#1e1e1e] text-[#ffffff] font-medium border-t-2 border-t-[#7fee64] shadow-sm'
                          : 'bg-[#252526] text-[#858585] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
                      }`}
                      aria-selected={isActive}
                      role="tab"
                    >
                      {/* File Icon */}
                      <span className="flex items-center justify-center shrink-0">
                        {tab.icon}
                      </span>

                      {/* Tab Label */}
                      <span className="tracking-tight">{tab.label}</span>

                      {/* Close Tab Icon '×' */}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isActive && tab.id !== 'page.tsx') {
                            setActiveTab('page.tsx');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="w-4 h-4 ml-1 rounded-sm flex items-center justify-center text-[#858585] hover:text-[#ffffff] hover:bg-[#333333] transition-colors text-xs font-sans"
                        title="Cerrar archivo"
                      >
                        ×
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Breadcrumb line */}
            <div className="w-full bg-[#1e1e1e] border-b border-[#2d2d2d] px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-[#858585] select-none">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-[#677d64]">clickshop</span>
                <span>&gt;</span>
                <span className="text-[#677d64]">src</span>
                <span>&gt;</span>
                <span className="text-[#7fee64] font-medium">{activeTab}</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[10px] text-[#677d64]">
                <span>UTF-8</span>
                <span>&bull;</span>
                <span>{currentTabConfig.languageMode}</span>
              </div>
            </div>
          </header>

          {/* ── CONTENIDO DENTRO DE LA VENTANA: HERO INICIAL / VISTA ACTIVA ── */}
          <div className="w-full bg-[#000000]">
            {activeTab === 'page.tsx' && (
              <div className="w-full flex flex-col animate-in fade-in duration-300">
                <HeroSection />
              </div>
            )}

            {activeTab === 'portfolio.ts' && (
              <div className="w-full flex flex-col animate-in fade-in duration-300">
                <PortfolioShowcase />
              </div>
            )}

            {activeTab === 'services.json' && (
              <div className="w-full flex flex-col animate-in fade-in duration-300">
                <ServicesView />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── COMMAND PALETTE MODAL ── */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-24 px-4"
          onClick={() => setIsCommandPaletteOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-[#1e1e1e] border border-[#485346] shadow-2xl p-3 space-y-2 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] font-mono text-[#7fee64] px-2 py-1 uppercase tracking-wider">
              &gt; Abrir archivo o sección:
            </div>

            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsCommandPaletteOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#2a2d2e] text-[#7fee64]'
                      : 'text-[#ddffdc] hover:bg-[#252526]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </span>
                  <span className="text-[11px] text-[#677d64]">
                    {tab.description}
                  </span>
                </button>
              ))}

              <div className="pt-2 border-t border-[#2a2d2e]">
                <a
                  href="#process"
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    if (activeTab !== 'page.tsx') setActiveTab('page.tsx');
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left text-[#ddffdc] hover:bg-[#252526] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#7fee64]">⚡</span>
                    <span>process (Proceso de Desarrollo)</span>
                  </span>
                  <span className="text-[11px] text-[#677d64]">3 Pasos Estratégicos</span>
                </a>
                <a
                  href="#about"
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left text-[#ddffdc] hover:bg-[#252526] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#7fee64]">📖</span>
                    <span>about (Sobre Nosotros)</span>
                  </span>
                  <span className="text-[11px] text-[#677d64]">Filosofía & Equipo</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left text-[#ddffdc] hover:bg-[#252526] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#7fee64]">&gt;_</span>
                    <span>contact (Consola de Cotización)</span>
                  </span>
                  <span className="text-[11px] text-[#677d64]">Terminal de Contacto</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. SECCIONES A ANCHO COMPLETO (FULL-WIDTH EDGE-TO-EDGE) ── */}
      <main className="w-full max-w-full bg-[#0a0a0a] overflow-x-clip mt-6 sm:mt-10 md:mt-12">
        {/* Proceso y Metodología (en vista inicial) */}
        {activeTab === 'page.tsx' && <TrustToolSection />}

        {/* Flujo Global Común a Pantalla Completa: Sobre Nosotros + Contacto */}
        <CleanEditorialAbout />
        <TerminalContactFooter />
      </main>
    </div>
  );
}
