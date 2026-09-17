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
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-10 lg:px-16">

        {/* ── Top hint badge ── */}
        <div className="mb-5 flex items-center gap-2 text-xs md:text-sm font-sans text-[#8cab87] bg-[#181818]/80 border border-[#485346]/70 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg select-none">
          <span className="w-2 h-2 rounded-full bg-[#7fee64] animate-pulse" />
          <span>
            {isAutoPlaying && !userInteractedRef.current
              ? 'Avance automático activo — Desliza para explorar a tu ritmo'
              : 'Desliza para explorar a tu ritmo'}
          </span>
          <span className="text-[#7fee64] font-bold animate-bounce ml-0.5">↓</span>
        </div>

        {/* ── Chapter progress pills ── */}
        <div className="mb-4 flex items-center gap-3">
          {CHAPTERS.map((ch) => (
            <div
              key={ch.id}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-sans font-medium tracking-widest uppercase transition-all duration-300 ${
                ch.id === activeChapter.id
                  ? 'bg-[#7fee64]/10 border-[#7fee64]/50 text-[#7fee64]'
                  : targetFrame > ch.endFrame
                  ? 'bg-[#181818] border-[#485346]/40 text-[#677d64]'
                  : 'bg-transparent border-[#485346]/30 text-[#485346]'
              }`}
            >
              {targetFrame > ch.endFrame && (
                <span className="text-[#7fee64]">✓</span>
              )}
              {ch.label}
            </div>
          ))}
        </div>

        {/* ── Main 2-column layout ── */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">

          {/* LEFT: Text column */}
          <div className="w-full lg:w-5/12 relative min-h-[200px] md:min-h-[240px] flex items-start lg:items-center">
            {CHAPTERS.map((ch) => {
              const isActive = ch.id === activeChapter.id;
              const isPast = targetFrame > ch.endFrame;
              return (
                <div
                  key={ch.id}
                  className={`transition-all duration-500 ease-out transform ${
                    isActive
                      ? 'opacity-100 translate-x-0 relative z-10 w-full'
                      : isPast
                      ? 'opacity-0 -translate-x-[60px] absolute inset-0 pointer-events-none z-0'
                      : 'opacity-0 translate-x-[60px] absolute inset-0 pointer-events-none z-0'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <div className="text-xs font-sans font-medium text-[#7fee64] tracking-wider mb-2 uppercase">
                    {ch.badge}
                  </div>
                  <h3
                    className="text-[#ddffdc] text-2xl md:text-3xl lg:text-4xl font-medium mb-4 leading-tight"
                    style={{ letterSpacing: '-0.015em' }}
                  >
                    {ch.title}
                  </h3>
                  <div className="space-y-2 text-[#8cab87] text-sm md:text-base leading-relaxed mb-5">
                    <p>{ch.desc1}</p>
                    <p>{ch.desc2}</p>
                  </div>

                  {/* Chapter-complete card */}
                  <div
                    className={`transition-all duration-700 ${
                      chapterComplete && isActive
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#7fee64]/30 bg-[#7fee64]/5 text-[#7fee64] text-sm font-medium">
                      <span className="text-base">✓</span>
                      <span>{ch.card}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Canvas / monitor column */}
          <div className="w-full lg:w-7/12 flex items-center justify-center relative">
            {/* Ambient blur background for Phase 2 (vertical frames) */}
            <div
              className={`absolute inset-0 rounded-2xl bg-[#7fee64]/20 blur-3xl transition-opacity duration-700 pointer-events-none ${
                activeChapter.id === 2 ? 'opacity-40 scale-105' : 'opacity-0'
              }`}
            />

            <div className="relative w-full max-w-[760px] aspect-[16/10] rounded-lg overflow-hidden border border-[#485346] bg-[#181818] shadow-2xl flex flex-col z-10">

              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-[#485346] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="text-[10px] md:text-xs font-sans text-[#677d64] flex items-center gap-2">
                  <span className="font-medium text-[#8cab87]">CLICKSHOP ENGINE</span>
                  <span className="hidden sm:inline text-[#485346]">|</span>
                  <span className="hidden sm:inline text-[#677d64]">
                    {activeChapter.label.toUpperCase()} · FRAME {String(displayedFrame - activeChapter.startFrame + 1).padStart(2, '0')} / {String(activeChapter.endFrame - activeChapter.startFrame + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="w-8" />
              </div>

              {/* Canvas */}
              <div className="relative w-full flex-1 bg-black overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block"
                />
                {!isPreloaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-40 h-1 rounded-full bg-[#485346] overflow-hidden">
                        <div
                          className="h-full bg-[#7fee64] transition-all duration-300"
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
          </div>

        </div>
      </div>
    </section>
  );
}
