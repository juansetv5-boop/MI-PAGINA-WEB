'use client';

import { useEffect, ReactNode } from 'react';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Only run Lenis on desktop without touch, respecting reduced motion
    if (
      typeof window === 'undefined' ||
      window.innerWidth < 768 ||
      ('ontouchstart' in window && navigator.maxTouchPoints > 0) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let lenisInstance: import('lenis').default | null = null;
    let rafId: number | null = null;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time: number) {
        if (lenisInstance) {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
