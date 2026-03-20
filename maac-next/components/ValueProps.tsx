'use client';

import { useEffect, useRef } from 'react';

const PROPS = [
    {
        title: 'STUDIO READY',
        desc: 'Train on exactly the same software and pipelines used by leading VFX and Gaming studios globally.',
        stat: '100+',
        statLabel: 'Software Tools',
        color: 'red' as const,
    },
    {
        title: 'EXPERT MENTORS',
        desc: 'Learn directly from industry veterans who have worked on Hollywood blockbusters and AAA games.',
        stat: '24/7',
        statLabel: 'Support Access',
        color: 'green' as const,
    },
    {
        title: 'PLACEMENTS',
        desc: "Dedicated Career Development Cell connecting you with India's top media and entertainment recruiters.",
        stat: '30K+',
        statLabel: 'Students Placed',
        color: 'red' as const,
    }
];

export default function ValueProps() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('revealed');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const items = containerRef.current?.querySelectorAll('.reveal-on-scroll');
        items?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 relative border-t border-[#2a2a2a]">
            <div className="max-w-7xl mx-auto px-4 md:px-12" ref={containerRef}>

                {/* Section Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
                    <h2 className="font-display text-5xl md:text-6xl" style={{ color: '#F5EFE0' }}>
                        WHY <span style={{ color: '#E8281C' }}>MAAC</span><br />
                        <span style={{ color: '#22C55E' }}>STANDS OUT</span>
                    </h2>
                    <p className="max-w-sm" style={{ color: '#C9BFA8' }}>
                        India&apos;s most trusted institute for creative professionals since 1986.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PROPS.map((p, i) => (
                        <div
                            key={i}
                            className={`group relative rounded-lg p-8 md:p-10 cursor-default overflow-hidden transition-all duration-500 hover:-translate-y-2 card-dark reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 ${p.color === 'green' ? 'card-dark-green' : ''}`}
                            style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                        >
                            {/* Big Number Background Watermark */}
                            <div
                                className="absolute top-4 right-6 font-display text-8xl pointer-events-none select-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                                style={{ color: p.color === 'green' ? '#22C55E' : '#E8281C' }}
                            >
                                0{i + 1}
                            </div>

                            {/* Accent line top */}
                            <div
                                className="w-12 h-1 mb-8 transition-all duration-500 group-hover:w-20"
                                style={{ background: p.color === 'green' ? '#22C55E' : '#E8281C' }}
                            />

                            <h3 className="font-display text-2xl mb-4 tracking-wide" style={{ color: '#F5EFE0' }}>
                                {p.title}
                            </h3>
                            <p className="text-sm leading-relaxed mb-10" style={{ color: '#8A7F72' }}>
                                {p.desc}
                            </p>

                            {/* Stat reveal */}
                            <div className="flex items-baseline gap-3">
                                <span
                                    className="font-display text-5xl"
                                    style={{ color: p.color === 'green' ? '#22C55E' : '#E8281C' }}
                                >
                                    {p.stat}
                                </span>
                                <span className="text-xs uppercase tracking-widest" style={{ color: '#8A7F72' }}>
                                    {p.statLabel}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
