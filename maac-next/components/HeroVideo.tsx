'use client';

import { useEffect, useState } from 'react';

/**
 * HeroVideo Component
 */

interface HeroVideoProps {
  sources: {
    webm?: string;
    mp4: string;
  };
  children?: React.ReactNode;
  className?: string;
}

export default function HeroVideo({
  sources,
  children,
  className = '',
}: HeroVideoProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Show content after 2 seconds
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Video Element - Full Screen Cover */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        className="fixed inset-0 min-w-full min-h-full w-full h-full object-cover"
      >
        {sources.webm && (
          <source src={sources.webm} type="video/webm" />
        )}
        <source src={sources.mp4} type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay - for text readability */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Content overlay with fade-in animation */}
      {children && (
        <div 
          className={`fixed inset-0 z-10 transition-opacity duration-1000 ease-out flex items-center justify-center ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
