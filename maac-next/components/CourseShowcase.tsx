'use client';

import { useEffect, useRef } from 'react';

import Link from 'next/link';

const COURSES = [
    {
        category: '3D ANIMATION',
        title: 'AD3D EDGE PLUS',
        desc: 'Explore the art and technology behind bringing characters and stories to life. Master Maya, 3ds Max, and Unreal Engine.',
        accent: '#E8281C',
        duration: 'Career Course',
        link: '/courses/3d-animation'
    },
    {
        category: 'VISUAL EFFECTS (VFX)',
        title: 'ADVFX PLUS',
        desc: 'From raw footage to stunning visuals, learn how VFX artists create environments, explosions, and seamless transitions.',
        accent: '#22C55E',
        duration: 'Career Course',
        link: '/courses/vfx'
    },
    {
        category: 'GAME DESIGN',
        title: 'ADIDG',
        desc: 'Design worlds players love to explore. From concept to gameplay, create characters, levels, and immersive worlds.',
        accent: '#8B5CF6',
        duration: 'Career Course',
        link: '/courses/gaming'
    },
    {
        category: 'BROADCAST / MEDIA',
        title: 'BROADCAST PLUS',
        desc: 'Learn visual storytelling for TV, OTT, and digital media. Studio-style learning for motion graphics and broadcast packages.',
        accent: '#E8281C',
        duration: 'Career Course',
        link: '/courses/broadcast'
    },
    {
        category: 'MULTIMEDIA & DESIGN',
        title: 'DGWA',
        desc: 'Design that communicates. Learn how graphic designers create logos, branding, and marketing designs.',
        accent: '#22C55E',
        duration: 'Career Course',
        link: '/courses/multimedia'
    },
    {
        category: 'FILMMAKING',
        title: 'DAFM',
        desc: 'Tell stories that move people. From script to screen, learn how filmmakers plan, shoot, and edit digital content.',
        accent: '#8B5CF6',
        duration: 'Career Course',
        link: '/courses/filmmaking'
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.map((course, i) => (
                        <Link href={course.link} key={i} className="block group">
                            <div
                                className="relative rounded-lg p-8 cursor-pointer overflow-hidden reveal-on-scroll opacity-0 translate-y-12 transition-all duration-300 ease-out h-full"
                                style={{
                                    background: '#141414',
                                    border: '1px solid #2a2a2a',
                                    transitionDelay: `${i * 80}ms`,
                                    transitionProperty: 'opacity, transform, background, border-color, box-shadow',
                                    transformStyle: 'preserve-3d',
                                }}
                                onMouseMove={(e) => {
                                    const card = e.currentTarget as HTMLElement;
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    
                                    const rotateX = ((y - centerY) / centerY) * -8;
                                    const rotateY = ((x - centerX) / centerX) * 8;
                                    
                                    card.style.transitionDelay = '0ms'; // Remove delay during interaction
                                    card.style.transitionDuration = '100ms';
                                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                                    card.style.background = '#1a1a1a';
                                    card.style.borderColor = course.accent + '66';
                                    card.style.boxShadow = `0 20px 40px -10px ${course.accent}33`;
                                }}
                                onMouseLeave={(e) => {
                                    const card = e.currentTarget as HTMLElement;
                                    card.style.transitionDuration = '500ms';
                                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                                    card.style.background = '#141414';
                                    card.style.borderColor = '#2a2a2a';
                                    card.style.boxShadow = 'none';
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
                                        className="font-display text-2xl mb-3 leading-tight"
                                        style={{ color: '#F5EFE0' }}
                                    >
                                        {course.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: '#8A7F72' }}>
                                        {course.desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
