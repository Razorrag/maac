'use client';

import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate percentage position
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#050505]">
            
            {/* Ambient Mouse-Tracking Glow Layer */}
            <div 
                className="absolute inset-0 opacity-40 mix-blend-screen transition-all duration-[2000ms] ease-out will-change-transform"
                style={{
                    background: `
                        radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(232, 40, 28, 0.15) 0%, transparent 40%),
                        radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(245, 239, 224, 0.05) 0%, transparent 60%)
                    `
                }}
            />

            {/* Glowing Brand Orbs (Floating) */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#E8281C]/10 blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#22C55E]/10 blur-[150px] mix-blend-screen opacity-40 animate-pulse-slow" style={{ animationDelay: '3s' }} />
            
            {/* Animated perspective grid that slowly moves down to give depth */}
            <div
                className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_10%,transparent_80%)] animate-pan-grid transform perspective-1000 rotate-x-60"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem',
                    transformOrigin: 'top center'
                }}
            />
            
            {/* Cinematic Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        </div>
    );
}
