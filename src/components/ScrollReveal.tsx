'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'right' | 'left' | 'up' | 'down' | 'none';
  distance?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'right',
  distance = 60,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';
    if (direction === 'right') return `translateX(${distance}px)`;
    if (direction === 'left') return `translateX(-${distance}px)`;
    if (direction === 'up') return `translateY(${distance}px)`;
    if (direction === 'down') return `translateY(-${distance}px)`;
    return 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
