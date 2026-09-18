'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useWizard } from './WizardContext';
import ScrollReveal from './ScrollReveal';

// ─── Frame Counts ─────────────────────────────────────────────────────────────
const FASE1_FRAMES = 84;
const FASE2_FRAMES = 100;
const FASE3_FRAMES = 92;

// ─── Helpers: Frame Image Paths ──────────────────────────────────────────────
const getFase1Src = (i: number) => `/frames/fase1/${String(i).padStart(2, '0')}.webp`;
const getFase2Src = (i: number) => `/frames/fase2/${String(i).padStart(3, '0')}.webp`;
const getFase3Src = (i: number) => `/frames/fase3/${String(i).padStart(2, '0')}.webp`;

// ─── Subcomponent: PhaseCanvasBlock (Edge-to-Edge 100dvh Cover Pinning) ───────
interface PhaseCanvasBlockProps {
  id: string;
  frameCount: number;
  getFrameSrc: (index: number) => string;
}

function PhaseCanvasBlock({
  id,
  frameCount,
  getFrameSrc,
}: PhaseCanvasBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const renderedFrameRef = useRef<number>(0);

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // 1. Proximity / Intersection Observer for progressive memory management
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      { rootMargin: '800px 0px 800px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Draw canvas frame with centered object-fit: cover
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    const img = imagesRef.current[frameIdx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(Math.round(rect.width * dpr), 100);
    const h = Math.max(Math.round(rect.height * dpr), 100);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    // Pure object-fit: cover centered calculation
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = Math.round(img.naturalWidth * scale);
    const dh = Math.round(img.naturalHeight * scale);
    const ox = Math.round((w - dw) / 2);
    const oy = Math.round((h - dh) / 2);

    ctx.drawImage(img, ox, oy, dw, dh);
  }, []);

  // 3. Progressive image loader: loads when near viewport, caches frames to prevent reload flashes
  useEffect(() => {
    if (!isNearViewport && !isPreloaded) {
      return;
    }
    if (imagesRef.current.length === frameCount && isPreloaded) {
      return;
    }

    let mounted = true;
    const imgs: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === 1 || i === 1 || i === Math.round(currentFrameRef.current)) {
          drawFrame(Math.round(currentFrameRef.current));
        }
        if (count === frameCount) {
          setIsPreloaded(true);
          drawFrame(Math.round(currentFrameRef.current));
        }
      };
      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
      };
      imgs.push(img);
    }

    imagesRef.current = imgs;

    return () => {
      mounted = false;
    };
  }, [isNearViewport, isPreloaded, frameCount, getFrameSrc, drawFrame]);

  // 4. Scroll progress tracking across h-[250vh] pinning track
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stickyEl = canvasRef.current?.parentElement;
        const stickyHeight = stickyEl ? stickyEl.clientHeight : window.innerHeight;
        const scrollable = rect.height - stickyHeight;
        if (scrollable <= 0) return;
        const currentScroll = -rect.top;
        const p = Math.max(0, Math.min(1, currentScroll / scrollable));
        const frame = Math.max(1, Math.min(frameCount, Math.round(1 + p * (frameCount - 1))));
        targetFrameRef.current = frame;

        if (p >= 1) {
          currentFrameRef.current = frameCount;
        } else if (p <= 0) {
          currentFrameRef.current = 1;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [frameCount]);

  // 5. 60 FPS lerp render loop (only runs when near viewport)
  useEffect(() => {
    if (!isNearViewport) return;

    let rafId: number;
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.25;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const f = Math.round(currentFrameRef.current);
      if (f !== renderedFrameRef.current) {
        renderedFrameRef.current = f;
        drawFrame(f);
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isNearViewport, drawFrame]);

  // Resize redraw
  useEffect(() => {
    const onResize = () => {
      const f = renderedFrameRef.current > 0 ? renderedFrameRef.current : Math.round(currentFrameRef.current || 1);
      drawFrame(f);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawFrame]);

  return (
    <div id={id} ref={containerRef} className="relative h-[250vh] w-full bg-[#000000]">
      {/* Sticky Pinning Container: 100dvh edge-to-edge pure cinematic screen */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#000000] select-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Minimal preloader bar if not preloaded yet */}
        {!isPreloaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
            <div className="flex flex-col items-center gap-2">
              <div className="w-36 h-1 rounded-full bg-[#212525] overflow-hidden">
                <div
                  className="h-full bg-[#7fee64] transition-all duration-200"
                  style={{ width: `${Math.round((loadedCount / frameCount) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] font-sans text-[#677d64] tracking-widest uppercase">
                Cargando {Math.round((loadedCount / frameCount) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Subcomponent: PhaseInfoBlock (Full-Screen Value Proposition) ─────────────
interface PillarItem {
  number: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
}

interface PhaseInfoBlockProps {
  id: string;
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  pillars: PillarItem[];
  nextPrompt: string;
}

function PhaseInfoBlock({
  id,
  badge,
  title,
  subtitle,
  pillars,
  nextPrompt,
}: PhaseInfoBlockProps) {
  const { openWizard } = useWizard();

  return (
    <section
      id={id}
      className="relative min-h-screen w-full bg-[#080808] flex items-center justify-center py-24 px-6 md:px-12 lg:px-20 border-t border-b border-[#212525]/80 overflow-hidden"
    >
      {/* Background radial highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[500px] pointer-events-none -z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(127, 238, 100, 0.05), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col justify-center">
        {/* Header Block */}
        <div className="mb-14 max-w-3xl">
          <ScrollReveal delay={100}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#485346]/70 bg-[#181818]/90 text-xs font-sans text-[#7fee64] font-medium uppercase tracking-wider mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#7fee64]" />
              <span>{badge}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#ddffdc] leading-[1.15] mb-5"
              style={{ letterSpacing: '-0.02em' }}
            >
              {title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-[#8cab87] text-base md:text-lg leading-relaxed">
              {subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((item, idx) => (
            <ScrollReveal key={idx} delay={200 + idx * 100}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-[#141616]/80 border border-[#485346]/60 hover:border-[#7fee64]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="text-xs font-mono font-bold text-[#7fee64] mb-3 tracking-widest">
                    {item.number}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-[#ddffdc] mb-3 leading-snug group-hover:text-[#7fee64] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#8cab87] text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#212525] flex items-center justify-between">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-[#677d64]">
                    {item.metricLabel}
                  </span>
                  <span className="text-base font-mono font-bold text-[#7fee64]">
                    {item.metricValue}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <ScrollReveal delay={500}>
          <div className="pt-6 border-t border-[#212525]/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={openWizard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7fee64] text-[#000000] rounded-full px-7 py-3 font-medium text-sm tracking-tight transition-all hover:shadow-[0_0_20px_rgba(127,238,100,0.3)] active:scale-95"
            >
              <span>Diseña tu muestra interactiva</span>
              <span className="text-base font-bold">→</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-sans text-[#677d64]">
              <span>{nextPrompt}</span>
              <span className="text-[#7fee64] animate-bounce">↓</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Main Component: Alternating Full-Screen Scrollytelling Architecture ─────
export default function ScrollytellingHero() {
  return (
    <div id="process" className="w-full flex flex-col bg-[#000000]">
      {/* ── BLOQUE 1: Canvas Animación Fase 1 (Código & Arquitectura) ── */}
      <PhaseCanvasBlock
        id="fase1-canvas"
        frameCount={FASE1_FRAMES}
        getFrameSrc={getFase1Src}
      />

      {/* ── BLOQUE 2: Pantalla Info Fase 1 (Propuesta de Valor Código) ── */}
      <PhaseInfoBlock
        id="fase1-info"
        badge="Fase 01 // Fundamentos de Ingeniería"
        title={
          <>
            Bases sólidas. Código limpio.{' '}
            <span className="text-[#7fee64]">Cero redundancia.</span>
          </>
        }
        subtitle="La mayoría de agencias usan constructores visuales lentos como WordPress o plantillas pesadas con decenas de plugins. En Clickshop codificamos a medida sobre Next.js 16 y TypeScript para garantizar tiempos de respuesta instantáneos y posicionamiento orgánico imbatible."
        pillars={[
          {
            number: '01.1',
            title: 'Next.js App Router & SSR',
            description: 'Renderizado híbrido ultraveloz desde servidores Edge. Tu contenido se indexa de inmediato en Google y carga antes del primer parpadeo.',
            metricLabel: 'Tiempo a Interactivo',
            metricValue: '<0.6s',
          },
          {
            number: '01.2',
            title: 'TypeScript Estricto 100%',
            description: 'Código fuertemente tipado que previene fallos inesperados en producción. Estructura modular lista para crecer sin acumular deuda técnica.',
            metricLabel: 'Fiabilidad Técnica',
            metricValue: '100%',
          },
          {
            number: '01.3',
            title: 'Lighthouse Score 100/100',
            description: 'Optimización milimétrica de Core Web Vitals (LCP, INP, CLS). Cumplimiento riguroso de los estándares que Google premia con mayor visibilidad.',
            metricLabel: 'Google Score',
            metricValue: '100/100',
          },
        ]}
        nextPrompt="Desliza para ver la Fase 2: Experiencia Visual UX/UI"
      />

      {/* ── BLOQUE 3: Canvas Animación Fase 2 (UX/UI & Navegación) ── */}
      <PhaseCanvasBlock
        id="fase2-canvas"
        frameCount={FASE2_FRAMES}
        getFrameSrc={getFase2Src}
      />

      {/* ── BLOQUE 4: Pantalla Info Fase 2 (Propuesta de Valor UX/UI) ── */}
      <PhaseInfoBlock
        id="fase2-info"
        badge="Fase 02 // Experiencia Visual & Retención"
        title={
          <>
            Diseño que cautiva en 3 segundos.{' '}
            <span className="text-[#7fee64]">Construido para convencer.</span>
          </>
        }
        subtitle="Un cliente decide si confiar en tu negocio en los primeros 3 segundos de visita. Diseñamos experiencias visuales sofisticadas con jerarquía calculada, micro-interacciones a 60 FPS y flujos claros que guían al usuario sin fricciones hacia el contacto."
        pillars={[
          {
            number: '02.1',
            title: 'Jerarquía Visual de Alta Retención',
            description: 'Flujos de lectura estudiados para captar y retener la atención, resaltando tu propuesta de valor antes de que el visitante abandone la pestaña.',
            metricLabel: 'Retención en Hero',
            metricValue: '+80%',
          },
          {
            number: '02.2',
            title: 'Diseño Mobile-First Adaptativo',
            description: 'Más del 70% de tus clientes llegarán desde su teléfono móvil. Adaptamos cada interacción táctil para que navegar sea tan ágil como una aplicación nativa.',
            metricLabel: 'Adaptación Mobile',
            metricValue: '100%',
          },
          {
            number: '02.3',
            title: 'Micro-interacciones a 60 FPS',
            description: 'Transiciones suaves y respuestas hápticas visuales que transmiten prestigio tecnológico y solidez corporativa sin distraer del objetivo.',
            metricLabel: 'Tasa de Refresco',
            metricValue: '60 FPS',
          },
        ]}
        nextPrompt="Desliza para ver la Fase 3: Conversión & Ventas"
      />

      {/* ── BLOQUE 5: Canvas Animación Fase 3 (Conversión & Ventas) ── */}
      <PhaseCanvasBlock
        id="fase3-canvas"
        frameCount={FASE3_FRAMES}
        getFrameSrc={getFase3Src}
      />

      {/* ── BLOQUE 6: Pantalla Info Fase 3 (Propuesta de Valor Conversión) ── */}
      <PhaseInfoBlock
        id="fase3-info"
        badge="Fase 03 // Conversión & Ventas 24/7"
        title={
          <>
            Tu plataforma digital.{' '}
            <span className="text-[#7fee64]">Tu mejor activo comercial 24/7.</span>
          </>
        }
        subtitle="Una página web sin ventas es solo un gasto estético. Integramos terminales interactivas paso a paso, cotizadores guiados y canales directos a WhatsApp para transformar cada visita anónima en una oportunidad de negocio calificada."
        pillars={[
          {
            number: '03.1',
            title: 'Captación Progresiva sin Fricción',
            description: 'Formularios interactivos en etapas que reducen la fatiga del usuario y triplican la tasa de respuesta frente a los formularios estáticos comunes.',
            metricLabel: 'Tasa de Contacto',
            metricValue: '3x Más Leads',
          },
          {
            number: '03.2',
            title: 'Cierre Inmediato por WhatsApp',
            description: 'Enrutamiento inteligente con mensajes precargados para entablar conversación en tiempo real cuando el interés del cliente está en su punto máximo.',
            metricLabel: 'Velocidad de Respuesta',
            metricValue: '<1 min',
          },
          {
            number: '03.3',
            title: 'Infraestructura Cloud 99.9% Uptime',
            description: 'Despliegue distribuido en redes globales Edge. Tu plataforma soporta campañas publicitarias de alto tráfico sin ralentizarse ni caerse jamás.',
            metricLabel: 'Disponibilidad Cloud',
            metricValue: '99.9%',
          },
        ]}
        nextPrompt="Explora nuestros pilares y herramientas a continuación"
      />
    </div>
  );
}
