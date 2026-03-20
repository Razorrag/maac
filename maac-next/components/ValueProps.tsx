'use client';

import FractalGlassGlows from './FractalGlassGlows';
import ScrollReveal from './ScrollReveal';

// Color map: only red, green, amber — NO purple
const COLOR = {
    red: { hex: '#E8281C', shadow: 'rgba(232, 40, 28, 0.15)', hover: 'hover:border-[#E8281C44] hover:shadow-[0_8px_32px_rgba(232,40,28,0.15)]' },
    green: { hex: '#22C55E', shadow: 'rgba(34, 197, 94, 0.15)', hover: 'hover:border-[#22C55E44] hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]' },
    amber: { hex: '#F5B932', shadow: 'rgba(245, 185, 50, 0.15)', hover: 'hover:border-[#F5B93244] hover:shadow-[0_8px_32px_rgba(245,185,50,0.15)]' },
};

const PROPS = [
    {
        title: 'INDUSTRY CURRICULUM',
        desc: 'Learn Animation, VFX, Gaming & Design with updated curriculum built by real industry experts.',
        stat: '100%',
        statLabel: 'Studio Aligned',
        color: 'red' as const,
        icon: '🎓',
    },
    {
        title: 'EXPERT FACULTY',
        desc: 'Learn from certified trainers and professionals with years of frontline industry experience.',
        stat: 'Top',
        statLabel: 'Industry Pros',
        color: 'green' as const,
        icon: '🏆',
    },
    {
        title: 'WORLD-CLASS INFRA',
        desc: 'State-of-the-art facilities, studio-like classrooms, high-end machines, tablets, and the latest software.',
        stat: '24/7',
        statLabel: 'Studio Setup',
        color: 'amber' as const,
        icon: '🖥️',
    },
    {
        title: 'PLACEMENT ASSISTANCE',
        desc: 'Dedicated placement cell — portfolio-building, mock interviews, and interview opportunities with top studios.',
        stat: '100%',
        statLabel: 'Assisted*',
        color: 'green' as const,
        icon: '🤝',
    },
    {
        title: 'GLOBAL NETWORK',
        desc: 'With 130+ centres across India & an expanding international presence in cities worldwide.',
        stat: '130+',
        statLabel: 'Centres globally',
        color: 'red' as const,
        icon: '🌐',
    },
    {
        title: 'GEN-AI POWERED',
        desc: 'Select MAAC courses are Gen-AI powered (T&C apply) — keeping you ahead of the creative tech curve.',
        stat: 'AI',
        statLabel: 'Integrated',
        color: 'amber' as const,
        icon: '🏅',
    }
];

export default function ValueProps() {
    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            <FractalGlassGlows />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <ScrollReveal type="slide" direction="up" delay={0}>
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="font-display text-5xl md:text-6xl" style={{ color: '#F5EFE0' }}>
                            WHY CHOOSE<br />
                            <span style={{ color: '#E8281C' }}>MAAC —</span><br />
                            <span style={{ color: '#22C55E' }}>7 REASONS</span>
                        </h2>
                        <p className="max-w-sm text-lg" style={{ color: '#C9BFA8' }}>
                            Build your career and portfolio with industry-aligned pedagogy backed by 25 years of creative excellence.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROPS.map((p, i) => {
                        const col = COLOR[p.color];
                        return (
                            <ScrollReveal key={i} type="scale" delay={i * 0.1}>
                                <div
                                    className={`group relative rounded-xl p-8 md:p-10 cursor-default overflow-hidden transition-all duration-300 glass h-full ${col.hover}`}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                    }}
                                    onMouseMove={(e) => {
                                        const card = e.currentTarget as HTMLElement;
                                        const rect = card.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
                                        const rotateY = ((x - rect.width / 2) / rect.width) * 10;
                                        card.style.transitionDuration = '80ms';
                                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        const card = e.currentTarget as HTMLElement;
                                        card.style.transitionDuration = '500ms';
                                        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
                                    }}
                                >
                                    {/* Big Number Background Watermark */}
                                    <div
                                        className="absolute top-4 right-6 font-display text-8xl pointer-events-none select-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                                        style={{ color: col.hex }}
                                    >
                                        0{i + 1}
                                    </div>

                                    {/* Icon + Accent line */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="text-3xl">{p.icon}</div>
                                        <div className="w-12 h-1 transition-all duration-500 group-hover:w-20" style={{ background: col.hex }} />
                                    </div>

                                    <h3 className="font-display text-2xl mb-4" style={{ color: '#F5EFE0' }}>
                                        {p.title}
                                    </h3>
                                    
                                    <p className="text-sm leading-relaxed mb-12 relative z-10" style={{ color: '#8A7F72' }}>
                                        {p.desc}
                                    </p>

                                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-[#2a2a2a] pt-4">
                                        <div className="font-display text-4xl" style={{ color: '#F5EFE0' }}>
                                            {p.stat}
                                        </div>
                                        <div className="text-xs uppercase tracking-widest text-right" style={{ color: col.hex }}>
                                            {p.statLabel}
                                        </div>
                                    </div>
                                    
                                    {/* Subtle noise over cards */}
                                    <div className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }} />
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
