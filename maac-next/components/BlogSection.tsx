'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const BLOGS = [
    {
        title: 'The Rise of Unreal Engine in Filmmaking',
        date: 'March 15, 2026',
        category: 'Industry Trends',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: '5 Essential Habits of a Successful VFX Artist',
        date: 'February 28, 2026',
        category: 'Career Advice',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Understanding the Global AVGC-XR Policy',
        date: 'February 10, 2026',
        category: 'News & Updates',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop'
    }
];

export default function BlogSection() {
    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a] bg-transparent">
            {/* Ambient Blog Glow */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.08) 0%, transparent 70%)'
            }} />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal type="slide" direction="up" delay={0}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#F5EFE0' }}>
                                LATEST FROM <span style={{ color: '#E8281C' }}>MAAC</span>
                            </h2>
                        </div>
                        <Link href="#" className="text-sm tracking-widest uppercase font-display flex items-center gap-2 hover:gap-4 transition-all duration-300" style={{ color: '#22C55E' }}>
                            VIEW ALL BLOGS →
                        </Link>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BLOGS.map((blog, i) => (
                        <ScrollReveal key={i} type="slide" direction="up" delay={i * 0.15}>
                            <Link href="#" className="group block">
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
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
