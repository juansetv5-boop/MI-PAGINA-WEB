'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'right' | 'left' | 'up' | 'down' | 'fade' | 'none';
  distance?: number;
  duration?: number;
  variant?: 'text' | 'card' | 'custom';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction,
  distance,
  duration,
  variant,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Variant presets: text blocks fade up by 16px with 500ms, cards slide 40px with 700ms
  const isTextVariant = variant === 'text';
  const effectiveDirection = direction ?? (isTextVariant ? 'up' : 'up');
  const effectiveDistance = distance ?? (isTextVariant ? 16 : 40);
  const effectiveDuration = duration ?? (isTextVariant ? 500 : 700);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Accessibility check: respects reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsAnimating(true);
          observer.unobserve(element);

          // Clean up will-change after transition completes to save GPU memory
          const totalTime = delay + effectiveDuration + 100;
          const timer = setTimeout(() => {
            setIsAnimating(false);
          }, totalTime);

          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, effectiveDuration]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    if (effectiveDirection === 'right') return `translate3d(${effectiveDistance}px, 0, 0)`;
    if (effectiveDirection === 'left') return `translate3d(-${effectiveDistance}px, 0, 0)`;
    if (effectiveDirection === 'up') return `translate3d(0, ${effectiveDistance}px, 0)`;
    if (effectiveDirection === 'down') return `translate3d(0, -${effectiveDistance}px, 0)`;
    return 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${effectiveDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${effectiveDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isAnimating ? 'opacity, transform' : 'auto',
      }}
    >
      {children}
    </div>
  );
}
