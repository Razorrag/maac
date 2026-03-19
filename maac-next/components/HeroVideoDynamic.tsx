'use client';

import dynamic from 'next/dynamic';

/**
 * HeroVideoDynamic - Dynamic import wrapper
 *
 * Benefits:
 * - Code-splits HeroVideo into separate chunk
 * - Reduces initial bundle size
 * - Shows loading placeholder while component loads
 * - SSR disabled (video is client-only)
 */

const HeroVideo = dynamic(() => import('./HeroVideo'), {
  ssr: false,
  loading: () => (
    <div
      className="hero-container bg-dneg-black"
      aria-hidden="true"
    />
  ),
});

export default HeroVideo;
