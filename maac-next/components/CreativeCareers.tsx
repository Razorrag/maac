'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import FractalGlassGlows from './FractalGlassGlows';
import { Play, Users, Briefcase, FolderOpen, Monitor, Layers } from 'lucide-react';

// Benefit cards data from reference image
const BENEFITS = [
    {
        title: 'Learn from Industry Game Changers',
        description: 'Master skills from professionals who\'ve worked on blockbuster films and AAA games',
        icon: Users,
        color: 'red',
        gradient: 'from-[#E8281C]/20 to-transparent',
        border: 'group-hover:border-[#E8281C]/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(232,40,28,0.2)]',
    },
    {
        title: 'Exclusive Industry Exposure',
        description: 'Get firsthand experience with live projects and studio workflows',
        icon: Monitor,
        color: 'green',
        gradient: 'from-[#22C55E]/20 to-transparent',
        border: 'group-hover:border-[#22C55E]/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]',
    },
    {
        title: 'Placement Support',
        description: 'Dedicated career guidance, portfolio reviews, and interview opportunities',
        icon: Briefcase,
        color: 'amber',
        gradient: 'from-[#F5B932]/20 to-transparent',
        border: 'group-hover:border-[#F5B932]/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(245,185,50,0.2)]',
    },
    {
        title: 'Portfolio that Speaks Volumes',
        description: 'Build a professional-grade portfolio that stands out to employers',
        icon: FolderOpen,
        color: 'red',
        gradient: 'from-[#E8281C]/20 to-transparent',
        border: 'group-hover:border-[#E8281C]/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(232,40,28,0.2)]',
    },
    {
        title: 'Industry-Grade Facilities',
        description: 'Access state-of-the-art labs, studios, and cutting-edge technology',
        icon: Layers,
        color: 'green',
        gradient: 'from-[#22C55E]/20 to-transparent',
        border: 'group-hover:border-[#22C55E]/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]',
    },
    {
        title: 'Courses Built for Future',
        description: 'Curriculum designed with emerging tech and industry trends in mind',
        icon: Play,
        color: 'amber',
        gradient: 'from-[#F5B932]/20 to-transparent',
        border: 'group-hover:border-[#F5B932]/50',
        glow: 'group-hover:shadow-[0_0_40px_rgba(245,185,50,0.2)]',
    },
];

