'use client';

import { useEffect, useRef } from 'react';

export default function MediaGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const items = containerRef.current?.querySelectorAll('.reveal-on-scroll');
        items?.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="media-gallery" className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            <div className="max-w-7xl mx-auto" ref={containerRef}>

                <div className="mb-16 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
                    <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E8281C' }}>
                        STUDIO SHOWCASE
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#F5EFE0' }}>
                        BEHIND THE <span style={{ color: '#22C55E' }}>SCENES</span>
                    </h2>
                    <p className="mt-4 max-w-2xl" style={{ color: '#C9BFA8' }}>
                        Explore campus life, student showreels, and exclusive masterclasses.
                        (Drop your videos and images in the placeholders below).
                    </p>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                    {/* Featured Large Video Slot */}
                    <div className="md:col-span-8 aspect-video rounded-xl overflow-hidden card-dark relative group reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 delay-100">
                        {/* USER: Replace this div with your <video> or <img> tag */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#2a2a2a] m-4 rounded-lg bg-[#111]">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(232, 40, 28, 0.1)', color: '#E8281C' }}>
                                ▶
                            </div>
                            <h3 className="font-display text-2xl" style={{ color: '#F5EFE0' }}>FEATURED VIDEO SLOT</h3>
                            <p className="text-sm mt-2" style={{ color: '#8A7F72' }}>Recommended for Main Showreel (Aspect: 16:9)</p>
                        </div>
                    </div>

                    {/* Secondary Vertical Slot */}
                    <div className="md:col-span-4 aspect-[4/5] md:aspect-auto rounded-xl overflow-hidden card-dark relative reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700 delay-200">
                        {/* USER: Replace this div with your <video> or <img> tag */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#2a2a2a] m-4 rounded-lg bg-[#111]">
                            <h3 className="font-display text-xl" style={{ color: '#F5EFE0' }}>IMAGE/REEL SLOT</h3>
                            <p className="text-sm mt-2" style={{ color: '#8A7F72' }}>Recommended for Portrait Content</p>
                        </div>
                    </div>

                    {/* Triple Image Row */}
                    {[1, 2, 3].map((item, i) => (
                        <div key={item} className="md:col-span-4 aspect-video rounded-xl overflow-hidden card-dark relative reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700" style={{ transitionDelay: `${(i + 3) * 100}ms` }}>
                            {/* USER: Replace this div with your <img> tag */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-[#2a2a2a] m-2 rounded-lg bg-[#111]">
                                <h3 className="font-display tracking-wider" style={{ color: '#F5EFE0' }}>IMAGE SLOT {item}</h3>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
