'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function LaptopIntro() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if intro has already been shown in this session
    try {
      if (sessionStorage.getItem('clickshop_intro_seen') === 'true') {
        return;
      }
    } catch {
      // In case storage is blocked
    }

    setIsMounted(true);

    const startTime = Date.now();
    const duration = 2900; // ~2.9s

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);

      if (elapsed >= 2800) {
        setIsFading(true);
      }
      if (elapsed >= duration + 400) {
        clearInterval(progressInterval);
        handleDismiss();
      }
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDismiss = () => {
    setIsFading(true);
    setTimeout(() => {
      try {
        sessionStorage.setItem('clickshop_intro_seen', 'true');
      } catch {}
      setIsMounted(false);
    }, 450);
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#080808] flex items-center justify-center overflow-hidden transition-all duration-500 ${
        isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Skip Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full bg-[#181818]/80 hover:bg-[#252526] border border-[#485346]/80 text-[#8cab87] hover:text-[#ddffdc] text-xs font-mono transition-all backdrop-blur-md"
      >
        Saltar intro [Esc]
      </button>

      {/* Video Element if available, otherwise cinematic simulated canvas */}
      <video
        ref={videoRef}
        src="/assets/intro.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden"
        onError={() => {
          // Fallback to simulated 3D laptop animation
        }}
      />

      {/* Simulated 3D Laptop Cinematic Zoom-In */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl px-4 animate-in fade-in zoom-in-95 duration-700">
        {/* Glow behind the laptop screen */}
        <div
          className="absolute w-[500px] h-[300px] rounded-full pointer-events-none transition-all duration-1000"
          style={{
            background: 'radial-gradient(ellipse, rgba(127, 238, 100, 0.15) 0%, rgba(221, 255, 220, 0.05) 40%, transparent 70%)',
            transform: `scale(${1 + progress * 0.015})`,
            filter: 'blur(60px)',
          }}
        />

        {/* Laptop Frame */}
        <div
          className="relative transition-transform duration-700 ease-out flex flex-col items-center"
          style={{
            transform: `scale(${1 + (progress / 100) * 0.85}) perspective(1000px) rotateX(${Math.max(0, 15 - (progress / 100) * 15)}deg)`,
          }}
        >
          {/* Laptop Lid / Screen */}
          <div className="w-[320px] sm:w-[480px] md:w-[680px] aspect-[16/10] bg-[#121212] rounded-t-2xl p-2 sm:p-3 border-2 border-[#333333] shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col relative overflow-hidden">
            {/* Camera dot */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#222] border border-[#444] z-20" />

            {/* Screen Content: Live Analytics & Code Canvas */}
            <div
              className={`flex-1 rounded-lg p-4 sm:p-6 flex flex-col justify-between overflow-hidden transition-colors duration-1000 ${
                progress > 75 ? 'bg-[#f4faf2] text-[#0e120e]' : 'bg-[#0a0d0a] text-[#ddffdc]'
              }`}
            >
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between border-b border-[#485346]/40 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7fee64] animate-ping" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider">
                    CLICKSHOP // ANALYTICS ENGINE
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-[#7fee64]">
                  TURBOPACK 60 FPS
                </div>
              </div>

              {/* Analytics Center Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 my-auto">
                <div className="p-2 sm:p-3 rounded bg-black/20 border border-[#7fee64]/30 text-center">
                  <div className="text-[9px] sm:text-[11px] font-mono opacity-70">LIGHTHOUSE</div>
                  <div className="text-sm sm:text-2xl font-bold font-mono text-[#7fee64]">100/100</div>
                </div>
                <div className="p-2 sm:p-3 rounded bg-black/20 border border-[#7fee64]/30 text-center">
                  <div className="text-[9px] sm:text-[11px] font-mono opacity-70">CORE VITALS</div>
                  <div className="text-sm sm:text-2xl font-bold font-mono text-[#7fee64]">&lt;0.4s LCP</div>
                </div>
                <div className="p-2 sm:p-3 rounded bg-black/20 border border-[#7fee64]/30 text-center">
                  <div className="text-[9px] sm:text-[11px] font-mono opacity-70">UPTIME</div>
                  <div className="text-sm sm:text-2xl font-bold font-mono text-[#7fee64]">99.9%</div>
                </div>
              </div>

              {/* Dynamic Code Streaming Stream */}
              <div className="font-mono text-[9px] sm:text-[11px] opacity-75 truncate">
                &gt; compile: src/components/IDEEnvironment.tsx (0 errors, optimized SSR)
              </div>
            </div>
          </div>

          {/* Laptop Base / Keyboard Deck */}
          <div className="w-[360px] sm:w-[540px] md:w-[760px] h-3.5 sm:h-5 bg-[#1e1e1e] rounded-b-xl border-t border-[#444] shadow-2xl relative flex items-center justify-center">
            {/* Notch */}
            <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#111] rounded-b-md" />
          </div>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="w-48 sm:w-64 mt-8 flex flex-col items-center gap-2 z-10">
          <div className="w-full h-1 rounded-full bg-[#1e1e1e] overflow-hidden border border-[#333]">
            <div
              className="h-full bg-[#7fee64] transition-all duration-75 shadow-[0_0_12px_#7fee64]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-[#8cab87] tracking-widest uppercase">
            Iniciando entorno IDE {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