// Phone variant - optimized for mobile with bottom sheet interactions
function CreativeCareersPhone() {
    return (
        <section className="relative w-full py-16 px-4 border-t border-[#2a2a2a] overflow-hidden">
            <FractalGlassGlows />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <ScrollReveal type="slide" direction="up" delay={0}>
                    <div className="text-center mb-12">
                        <h2 
                            className="font-display text-4xl md:text-5xl mb-3 leading-[0.95]"
                            style={{ color: '#F5EFE0' }}
                        >
                            Creative Careers<br />
                            <span style={{ color: '#E8281C' }}>That Click</span>
                        </h2>
                        <p 
                            className="text-lg md:text-xl mt-4 max-w-2xl mx-auto"
                            style={{ color: '#C9BFA8' }}
                        >
                            Empower Your Future with Skills That Matter
                        </p>
                    </div>
                </ScrollReveal>

                {/* Featured Card - Workshops & Masterclasses */}
                <ScrollReveal type="scale" delay={0.1}>
                    <div className="glass-contrast rounded-xl p-6 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#E8281C] blur-[80px] opacity-30 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#22C55E] blur-[60px] opacity-20 pointer-events-none" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-[#E8281C]/20 flex items-center justify-center border border-[#E8281C]/30">
                                    <Play className="w-5 h-5 text-[#E8281C]" />
                                </div>
                                <span className="text-xs font-bold tracking-widest text-[#E8281C] uppercase">
                                    Featured
                                </span>
                            </div>
                            
                            <h3 
                                className="font-display text-2xl mb-3"
                                style={{ color: '#F5EFE0' }}
                            >
                                Workshops & Masterclasses
                            </h3>
                            <p 
                                className="text-sm mb-6"
                                style={{ color: '#C9BFA8' }}
                            >
                                Learn directly from industry veterans through intensive hands-on sessions. Get real-world insights, build professional networks, and accelerate your creative journey.
                            </p>
                            
                            <button className="btn-primary w-full py-3 text-sm">
                                EXPLORE WORKSHOPS
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Benefits Grid - Stacked on mobile */}
                <div className="space-y-3">
                    {BENEFITS.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <ScrollReveal key={index} type="slide" direction="up" delay={0.1 + index * 0.05}>
                                <div
                                    className={`group relative rounded-lg p-5 cursor-default overflow-hidden transition-all duration-300 glass ${benefit.border} ${benefit.glow}`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                                            benefit.color === 'red' ? 'bg-[#E8281C]/20 text-[#E8281C]' :
                                            benefit.color === 'green' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                                            'bg-[#F5B932]/20 text-[#F5B932]'
                                        }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h4 
                                                className="font-display text-base mb-1"
                                                style={{ color: '#F5EFE0' }}
                                            >
                                                {benefit.title}
                                            </h4>
                                            <p 
                                                className="text-xs"
                                                style={{ color: '#8A7F72' }}
                                            >
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Laptop variant - rich interactions with hover states and multi-column layout
function CreativeCareersLaptop() {
    return (
        <section className="relative w-full py-24 px-4 md:px-12 border-t border-[#2a2a2a] overflow-hidden">
            <FractalGlassGlows />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <ScrollReveal type="slide" direction="up" delay={0}>
                    <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="glass-contrast px-4 py-2 rounded-full mb-6 inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#E8281C] animate-pulse" />
                                <span className="text-xs font-bold tracking-widest text-[#E8281C] uppercase">
                                    Think MAAC
                                </span>
                            </div>
                            
                            <h2 
                                className="font-display text-5xl xl:text-6xl mb-4 leading-[0.92]"
                                style={{ color: '#F5EFE0' }}
                            >
                                Creative Careers<br />
                                <span style={{ color: '#E8281C' }}>That Click</span> —{' '}
                                <span style={{ color: '#22C55E' }}>Think MAAC</span>
                            </h2>
                            
                            <p 
                                className="text-xl max-w-xl"
                                style={{ color: '#C9BFA8' }}
                            >
                                Empower Your Future with Skills That Matter
                            </p>
                        </div>
                        
                        <p 
                            className="max-w-md text-base"
                            style={{ color: '#8A7F72' }}
                        >
                            Discover a world where creativity meets opportunity. Our comprehensive approach ensures you graduate with more than just a certificate — you graduate with a career-ready portfolio and industry connections.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Featured Card - Left Column (4 cols) */}
                    <div className="lg:col-span-4">
                        <ScrollReveal type="slide" direction="right" delay={0.1}>
                            <div className="glass-contrast rounded-xl p-8 h-full relative overflow-hidden group">
                                {/* Animated background glows */}
                                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#E8281C] blur-[100px] opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                                <div className="absolute bottom-[-20%] left-[-20%] w-56 h-56 bg-[#22C55E] blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none" />
                                
                                <div className="relative z-10 h-full flex flex-col">
                                    {/* Icon Badge */}
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8281C]/30 to-[#E8281C]/10 flex items-center justify-center border border-[#E8281C]/30 mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Play className="w-8 h-8 text-[#E8281C]" />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1">
                                        <span className="text-xs font-bold tracking-widest text-[#E8281C] uppercase mb-3 block">
                                            Featured Program
                                        </span>
                                        
                                        <h3 
                                            className="font-display text-3xl mb-4"
                                            style={{ color: '#F5EFE0' }}
                                        >
                                            Workshops & Masterclasses
                                        </h3>
                                        
                                        <p 
                                            className="text-base mb-6"
                                            style={{ color: '#C9BFA8' }}
                                        >
                                            Learn directly from industry veterans through intensive hands-on sessions. Get real-world insights, build professional networks, and accelerate your creative journey with personalized mentorship.
                                        </p>
                                        
                                        <ul className="space-y-3 mb-8">
                                            {[
                                                'Live industry projects',
                                                '1-on-1 mentorship sessions',
                                                'Portfolio building workshops',
                                                'Networking events'
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                                                    <span style={{ color: '#8A7F72' }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {/* CTA Button */}
                                    <button className="btn-primary w-full py-4 text-base shadow-[0_0_20px_rgba(232,40,28,0.3)] hover:shadow-[0_0_30px_rgba(232,40,28,0.5)] transition-shadow duration-300">
                                        EXPLORE WORKSHOPS
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Benefits Grid - Right Column (8 cols) */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {BENEFITS.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <ScrollReveal 
                                        key={index} 
                                        type="scale" 
                                        delay={0.15 + index * 0.08}
                                    >
                                        <div
                                            className={`group relative rounded-xl p-6 h-full cursor-default overflow-hidden transition-all duration-300 glass ${benefit.border} ${benefit.glow}`}
                                        >
                                            {/* Gradient overlay on hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                            
                                            {/* Big number watermark */}
                                            <div 
                                                className="absolute top-4 right-4 font-display text-5xl pointer-events-none select-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                                                style={{ color: benefit.color === 'red' ? '#E8281C' : benefit.color === 'green' ? '#22C55E' : '#F5B932' }}
                                            >
                                                0{index + 1}
                                            </div>
                                            
                                            <div className="relative z-10">
                                                {/* Icon */}
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                                                    benefit.color === 'red' ? 'bg-[#E8281C]/20 text-[#E8281C]' :
                                                    benefit.color === 'green' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                                                    'bg-[#F5B932]/20 text-[#F5B932]'
                                                }`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                
                                                {/* Title */}
                                                <h4 
                                                    className="font-display text-xl mb-3 group-hover:translate-x-1 transition-transform duration-300"
                                                    style={{ color: '#F5EFE0' }}
                                                >
                                                    {benefit.title}
                                                </h4>
                                                
                                                {/* Description */}
                                                <p 
                                                    className="text-sm leading-relaxed"
                                                    style={{ color: '#8A7F72' }}
                                                >
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Main component with device detection for adaptive loading
export default function CreativeCareers() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Device detection for adaptive component loading
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    // Adaptive component swap - Phone NEVER downloads Laptop-only code
    if (isMobile) {
        return <CreativeCareersPhone />;
    }

    return <CreativeCareersLaptop />;
}
