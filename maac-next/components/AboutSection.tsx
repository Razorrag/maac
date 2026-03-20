'use client';

import { useEffect, useRef } from 'react';

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        const items = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
        items?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16" ref={sectionRef}>

                {/* Left — Massive Typographic Statement */}
                <div className="flex-1 w-full reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
                    <div className="mb-2 text-xs font-bold tracking-widest uppercase" style={{ color: '#22C55E' }}>
                        EST. 1986 · INDIA&apos;S BEST
                    </div>
                    <h2 className="font-display mb-8 leading-[0.9]" style={{ color: '#F5EFE0' }}>
                        PIONEERING<br />
                        <span style={{ color: '#E8281C' }}>CREATIVE</span><br />
                        EDUCATION
                    </h2>

                    {/* Stats Row */}
                    <div className="flex gap-10 mt-10">
                        <div>
                            <div className="font-display text-5xl md:text-6xl" style={{ color: '#E8281C' }}>30K+</div>
                            <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#8A7F72' }}>Students Placed</div>
                        </div>
                        <div className="border-l border-[#2a2a2a] pl-10">
                            <div className="font-display text-5xl md:text-6xl" style={{ color: '#22C55E' }}>100+</div>
                            <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#8A7F72' }}>Studio Partners</div>
                        </div>
                    </div>
                </div>

                {/* Right — Content Block */}
                <div className="flex-1 w-full lg:pt-8 space-y-6 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
                    <p className="text-lg font-medium leading-relaxed" style={{ color: '#F5EFE0' }}>
                        Maya Academy of Advanced Creativity (MAAC) is India's premier training institute for Animation, VFX, Gaming, and Multimedia.
                    </p>
                    <p className="leading-relaxed" style={{ color: '#C9BFA8' }}>
                        We are dedicated to preparing students for successful careers in the global media and entertainment industry. Through our industry-vetted curriculum, state-of-the-art infrastructure, and dedicated Career Development Cell, we ensure you don&apos;t just learn tools — you master the art of storytelling and visual execution.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-3">
                        {[
                            'Industry Exposure Visits',
                            'International Certifications',
                            'Live Project Training',
                            'Career Dev Cell',
                            'Global Studio Partners',
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-3 py-1.5 rounded-sm tracking-wider uppercase"
                                style={{
                                    border: '1px solid #2a2a2a',
                                    color: '#8A7F72',
                                    background: '#141414',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
