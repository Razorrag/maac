'use client';

import { useEffect, useRef } from 'react';

const CREATIVE_WORKS = [
    { title: 'Character & Environment', category: '3D Animation Projects', image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Compositing & Dynamics', category: 'VFX Work Gallery', image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Next-Gen Worlds', category: 'Game Design Showcase', image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Digital Artistry', category: 'Digital Art / Multimedia', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
    { title: 'Motion Packages', category: 'Broadcast Design', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop' },
];

export default function CreativeShowcase() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Elegant horizontal scroll sync with vertical scroll on desktop
        const handleScroll = () => {
            if (!scrollRef.current) return;
            const rect = scrollRef.current.parentElement!.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how far through the section we've scrolled
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const progress = 1 - (rect.bottom / (viewportHeight + rect.height));
                // Move horizontal track
                const moveX = progress * -20; // Move up to 20% to the left
                scrollRef.current.style.transform = `translateX(${moveX}%)`;
            }
        };

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (!isMobile) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-32 bg-transparent relative overflow-hidden border-t border-border">
            <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 relative z-10">
                <h2 className="font-display text-5xl md:text-7xl mb-4" style={{ color: '#F5EFE0' }}>STUDENT <span style={{ color: '#22C55E' }}>GALLERY</span></h2>
                <p className="text-muted text-lg max-w-2xl text-[#C9BFA8]">At MAAC, creativity knows no bounds. Our students push the limits of animation, VFX, game design, and digital artistry. Explore their masterpieces and witness their journey from learners to industry professionals.</p>
            </div>

            {/* Horizontal Scrolling Gallery */}
            <div className="w-full overflow-x-auto no-scrollbar pb-12 pl-4 md:pl-12 touch-pan-x">
                <div
                    ref={scrollRef}
                    className="flex gap-6 w-max will-change-transform ease-smooth transition-transform duration-75"
                >
                    {CREATIVE_WORKS.map((work, idx) => (
                        <div
                            key={idx}
                            className="group relative w-[80vw] md:w-[40vw] lg:w-[30vw] aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
                        >
                            {/* Image with dramatic zoom effect */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url('${work.image}')` }}
                            />

                            {/* Cinematic Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content Reveal */}
                            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {work.category}
                                </span>
                                <h3 className="font-display text-3xl text-foreground uppercase">
                                    {work.title}
                                </h3>
                            </div>

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-xl transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
