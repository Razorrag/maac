'use client';

import FractalGlassGlows from './FractalGlassGlows';
import ScrollReveal from './ScrollReveal';

const EVENTS = [
    {
        title: 'MAAC Creative League (MCL)',
        desc: 'A competitive ecosystem to nurture skills across 10 competition categories.',
        colSpan: 'md:col-span-2',
        color: 'red',
        bg: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: '100 Hours Creative Marathon',
        desc: 'Push your limits! Collaborate and create a 3D short film or mobile film in just 100 hours.',
        colSpan: 'md:col-span-1',
        color: 'contrast',
        bg: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'MAAC Manifest',
        desc: 'Honoring our students and alumni for outstanding contributions to the VFX industry.',
        colSpan: 'md:col-span-1',
        color: 'green',
        bg: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Workshops & Masterclasses',
        desc: 'Meet like-minded artists and learn directly from industry professionals globally.',
        colSpan: 'md:col-span-2',
        color: 'red',
        bg: 'https://images.unsplash.com/photo-1475721025505-1190f2b2c9ad?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Photo Walks & Travel',
        desc: 'Step outside the classroom and capture breathtaking moments in stunning locations.',
        colSpan: 'md:col-span-1',
        color: 'green',
        bg: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Industry Webinars',
        desc: 'Gain exclusive insights from industry legends and working alumni.',
        colSpan: 'md:col-span-2',
        color: 'contrast',
        bg: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1000&auto=format&fit=crop'
    }
];

export default function EventsSection() {
    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a] bg-transparent">
            <FractalGlassGlows />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal type="slide" direction="up" delay={0}>
                    <div className="mb-16 text-center">
                        <h2 className="font-display text-5xl md:text-6xl mb-4" style={{ color: '#F5EFE0' }}>
                            EVENTS AT <span style={{ color: '#E8281C' }}>MAAC</span>
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#C9BFA8' }}>
                            Creative Workshops, Webinars &amp; Animation Showcases
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {EVENTS.map((item, i) => (
                        <ScrollReveal key={i} type="scale" delay={i * 0.1}>
                            <div
                                className={`group relative rounded-xl overflow-hidden glass aspect-[4/3] md:aspect-auto ${item.colSpan} cursor-pointer h-full`}
                                style={{ minHeight: '300px' }}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-overlay"
                                    style={{ backgroundImage: `url('${item.bg}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                                
                                {/* Accent indicator corner */}
                                <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12 rotate-45 transition-transform duration-500 group-hover:translate-x-8 group-hover:-translate-y-8"
                                    style={{ 
                                        background: item.color === 'green' ? '#22C55E' : item.color === 'contrast' ? '#F5B932' : '#E8281C',
                                        filter: 'blur(20px)',
                                        opacity: 0.6
                                    }}
                                />

                                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="font-display text-2xl md:text-3xl uppercase mb-3" style={{ color: '#F5EFE0' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: '#8A7F72' }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
