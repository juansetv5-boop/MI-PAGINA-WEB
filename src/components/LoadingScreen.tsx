'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('clickshop_loader_seen') === 'true') {
        return;
      }
    } catch {
      // In case storage is blocked in private browsing
    }

    setIsVisible(true);

    // Fallback: Dismiss after 3s max if video ends or stalls
    timeoutRef.current = setTimeout(() => {
      triggerFadeOut();
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerFadeOut = () => {
    setIsFading(true);
    try {
      sessionStorage.setItem('clickshop_loader_seen', 'true');
    } catch {}

    // Unmount DOM node after 500ms fade transition to free hardware resources
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

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
        onEnded={triggerFadeOut}
        className="w-full h-full object-cover max-w-none"
      >
        <source src="/loading-screen.webm" type="video/webm" />
        <source src="/loading-screen-opt.mp4" type="video/mp4" />
        <source src="/loading-screen.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
