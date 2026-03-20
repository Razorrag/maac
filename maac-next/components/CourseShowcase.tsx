'use client';

import { useEffect, useRef } from 'react';

const COURSES = [
    {
        category: 'VFX',
        title: 'ADVFX PLUS',
        desc: 'Advanced Program in Visual Effects. Master the tools used in Hollywood blockbusters.',
        accent: '#E8281C',
        duration: '18 Months',
    },
    {
        category: '3D ANIMATION',
        title: 'AD3D EDGE',
        desc: 'Advanced Program in 3D Animation. Bring characters and cinematic worlds to life.',
        accent: '#22C55E',
        duration: '18 Months',
    },
    {
        category: 'GAMING',
        title: 'ADIDG PLUS',
        desc: 'Advanced Program in Interactive Design & Games. Craft the next big hit.',
        accent: '#E8281C',
        duration: '24 Months',
    },
    {
        category: 'DESIGN & WEB',
        title: 'DGWA',
        desc: 'Graphic Design, Web Design & 2D Animation. Master the art of digital communication.',
        accent: '#22C55E',
        duration: '12 Months',
    },
    {
        category: 'BROADCAST',
        title: 'PROGRAM IN BROADCAST DESIGN',
        desc: 'Create captivating motion graphics, promos, and title sequences for television and digital media.',
        accent: '#E8281C',
        duration: '15 Months',
    },
    {
        category: 'NEW MEDIA',
        title: 'AR/VR PRODUCTION',
        desc: 'Step into the future. Learn to build immersive Augmented and Virtual Reality experiences.',
        accent: '#22C55E',
        duration: '9 Months',
    },
];

export default function CourseShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const items = containerRef.current?.querySelectorAll('.reveal-on-scroll');
        items?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            <div className="max-w-7xl mx-auto" ref={containerRef}>

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
                    <div>
                        <h2 className="font-display text-5xl md:text-7xl mb-4" style={{ color: '#F5EFE0' }}>
                            MASTER YOUR<br />
                            <span style={{ color: '#22C55E' }}>CRAFT</span>
                        </h2>
                        <p style={{ color: '#C9BFA8' }}>
                            Industry-vetted programs designed to launch your career in<br />
                            the media &amp; entertainment sector.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="text-sm tracking-widest uppercase font-display flex items-center gap-2 hover:gap-4 transition-all duration-300"
                        style={{ color: '#E8281C' }}
                    >
                        VIEW ALL COURSES →
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {COURSES.map((course, i) => (
                        <div
                            key={i}
                            className="group relative rounded-lg p-8 cursor-pointer overflow-hidden reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700"
                            style={{
                                background: '#141414',
                                border: '1px solid #2a2a2a',
                                transitionDelay: `${i * 80}ms`,
                                transitionProperty: 'opacity, transform, background, border-color',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = '#1a1a1a';
                                (e.currentTarget as HTMLElement).style.borderColor = course.accent + '55';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = '#141414';
                                (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2a';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Left accent bar */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 group-hover:w-[3px]"
                                style={{ background: course.accent }}
                            />

                            <div className="flex justify-between items-start mb-6 pl-4">
                                <span
                                    className="text-xs font-bold tracking-widest uppercase"
                                    style={{ color: course.accent }}
                                >
                                    {course.category}
                                </span>
                                <span
                                    className="text-xs tracking-widest"
                                    style={{ color: '#8A7F72' }}
                                >
                                    {course.duration}
                                </span>
                            </div>

                            <div className="pl-4">
                                <h3
                                    className="font-display text-3xl mb-3"
                                    style={{ color: '#F5EFE0' }}
                                >
                                    {course.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: '#8A7F72' }}>
                                    {course.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
