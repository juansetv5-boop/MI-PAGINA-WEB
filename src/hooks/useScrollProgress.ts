import { useState, useEffect, RefObject } from 'react';

export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable <= 0) {
          setProgress(0);
          return;
        }

        // Calculate scroll position relative to the top of the sticky container
        const currentScroll = -rect.top;
        const clampedProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
        setProgress(clampedProgress);
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
  }, [ref]);

  return progress;
}
