'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

// ─── Frame counts per chapter ───────────────────────────────────────────────
const FASE1_FRAMES = 84;
const FASE2_FRAMES = 84;
const FASE3_FRAMES = 92;
const TOTAL_FRAMES = FASE1_FRAMES + FASE2_FRAMES + FASE3_FRAMES; // 260

// ─── Helper: get image path for a global frame index (1-based) ──────────────
function getFrameSrc(globalIndex: number): string {
  if (globalIndex <= FASE1_FRAMES) {
    return `/frames/fase1/${String(globalIndex).padStart(2, '0')}.webp`;
  } else if (globalIndex <= FASE1_FRAMES + FASE2_FRAMES) {
    const local = globalIndex - FASE1_FRAMES;
    return `/frames/fase2/${String(local).padStart(2, '0')}.webp`;
  } else {
    const local = globalIndex - FASE1_FRAMES - FASE2_FRAMES;
    return `/frames/fase3/${String(local).padStart(2, '0')}.webp`;
  }
}

// ─── Chapter definitions ─────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 1,
    label: 'Capítulo 1',
    card: 'Fase 1: Arquitectura & Código',
    badge: '01 // Arquitectura Técnica',
    title: (
      <>
        Codificando la{' '}
        <span className="text-[#7fee64]">arquitectura técnica</span>
      </>
    ),
    desc1: 'Construimos las bases del proyecto con Next.js y TypeScript de alto rendimiento.',
    desc2: 'Sin código redundante ni librerías pesadas: cada componente se compila para responder al instante.',
    startFrame: 1,
    endFrame: FASE1_FRAMES,
    isVertical: false,
  },
  {
    id: 2,
    label: 'Capítulo 2',
    card: 'Fase 2: Posicionamiento & Experiencia de Usuario',
    badge: '02 // Posicionamiento UX/UI',
    title: (
      <>
        Diseño y{' '}
        <span className="text-[#7fee64]">experiencia visual UX/UI</span>
      </>
    ),
    desc1: 'Creamos una estructura de navegación clara que capta la atención en segundos.',
    desc2: 'Diseño responsive adaptado a los patrones de navegación reales de tus clientes.',
    startFrame: FASE1_FRAMES + 1,
    endFrame: FASE1_FRAMES + FASE2_FRAMES,
    isVertical: true,
  },
  {
    id: 3,
    label: 'Capítulo 3',
    card: 'Fase 3: Conversión & Ventas Automáticas',
    badge: '03 // Alta Conversión en Vivo',
    title: (
      <>
        Tu sitio listo para{' '}
        <span className="text-[#7fee64]">generar ventas 24/7</span>
      </>
    ),
    desc1: 'Rendimiento 100/100 en Lighthouse y tiempos de respuesta ultrarrápidos.',
    desc2: 'Tu presencia digital transformada en un activo que genera autoridad y ventas de forma automática.',
    startFrame: FASE1_FRAMES + FASE2_FRAMES + 1,
    endFrame: TOTAL_FRAMES,
    isVertical: false,
  },
];

