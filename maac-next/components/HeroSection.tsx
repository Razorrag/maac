'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simple fade in on mount
        const timeoutId = setTimeout(() => {
            // ✅ FIX: Check ref existence inside the timeout callback
            // Use a local variable to prevent race conditions
            const element = textRef.current;
            if (element) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        }, 100);

        // ✅ FIX: Cleanup timeout on unmount to prevent memory leaks
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <section className="relative w-full h-screen flex flex-col overflow-hidden border-b border-[#2a2a2a] pt-32 pb-12">
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

                {/* Subtle cinematic glow over the video without blowing out colors - NO PURPLE */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8281C] blur-[150px] mix-blend-screen opacity-20 pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#22C55E] blur-[150px] mix-blend-screen opacity-15 pointer-events-none" />
                {/* Additional white/cream glow for warmth */}
                <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#F5EFE0] blur-[120px] mix-blend-soft-light opacity-8 pointer-events-none" />
            </div>

            <div
                ref={textRef}
                className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-8 will-change-transform px-4 md:px-12 opacity-0 translate-y-8 transition-all duration-1000 ease-smooth mt-auto"
            >
                {/* Left: Massive Hero Typography */}
                <div className="flex flex-col items-start text-left w-full lg:w-[55%]">
                    <div className="glass-contrast px-4 py-2 rounded-full mb-8 inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-contrast-light animate-pulse" />
                        <span className="text-xs font-bold tracking-widest text-contrast-light uppercase">
                            Skill India • NSDC • MESC Training Partner
                        </span>
                    </div>

                    <h1 className="font-display mb-6 leading-[0.9] text-[clamp(3.5rem,8vw,6.5rem)]">
                        <span className="block text-foreground drop-shadow-lg">
                            POWERED BY
                        </span>
                        <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light drop-shadow-xl"
                            style={{ WebkitTextStroke: '1px rgba(232, 40, 28, 0.5)' }}>
                            PARTNERSHIPS
                        </span>
                    </h1>
                    
                    <h2 className="text-xl md:text-2xl font-body font-light mb-8 text-cream-muted max-w-xl">
                        Driven by <span className="font-semibold text-cream">You</span>. The New Age of Creative Excellence begins here.
                    </h2>

                    <div className="flex gap-6 mt-4">
                        <button className="btn-primary px-8 py-4 rounded-md text-lg shadow-[0_0_20px_rgba(232,40,28,0.4)] hover:shadow-[0_0_30px_rgba(232,40,28,0.6)]">
                            EXPLORE NOW
                        </button>
                    </div>
                </div>

                {/* Right: Stats Float */}
                <div
                    className="glass w-full lg:w-80 rounded-xl p-8 flex flex-col gap-6 text-left"
                >
                    {[
                        { label: 'Legacy of Excellence', val: '30+ Years' },
                        { label: 'Industry Pathways', val: 'CareerX' },
                        { label: 'Placement Support', val: 'Dedicated' },
                    ].map((stat, i) => (
                        <div key={stat.label} className={`flex flex-col items-start justify-center pb-5 ${i !== 2 ? 'border-b border-border' : 'pb-0'}`}>
                            <span className="font-display text-4xl text-green mb-1 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">{stat.val}</span>
                            <span className="text-xs text-muted uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
