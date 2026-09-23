'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fallback de seguridad: 3.2 segundos máximo por si el navegador retrasa el evento onEnded
    timerRef.current = setTimeout(() => {
      handleExit();
    }, 3200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleExit = () => {
    setIsFading(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Desmontar el nodo del DOM tras completar la transición de 500ms
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#000000] flex items-center justify-center pointer-events-none transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={handleExit}
        className="w-full h-full object-cover max-w-none"
      >
        <source src="/loading-screen-opt.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
