'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const COURSES = [
    {
        category: 'CAREER COURSE',
        title: '3D Animation',
        desc: 'Explore the art and technology behind bringing characters and stories to life through animation. Start from basics and learn advanced software like Maya, 3ds Max, and Unreal Engine.',
        accent: '#E8281C',
        duration: 'Multiple Programs',
        link: '/courses/3d-animation'
    },
    {
        category: 'CAREER COURSE',
        title: 'Visual Effects',
        desc: 'From raw footage to stunning visuals, learn how VFX artists create environments, explosions, creatures, and seamless transitions for games, films, and OTT platforms.',
        accent: '#22C55E',
        duration: 'Multiple Programs',
        link: '/courses/vfx'
    },
    {
        category: 'CAREER COURSE',
        title: 'Game Design',
        desc: 'Design worlds players love to explore. From concept to gameplay, learn how game designers create characters, levels, mechanics, and immersive worlds for all platforms.',
        accent: '#8B5CF6',
        duration: 'Multiple Programs',
        link: '/courses/gaming'
    },
    {
        category: 'CAREER COURSE',
        title: 'Broadcast & Media',
        desc: 'Learn visual storytelling for TV, OTT, and digital media. Studio-style learning for motion graphics, broadcast packages, and digital creatives.',
        accent: '#E8281C',
        duration: 'Multiple Programs',
        link: '/courses/broadcast'
    },
    {
        category: 'CAREER COURSE',
        title: 'Multimedia & Digital Design',
        desc: 'Design that communicates. From ideas to impactful visuals, learn how graphic designers create logos, branding, social media creatives, and marketing designs.',
        accent: '#22C55E',
        duration: 'Multiple Programs',
        link: '/courses/multimedia'
    },
    {
        category: 'CAREER COURSE',
        title: 'Filmmaking',
        desc: 'Tell stories that move people, spark emotion, and stay with them. From script to screen, learn how filmmakers plan, shoot, and edit films and digital content.',
        accent: '#8B5CF6',
        duration: 'Multiple Programs',
        link: '/courses/filmmaking'
    },
];

export default function CourseShowcase() {
    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal type="slide" direction="up" delay={0}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.map((course, i) => (
                        <ScrollReveal key={i} type="3d" delay={i * 0.1}>
                            <Link href={course.link} className="block group h-full">
                                <div
                                    className="relative rounded-lg p-8 cursor-pointer h-full"
                                    style={{
                                        background: '#141414',
                                        border: '1px solid #2a2a2a',
                                        transitionProperty: 'background, border-color, box-shadow, transform',
                                        transitionDuration: '500ms',
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

                                    <div className="flex justify-between items-start mb-6 pl-4" style={{ transform: 'translateZ(20px)' }}>
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

                                    <div className="pl-4" style={{ transform: 'translateZ(30px)' }}>
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
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
