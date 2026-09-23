'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from './HeroSection';
import ScrollytellingHero from './ScrollytellingHero';
import ValuePropositionGrid from './ValuePropositionGrid';
import TrustToolSection from './TrustToolSection';
import PortfolioShowcase from './PortfolioShowcase';
import TerminalContactFooter from './TerminalContactFooter';
import ServicesView from './ServicesView';
import CleanEditorialAbout from './CleanEditorialAbout';

export type TabId = 'page.tsx' | 'portfolio.ts' | 'services.json' | 'about.md' | 'contact.sh';

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
    description: 'Landing Page & Hero Principal',
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
  {
    id: 'about.md',
    label: 'about.md',
    badgeColor: '#42a5f5',
    languageMode: 'Markdown',
    description: 'Modo Editorial & Manifiesto',
    icon: (
      <span className="text-[#42a5f5] font-bold text-[10px] font-mono border border-[#42a5f5]/60 px-0.5 rounded">
        M↓
      </span>
    ),
  },
  {
    id: 'contact.sh',
    label: 'contact.sh',
    badgeColor: '#7fee64',
    languageMode: 'Shell Script',
    description: 'Consola Terminal de Cotización',
    icon: (
      <span className="text-[#7fee64] font-bold text-[11px] font-mono">
        &gt;_
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
      if (hash === '#work') {
        setActiveTab('portfolio.ts');
      } else if (hash === '#services') {
        setActiveTab('services.json');
      } else if (hash === '#contact') {
        setActiveTab('contact.sh');
      } else if (hash === '#about') {
        setActiveTab('about.md');
      } else if (hash === '#process' || hash === '#home') {
        setActiveTab('page.tsx');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentTabConfig = tabs.find((t) => t.id === activeTab) || tabs[0];
  const isEditorialMode = activeTab === 'about.md';

  return (
    <div className="w-full flex flex-col bg-[#000000] text-[#ddffdc] min-h-screen relative overflow-x-clip">
      {/* ── VS CODE TOP FRAME (Titlebar + Tab Strip) ── */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isEditorialMode ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Top Window Titlebar */}
        <div className="w-full bg-[#181818] border-b border-[#2a2d2e] px-4 py-2 flex items-center justify-between text-xs select-none">
          {/* Left: Window Controls + Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block shadow-sm" />
            </div>

            <Link href="/" onClick={() => setActiveTab('page.tsx')} className="flex items-center gap-2 group">
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

          {/* Right: Quick Status Actions */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#858585]">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#252526] text-[10px] text-[#7fee64]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7fee64] animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="w-full bg-[#252526] border-b border-[#1f2a33] flex items-center overflow-x-auto no-scrollbar snap-x">
          <div className="flex items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.history.replaceState(null, '', tab.id === 'page.tsx' ? '/' : `#${tab.id.split('.')[0]}`);
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

      {/* ── COMMAND PALETTE MODAL ── */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
          onClick={() => setIsCommandPaletteOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-[#1e1e1e] border border-[#485346] shadow-2xl p-3 space-y-2 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] font-mono text-[#7fee64] px-2 py-1 uppercase tracking-wider">
              &gt; Abrir archivo en el editor:
            </div>
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsCommandPaletteOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
                    activeTab === tab.id ? 'bg-[#2a2d2e] text-[#7fee64]' : 'text-[#ddffdc] hover:bg-[#252526]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </span>
                  <span className="text-[11px] text-[#677d64]">{tab.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENT SWITCHER (Active Tab Viewport) ── */}
      <main className="w-full flex-1 flex flex-col overflow-x-clip">
        {/* Tab 1: page.tsx */}
        {activeTab === 'page.tsx' && (
          <div className="w-full flex flex-col animate-in fade-in duration-300">
            <HeroSection />
            <ScrollytellingHero />
            <ValuePropositionGrid />
            <TrustToolSection />
          </div>
        )}

        {/* Tab 2: portfolio.ts */}
        {activeTab === 'portfolio.ts' && (
          <div className="w-full flex flex-col animate-in fade-in duration-300">
            <PortfolioShowcase />
          </div>
        )}

        {/* Tab 3: services.json */}
        {activeTab === 'services.json' && (
          <div className="w-full flex flex-col animate-in fade-in duration-300">
            <ServicesView />
          </div>
        )}

        {/* Tab 4: about.md (Editorial Clean Mode) */}
        {activeTab === 'about.md' && (
          <div className="w-full flex flex-col animate-in fade-in duration-500">
            <CleanEditorialAbout onReturnToEditor={() => setActiveTab('page.tsx')} />
          </div>
        )}

        {/* Tab 5: contact.sh */}
        {activeTab === 'contact.sh' && (
          <div className="w-full flex flex-col animate-in fade-in duration-300">
            <TerminalContactFooter />
          </div>
        )}
      </main>

      {/* ── VS CODE BOTTOM STATUS BAR ── */}
      <footer
        className={`sticky bottom-0 z-40 w-full bg-[#181818] border-t border-[#1f2a33] text-[11px] font-mono px-3 py-1 flex items-center justify-between text-[#858585] select-none transition-all duration-300 ${
          isEditorialMode ? 'opacity-0 translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Left Status Bar Items */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#ddffdc] bg-[#252526] px-2 py-0.5 rounded">
            <span className="text-[#7fee64]">⎇</span>
            <span>main*</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 hover:text-[#ddffdc] cursor-pointer">
            <span>⊗ 0</span>
            <span>⚠ 0</span>
          </span>

          <span className="hidden md:inline-flex items-center gap-1.5 text-[#677d64]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7fee64]" />
            <span>Clickshop Engine (Port 3000)</span>
          </span>
        </div>

        {/* Right Status Bar Items */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Ln 42, Col 18</span>
          <span className="hidden sm:inline">Spaces: 2</span>
          <span>UTF-8</span>
          <span className="text-[#7fee64] font-medium">{currentTabConfig.languageMode}</span>
          <span className="hidden md:inline text-[#677d64]">Prettier ✓</span>
        </div>
      </footer>
    </div>
  );
}
