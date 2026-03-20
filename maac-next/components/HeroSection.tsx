'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simple fade in on mount
        if (textRef.current) {
            setTimeout(() => {
                textRef.current!.style.opacity = '1';
                textRef.current!.style.transform = 'translateY(0)';
            }, 100);
        }
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden border-b border-[#2a2a2a] pt-32 pb-24">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/intro.mp4" type="video/mp4" />
                </video>

                {/* Softer overlay just for text readability - mostly at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                {/* Subtle cinematic glow over the video without blowing out colors */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8281C] blur-[150px] mix-blend-screen opacity-20 pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#22C55E] blur-[150px] mix-blend-screen opacity-10 pointer-events-none" />
            </div>

            {/* Main Content */}
            <div
                ref={textRef}
                className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 will-change-transform px-4 md:px-0 opacity-0 translate-y-8 transition-all duration-1000 ease-smooth"
            >
                {/* Massive Hero Typography */}
                <div className="flex-1 w-full">
                    <div className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#22C55E' }}>
                        INDIA&apos;S #1 ANIMATION INSTITUTE
                    </div>
                    <h1 className="font-display mb-4 leading-[0.9]">
                        <span
                            className="block transition-transform duration-700"
                            style={{
                                WebkitTextStroke: '2px #F5EFE0',
                                color: 'transparent',
                            }}
                        >
                            CREATIVE
                        </span>
                        <span className="block" style={{ color: '#E8281C' }}>
                            XCELLENCE
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-md mt-6" style={{ color: '#C9BFA8' }}>
                        Master Animation, VFX, Gaming &amp; Multimedia at India&apos;s premier creative institute.
                    </p>

                    <div className="flex gap-4 mt-8 flex-wrap">
                        <button className="btn-primary">
                            ENROL NOW
                        </button>
                        <button className="btn-outline-green">
                            EXPLORE COURSES
                        </button>
                    </div>
                </div>

                {/* Info Widget */}
                <div
                    className="w-full md:w-64 rounded-lg p-6 flex-shrink-0 mb-8 md:mb-0"
                    style={{
                        background: 'rgba(20,20,20,0.85)',
                        border: '1px solid #2a2a2a',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#22C55E' }}>
                        QUICK STATS
                    </div>
                    {[
                        { label: 'Years of Excellence', val: '38+' },
                        { label: 'Centres Nationwide', val: '200+' },
                        { label: 'Alumni Placed', val: '30K+' },
                    ].map((stat) => (
                        <div key={stat.label} className="flex justify-between items-center py-3 border-b"
                            style={{ borderColor: '#2a2a2a' }}>
                            <span className="text-xs" style={{ color: '#8A7F72' }}>{stat.label}</span>
                            <span className="font-display text-xl" style={{ color: '#E8281C' }}>{stat.val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
