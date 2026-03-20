'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const BLOGS = [
    {
        title: 'How Gen-AI is Transforming the VFX Industry',
        date: 'March 15, 2026',
        category: 'Industry Trends',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Top 5 Skills Every 3D Animator Needs in 2026',
        date: 'February 28, 2026',
        category: 'Career Advice',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Highlights from MAAC Creative League (MCL) 2026',
        date: 'February 10, 2026',
        category: 'MAAC Events',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop'
    }
];

export default function BlogSection() {
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
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a] bg-transparent">
            {/* Ambient Blog Glow */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.08) 0%, transparent 70%)'
            }} />
            
            <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#F5EFE0' }}>
                            LATEST FROM <span style={{ color: '#E8281C' }}>MAAC</span>
                        </h2>
                    </div>
                    <Link href="#" className="text-sm tracking-widest uppercase font-display flex items-center gap-2 hover:gap-4 transition-all duration-300" style={{ color: '#22C55E' }}>
                        VIEW ALL BLOGS →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BLOGS.map((blog, i) => (
                        <Link href="#" key={i} className="group block reveal-on-scroll opacity-0 translate-y-12 transition-all duration-700" style={{ transitionDelay: `${i * 100}ms` }}>
                            <div className="aspect-video rounded-lg overflow-hidden mb-6 relative">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${blog.image}')` }} />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute top-4 left-4 glass px-3 py-1 rounded text-xs tracking-widest uppercase font-bold" style={{ color: '#E8281C' }}>
                                    {blog.category}
                                </div>
                            </div>
                            <div className="text-xs tracking-widest mb-3" style={{ color: '#8A7F72' }}>{blog.date}</div>
                            <h3 className="font-display text-xl leading-tight group-hover:text-[#22C55E] transition-colors duration-300" style={{ color: '#F5EFE0' }}>
                                {blog.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
