'use client';

const PARTNERS = [
    'DNEG', 'Framestore', 'Prime Focus', 'Reliance Entertainment',
    'Yash Raj Films', 'Tata Elxi', 'EA Games', 'Animagic',
    'DQ Entertainment', 'UTV Motion', 'Pixion', 'The Mill',
];

export default function PlacementMarquee() {
    return (
        <section className="py-20 relative overflow-hidden border-y border-[#2a2a2a]">
            <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#22C55E' }}>
                    WHERE OUR ALUMNI MAKE MAGIC
                </div>
                <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#F5EFE0' }}>
                    INDUSTRY <span style={{ color: '#E8281C' }}>PARTNERS</span>
                </h2>
            </div>

            {/* Fading Edges */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
                />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
                />

                <div className="group overflow-hidden flex whitespace-nowrap">
                    <div className="animate-marquee whitespace-nowrap flex items-center group-hover:[animation-play-state:paused] will-change-transform">
                        {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                            <div key={`${partner}-${index}`} className="mx-10 flex items-center gap-3">
                                <span className="font-display text-2xl md:text-3xl transition-colors duration-300 hover:text-[#22C55E]"
                                    style={{ color: '#3a3520', letterSpacing: '0.05em' }}>
                                    {partner}
                                </span>
                                <span style={{ color: '#E8281C', opacity: 0.5 }}>×</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