export default function ScrollytellingHero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const displayedFrameRef = useRef<number>(1);
  const [displayedFrame, setDisplayedFrame] = useState<number>(1);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Auto-play state & refs
  const [isInViewport, setIsInViewport] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoFrameRef = useRef<number>(1);
  const userInteractedRef = useRef<boolean>(false);

  const progress = useScrollProgress(containerRef);

  // ── 1. Intersection Observer ───────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ── 2. Detect manual user interaction → cancel auto-play ──────────────────
  useEffect(() => {
    const handleInteraction = () => {
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        setIsAutoPlaying(false);
      }
    };
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener('wheel', handleInteraction, opts);
    window.addEventListener('touchstart', handleInteraction, opts);
    window.addEventListener('touchmove', handleInteraction, opts);
    window.addEventListener('mousedown', handleInteraction, opts);
    window.addEventListener('keydown', handleInteraction, opts);
    return () => {
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  // ── 3. Auto-play frame ticker (~26 fps = 38 ms) ────────────────────────────
  useEffect(() => {
    if (!isInViewport || !isAutoPlaying || userInteractedRef.current) return;
    const interval = setInterval(() => {
      if (autoFrameRef.current < TOTAL_FRAMES) {
        autoFrameRef.current += 1;
      } else {
        setIsAutoPlaying(false);
        clearInterval(interval);
      }
    }, 38);
    return () => clearInterval(interval);
  }, [isInViewport, isAutoPlaying]);

  // ── 4. Scroll → target frame mapping (3 equal thirds) ─────────────────────
  let scrollTargetFrame = 1;
  if (progress <= 0.33) {
    const norm = progress / 0.33;
    scrollTargetFrame = Math.round(1 + norm * (FASE1_FRAMES - 1));
  } else if (progress <= 0.66) {
    const norm = (progress - 0.33) / 0.33;
    scrollTargetFrame = Math.round(FASE1_FRAMES + 1 + norm * (FASE2_FRAMES - 1));
  } else {
    const norm = Math.min(1, (progress - 0.66) / 0.34);
    scrollTargetFrame = Math.round(
      FASE1_FRAMES + FASE2_FRAMES + 1 + norm * (FASE3_FRAMES - 1)
    );
  }
  scrollTargetFrame = Math.max(1, Math.min(TOTAL_FRAMES, scrollTargetFrame));

  // Auto-play overrides scroll when ahead
  const targetFrame =
    !userInteractedRef.current && isAutoPlaying && autoFrameRef.current > scrollTargetFrame
      ? autoFrameRef.current
      : scrollTargetFrame;

  // ── 5. Determine active chapter ────────────────────────────────────────────
  const activeChapter =
    CHAPTERS.find(
      (ch) => targetFrame >= ch.startFrame && targetFrame <= ch.endFrame
    ) ?? CHAPTERS[0];

  // Is chapter fully played? (show frozen card)
  const chapterComplete = targetFrame >= activeChapter.endFrame;

  // ── 6. Canvas drawing ──────────────────────────────────────────────────────
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[frameIdx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(Math.round(rect.width * dpr), 300);
    const h = Math.max(Math.round(rect.height * dpr), 200);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = w / h;
    let dw = w, dh = h, ox = 0, oy = 0;
    if (cr > ir) { dw = h * ir; ox = (w - dw) / 2; }
    else { dh = w / ir; oy = (h - dh) / 2; }
    ctx.drawImage(img, ox, oy, dw, dh);
  }, []);

  // ── 7. Preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    const imgs: HTMLImageElement[] = [];
    let counter = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        if (!mounted) return;
        counter++;
        setLoadedCount(counter);
        if (counter === 1) drawFrame(1);
        if (counter === TOTAL_FRAMES) { setIsPreloaded(true); drawFrame(displayedFrameRef.current); }
      };
      img.onerror = () => { if (!mounted) return; counter++; setLoadedCount(counter); };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => { mounted = false; };
  }, [drawFrame]);

  // ── 8. Smooth lerp render loop ─────────────────────────────────────────────
  useEffect(() => {
    let raf: number;
    const loop = () => {
      const diff = targetFrame - displayedFrameRef.current;
      if (Math.abs(diff) > 0.005) displayedFrameRef.current += diff * 0.09;
      else displayedFrameRef.current = targetFrame;
      const f = Math.round(displayedFrameRef.current);
      setDisplayedFrame(f);
      drawFrame(f);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [targetFrame, drawFrame]);

  // Resize redraw
  useEffect(() => {
    const onResize = () => drawFrame(displayedFrameRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawFrame]);

  return (
    <section ref={containerRef} className="relative h-[600vh] w-full bg-black">
      {/* ── Sticky Full-screen Container (100vh Pinning) ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between overflow-hidden px-4 md:px-8 py-4 select-none">

        {/* ── Top Header Bar (Pills & Hint) ── */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 z-30 shrink-0">
          {/* Chapter progress pills */}
          <div className="flex items-center gap-2 md:gap-3">
            {CHAPTERS.map((ch) => (
              <div
                key={ch.id}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-sans font-medium tracking-widest uppercase transition-all duration-500 backdrop-blur-md ${
                  ch.id === activeChapter.id
                    ? 'bg-[#7fee64]/15 border-[#7fee64] text-[#7fee64] shadow-[0_0_15px_rgba(127,238,100,0.25)]'
                    : targetFrame > ch.endFrame
                    ? 'bg-[#181818]/80 border-[#485346]/60 text-[#8cab87]'
                    : 'bg-black/40 border-[#485346]/30 text-[#485346]'
                }`}
              >
                {targetFrame > ch.endFrame && (
                  <span className="text-[#7fee64] font-bold">✓</span>
                )}
                {ch.label}
              </div>
            ))}
          </div>

          {/* Navigation hint badge */}
          <div className="flex items-center gap-2 text-[11px] md:text-xs font-sans text-[#8cab87] bg-[#181818]/90 border border-[#485346]/80 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7fee64] animate-pulse" />
            <span>
              {isAutoPlaying && !userInteractedRef.current
                ? 'Avance automático activo — Desliza para explorar'
                : 'Desliza para explorar a tu ritmo'}
            </span>
            <span className="text-[#7fee64] font-bold animate-bounce ml-0.5">↓</span>
          </div>
        </div>

        {/* ── Center Stage: Adaptive Dynamic Canvas Container ── */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-0 my-auto z-20">

          {/* Ambient Glow behind Canvas (Active & intensified on Vertical Phase 2) */}
          <div
            className={`absolute transition-all duration-700 pointer-events-none rounded-full blur-3xl ${
              activeChapter.isVertical
                ? 'w-[320px] md:w-[480px] h-[85vh] bg-[#7fee64]/20 opacity-40 scale-105'
                : 'w-[80%] max-w-3xl h-[60%] bg-[#7fee64]/10 opacity-20'
            }`}
          />

          {/* Main Monitor/Phone Adaptive Frame */}
          <div
            className={`relative flex flex-col rounded-xl overflow-hidden border border-[#485346] bg-[#181818] shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out mx-auto ${
              activeChapter.isVertical
                ? 'w-auto h-full max-h-[85vh] aspect-[9/16] max-w-4xl'
                : 'w-full max-w-4xl aspect-[16/9] max-h-[68vh] md:max-h-[75vh]'
            }`}
          >
            {/* Window / App Bar Chrome */}
            <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#181818] border-b border-[#485346]/80 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="text-[10px] md:text-[11px] font-sans text-[#677d64] flex items-center gap-2">
                <span className="font-medium text-[#8cab87]">CLICKSHOP ENGINE</span>
                <span className="text-[#485346]">|</span>
                <span className="text-[#677d64]">
                  {activeChapter.label.toUpperCase()} · F{String(displayedFrame - activeChapter.startFrame + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="w-4" />
            </div>

            {/* Canvas Viewport */}
            <div className="relative w-full flex-1 bg-black overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-auto h-full max-h-[85vh] object-contain mx-auto block"
              />

              {/* Preload Overlay */}
              {!isPreloaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-xs font-sans text-[#8cab87] tracking-widest uppercase">
                      CLICKSHOP ENGINE
                    </div>
                    <div className="w-40 h-1.5 rounded-full bg-[#485346] overflow-hidden">
                      <div
                        className="h-full bg-[#7fee64] transition-all duration-300 shadow-[0_0_10px_#7fee64]"
                        style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-sans text-[#677d64]">
                      Cargando {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Side Info Overlay for Phase 2 (Desktop letterbox area) ── */}
          {activeChapter.isVertical && (
            <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 w-80 z-30 pointer-events-auto">
              <div className="p-5 rounded-xl bg-[#181818]/90 border border-[#485346]/80 backdrop-blur-md shadow-2xl transition-all duration-500">
                <div className="text-xs font-sans font-medium text-[#7fee64] tracking-wider mb-2 uppercase">
                  {activeChapter.badge}
                </div>
                <h3 className="text-[#ddffdc] text-xl font-medium mb-3 leading-snug">
                  {activeChapter.title}
                </h3>
                <p className="text-[#8cab87] text-xs md:text-sm leading-relaxed mb-4">
                  {activeChapter.desc1}
                </p>
                <div
                  className={`transition-all duration-500 ${
                    chapterComplete
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#7fee64]/40 bg-[#7fee64]/10 text-[#7fee64] text-xs font-medium">
                    <span>✓</span>
                    <span>{activeChapter.card}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom Info Card (Overlaid Glassmorphism) ── */}
        <div className="w-full max-w-4xl mx-auto z-30 shrink-0">
          <div className="relative min-h-[90px] md:min-h-[105px] flex items-center justify-center">
            {CHAPTERS.map((ch) => {
              const isActive = ch.id === activeChapter.id;
              const hideBottomOnXl = ch.isVertical ? 'xl:opacity-0 xl:pointer-events-none' : '';

              return (
                <div
                  key={ch.id}
                  className={`transition-all duration-500 ease-out transform absolute inset-x-0 bottom-0 ${
                    isActive
                      ? 'opacity-100 translate-y-0 z-10 pointer-events-auto'
                      : 'opacity-0 translate-y-4 pointer-events-none z-0'
                  } ${hideBottomOnXl}`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <div className="p-3 md:p-4 rounded-xl bg-[#181818]/90 border border-[#485346]/80 backdrop-blur-md shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] md:text-xs font-sans font-medium text-[#7fee64] tracking-wider uppercase">
                          {ch.badge}
                        </span>
                        {chapterComplete && isActive && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-[#7fee64]/40 bg-[#7fee64]/10 text-[#7fee64] text-[10px] font-medium animate-fadeIn">
                            ✓ {ch.card}
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-[#ddffdc] text-sm md:text-base lg:text-lg font-medium leading-tight"
                        style={{ letterSpacing: '-0.015em' }}
                      >
                        {ch.title}
                      </h3>
                      <p className="text-[#8cab87] text-xs md:text-sm leading-relaxed hidden sm:block">
                        {ch.desc1}
                      </p>
                    </div>

                    {/* Completion badge for larger screens if not inline */}
                    <div
                      className={`hidden md:flex transition-all duration-500 shrink-0 ${
                        chapterComplete && isActive
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#7fee64]/40 bg-[#7fee64]/10 text-[#7fee64] text-xs font-medium shadow-[0_0_15px_rgba(127,238,100,0.15)]">
                        <span className="text-sm font-bold">✓</span>
                        <span>Fase Lista</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
