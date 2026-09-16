'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const TOTAL_FRAMES = 84;

const phaseTexts = [
  {
    phase: 1,
    badge: '01 // Arquitectura Técnica',
    title: (
      <>
        Codificando la <span className="text-[#7fee64]">arquitectura técnica</span>
      </>
    ),
    desc1: 'Construimos las bases del proyecto con Next.js y TypeScript de alto rendimiento.',
    desc2: 'Sin código redundante ni librerías pesadas: cada componente se compila para responder al instante.',
  },
  {
    phase: 2,
    badge: '02 // Estructuración UX/UI',
    title: (
      <>
        Diseño y <span className="text-[#7fee64]">experiencia visual UX/UI</span>
      </>
    ),
    desc1: 'Creamos una estructura de navegación clara que capta la atención del usuario en segundos.',
    desc2: 'Diseño responsive adaptado a las necesidades reales y patrones de navegación de tus clientes.',
  },
  {
    phase: 3,
    badge: '03 // Alta Conversión en Vivo',
    title: (
      <>
        Tu sitio web listo para <span className="text-[#7fee64]">generar resultados</span>
      </>
    ),
    desc1: 'Rendimiento de 100/100 en Lighthouse y tiempos de respuesta ultrarrápidos.',
    desc2: 'Tu presencia digital transformada en un activo corporativo que genera autoridad y ventas 24/7.',
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

  const progress = useScrollProgress(containerRef);

  // 1. EXACT FRAME MAPPING & ACTIVE PHASE BY PROGRESS RANGES:
  // Phase 1 (0% - 45%): Frames 1 to 38
  // Phase 2 (46% - 83%): Frames 39 to 70
  // Phase 3 (84% - 100%): Frames 71 to 84 (freezes on 84 at end)
  let targetFrame = 1;
  let activePhase = 1;

  if (progress <= 0.45) {
    activePhase = 1;
    const norm = Math.max(0, progress / 0.45);
    targetFrame = Math.min(38, Math.max(1, Math.round(1 + norm * 37)));
  } else if (progress <= 0.83) {
    activePhase = 2;
    const norm = (progress - 0.45) / 0.38;
    targetFrame = Math.min(70, Math.max(39, Math.round(39 + norm * 31)));
  } else {
    activePhase = 3;
    const norm = Math.min(1, (progress - 0.83) / 0.17);
    targetFrame = Math.min(84, Math.max(71, Math.round(71 + norm * 13)));
  }

  // 2. Canvas drawing with object-fit: contain logic
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(Math.round(rect.width * dpr), 300);
    const height = Math.max(Math.round(rect.height * dpr), 200);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let drawW = width;
    let drawH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawW = height * imgRatio;
      offsetX = (width - drawW) / 2;
    } else {
      drawH = width / imgRatio;
      offsetY = (height - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // 3. Asynchronous preloading of all 84 PNG frames
  useEffect(() => {
    let mounted = true;
    const preloadedImages: HTMLImageElement[] = [];
    let loadedCounter = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const formattedIndex = String(i).padStart(2, '0');
      img.src = `/frames/${formattedIndex}.png`;

      img.onload = () => {
        if (!mounted) return;
        loadedCounter++;
        setLoadedCount(loadedCounter);
        if (loadedCounter === 1) {
          drawFrame(1);
        }
        if (loadedCounter === TOTAL_FRAMES) {
          setIsPreloaded(true);
          drawFrame(displayedFrameRef.current);
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        loadedCounter++;
        setLoadedCount(loadedCounter);
      };

      preloadedImages.push(img);
    }

    imagesRef.current = preloadedImages;

    return () => {
      mounted = false;
    };
  }, [drawFrame]);

  // 4. Smooth Lerp Frame Animation Loop (lerp factor: 0.09 for ~3s reading per phase)
  useEffect(() => {
    let rafId: number;

    const render = () => {
      const diff = targetFrame - displayedFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        displayedFrameRef.current += diff * 0.09;
      } else {
        displayedFrameRef.current = targetFrame;
      }

      const frameToDraw = Math.round(displayedFrameRef.current);
      setDisplayedFrame(frameToDraw);
      drawFrame(frameToDraw);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [targetFrame, drawFrame]);

  // Handle window resize re-draw
  useEffect(() => {
    const handleResize = () => {
      drawFrame(displayedFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  return (
    // Outer scroll track (Sticky container height 500vh for 3s reading rhythm per phase)
    <section ref={containerRef} className="relative h-[500vh] w-full bg-black">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20">
        
        {/* Main Fixed 2-Column Container (Text Left, Canvas Right) */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* TEXT CONTENT COLUMN (Fixed Left Column, Slide-in from Right) */}
          <div className="w-full lg:w-5/12 relative min-h-[220px] md:min-h-[240px] flex items-center">
            {phaseTexts.map((item) => {
              const isActive = activePhase === item.phase;
              const isPast = activePhase > item.phase;

              return (
                <div
                  key={item.phase}
                  className={`transition-all duration-500 ease-out transform ${
                    isActive
                      ? 'opacity-100 translate-x-0 relative z-10'
                      : isPast
                      ? 'opacity-0 -translate-x-[60px] absolute inset-0 pointer-events-none z-0'
                      : 'opacity-0 translate-x-[60px] absolute inset-0 pointer-events-none z-0'
                  }`}
                  style={{
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '500ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="text-xs font-sans font-medium text-[#7fee64] tracking-wider mb-2 uppercase">
                    {item.badge}
                  </div>
                  <h3
                    className="text-[#ddffdc] text-2xl md:text-3xl lg:text-4xl font-medium mb-4 leading-tight"
                    style={{
                      fontFamily: 'var(--font-sans, sans-serif)',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div className="space-y-2 text-[#8cab87] text-sm md:text-base leading-relaxed">
                    <p>{item.desc1}</p>
                    <p>{item.desc2}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CANVAS / MONITOR CONTAINER COLUMN (Fixed Right Column) */}
          <div className="w-full lg:w-7/12 flex items-center justify-center">
            <div className="relative w-full aspect-video flex items-center justify-center">
              <div className="relative w-full max-w-[760px] aspect-[16/10] rounded-lg overflow-hidden border border-[#485346] bg-[#181818] shadow-2xl flex flex-col">
                
                {/* Window Header Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-[#485346]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="text-[10px] md:text-xs font-sans text-[#677d64] flex items-center gap-2">
                    <span className="font-medium text-[#8cab87]">CLICKSHOP ENGINE</span>
                    <span className="hidden sm:inline text-[#485346]">|</span>
                    <span className="hidden sm:inline text-[#677d64]">
                      FRAME {String(displayedFrame).padStart(2, '0')} / {TOTAL_FRAMES}
                    </span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Canvas Viewport Screen */}
                <div className="relative w-full flex-1 bg-black overflow-hidden flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain block"
                  />

                  {/* Preloader indicator */}
                  {!isPreloaded && loadedCount < TOTAL_FRAMES && (
                    <div className="absolute bottom-3 right-4 text-[10px] font-sans text-[#677d64] bg-[#181818]/80 px-2 py-1 rounded border border-[#485346]">
                      Cargando: {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Instruction Hint */}
        <div
          className="absolute bottom-6 md:bottom-8 flex items-center gap-2 text-xs font-sans text-[#677d64] tracking-wider transition-opacity duration-300"
          style={{ opacity: progress > 0.9 ? 0 : 0.8 }}
        >
          <span>Haz scroll para ver la transformación</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
}
