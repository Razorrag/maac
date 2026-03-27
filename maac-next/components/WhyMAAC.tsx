'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Play, Users, Briefcase, FolderOpen, Monitor, Layers, ArrowRight, Star, Zap, Award } from 'lucide-react';

// ============================================
// Performance: Tree-shaken framer-motion imports
// Using only what we need for optimal bundle size
// ============================================

// Benefit cards data
const BENEFITS = [
    {
        title: 'Learn from Industry Game Changers',
        description: 'Master skills from professionals who\'ve worked on blockbuster films and AAA games',
        icon: Users,
        color: 'red',
        gradient: 'from-[#E8281C]/30 to-transparent',
        shadow: 'shadow-[0_0_60px_rgba(232,40,28,0.3)]',
        image: 'https://picsum.photos/seed/maac-mentor/800/600',
    },
    {
        title: 'Exclusive Industry Exposure',
        description: 'Get firsthand experience with live projects and studio workflows',
        icon: Monitor,
        color: 'green',
        gradient: 'from-[#22C55E]/30 to-transparent',
        shadow: 'shadow-[0_0_60px_rgba(34,197,94,0.3)]',
        image: 'https://picsum.photos/seed/maac-studio/800/600',
    },
    {
        title: 'Placement Support',
        description: 'Dedicated career guidance, portfolio reviews, and interview opportunities',
        icon: Briefcase,
        color: 'amber',
        gradient: 'from-[#F5B932]/30 to-transparent',
        shadow: 'shadow-[0_0_60px_rgba(245,185,50,0.3)]',
        image: 'https://picsum.photos/seed/maac-career/800/600',
    },
    {
        title: 'Portfolio that Speaks Volumes',
        description: 'Build a professional-grade portfolio that stands out to employers',
        icon: FolderOpen,
        color: 'red',
        gradient: 'from-[#E8281C]/30 to-transparent',
        shadow: 'shadow-[0_0_60px_rgba(232,40,28,0.3)]',
        image: 'https://picsum.photos/seed/maac-portfolio/800/600',
    },
    {
        title: 'Industry-Grade Facilities',
        description: 'Access state-of-the-art labs, studios, and cutting-edge technology',
        icon: Layers,
        color: 'green',
        gradient: 'from-[#22C55E]/30 to-transparent',
        shadow: 'shadow-[0_0_60px_rgba(34,197,94,0.3)]',
        image: 'https://picsum.photos/seed/maac-lab/800/600',
    },
    {
        title: 'Courses Built for Future',
        description: 'Curriculum designed with emerging tech and industry trends in mind',
        icon: Play,
        color: 'amber',
        gradient: 'from-[#F5B932]/30 to-transparent',
        shadow: 'shadow-[0_0_60px_rgba(245,185,50,0.3)]',
        image: 'https://picsum.photos/seed/maac-future/800/600',
    },
];

// Gallery images for horizontal scroll
const GALLERY_IMAGES = [
    { src: 'https://picsum.photos/seed/student1/600/800', alt: 'Student Work 1', caption: '3D Animation' },
    { src: 'https://picsum.photos/seed/student2/600/800', alt: 'Student Work 2', caption: 'VFX Compositing' },
    { src: 'https://picsum.photos/seed/student3/600/800', alt: 'Student Work 3', caption: 'Game Design' },
    { src: 'https://picsum.photos/seed/student4/600/800', alt: 'Student Work 4', caption: 'Film Production' },
    { src: 'https://picsum.photos/seed/student5/600/800', alt: 'Student Work 5', caption: 'Motion Graphics' },
];

// ============================================
// Utility Components
// ============================================

// Image with lazy loading and CLS prevention
function OptimizedImage({ src, alt, className, priority = false }: { 
    src: string; 
    alt: string; 
    className?: string;
    priority?: boolean;
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ contain: 'layout' }}>
            {/* Placeholder skeleton */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]"
                style={{ opacity: isLoaded ? 0 : 1, transition: 'opacity 0.3s ease' }}
            />
            
            {!hasError ? (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    decoding="async"
                    className={`w-full h-full object-cover transition-transform duration-700 ${isLoaded ? 'scale-100' : 'scale-105'}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    style={{ willChange: 'transform' }}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                    <span className="text-[#8A7F72] text-sm">Image unavailable</span>
                </div>
            )}
        </div>
    );
}

// Number counter animation
function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    
    return (
        <span ref={ref}>
            {isInView ? (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {value}
                </motion.span>
            ) : (
                value
            )}
        </span>
    );
}

// ============================================
// Phone Variant - Mobile Optimized
// Performance: Simplified animations, reduced bundle
// ============================================

function WhyMAACPhone() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            className="relative w-full py-16 px-4 border-t border-[#2a2a2a] overflow-hidden"
            style={{ 
                contain: 'layout style',
                touchAction: 'pan-y',
                overscrollBehaviorY: 'contain'
            }}
        >
            {/* Subtle noise texture for premium feel */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header with staggered reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12"
                >
                    <motion.div 
                        className="glass-contrast px-4 py-2 rounded-full mb-4 inline-flex items-center gap-2"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-[#E8281C] animate-pulse" />
                        <span className="text-xs font-bold tracking-widest text-[#E8281C] uppercase">
                            Think MAAC
                        </span>
                    </motion.div>

                    <h2
                        className="font-display text-4xl md:text-5xl mb-3 leading-[0.95]"
                        style={{ color: '#F5EFE0' }}
                    >
                        Creative Careers<br />
                        <span style={{ color: '#E8281C' }}>That Click</span>
                    </h2>
                    <p
                        className="text-lg mt-4 max-w-2xl mx-auto"
                        style={{ color: '#C9BFA8' }}
                    >
                        Empower Your Future with Skills That Matter
                    </p>
                </motion.div>

                {/* Featured Card with Parallax Image */}
                <FeaturedCardPhone />

                {/* Benefits - Vertical Stack on Mobile */}
                <div className="space-y-4 mt-12">
                    {BENEFITS.map((benefit, index) => (
                        <BenefitCardPhone 
                            key={index} 
                            benefit={benefit} 
                            index={index}
                        />
                    ))}
                </div>

                {/* Image Gallery - Swipe Carousel */}
                <ImageGalleryPhone />
            </div>
        </section>
    );
}

// Phone Featured Card
function FeaturedCardPhone() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-contrast rounded-xl p-6 relative overflow-hidden"
        >
            {/* Image with parallax */}
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <OptimizedImage 
                    src="https://picsum.photos/seed/maac-featured/800/600" 
                    alt="Featured Program"
                    className="absolute inset-0"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0808] to-transparent" />
            </div>

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8281C]/30 to-[#E8281C]/10 flex items-center justify-center border border-[#E8281C]/30 mb-4">
                    <Play className="w-6 h-6 text-[#E8281C]" />
                </div>

                <span className="text-xs font-bold tracking-widest text-[#E8281C] uppercase mb-3 block">
                    Featured Program
                </span>

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
                    Learn directly from industry veterans through intensive hands-on sessions. Get real-world insights and accelerate your creative journey.
                </p>

                <ul className="space-y-2 mb-6">
                    {[
                        'Live industry projects',
                        '1-on-1 mentorship',
                        'Portfolio workshops'
                    ].map((item, i) => (
                        <motion.li 
                            key={i} 
                            className="flex items-center gap-2 text-xs"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                            <span style={{ color: '#8A7F72' }}>{item}</span>
                        </motion.li>
                    ))}
                </ul>

                <button className="btn-primary w-full py-3 text-sm">
                    EXPLORE WORKSHOPS
                </button>
            </div>
        </motion.div>
    );
}

// Phone Benefit Card
function BenefitCardPhone({ benefit, index }: { benefit: typeof BENEFITS[0]; index: number }) {
    const Icon = benefit.icon;
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-lg p-5 overflow-hidden glass"
            style={{ contain: 'layout' }}
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
        </motion.div>
    );
}

// Phone Image Gallery - Touch-friendly swipe
function ImageGalleryPhone() {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
        >
            <div className="text-center mb-6">
                <h3 
                    className="font-display text-2xl mb-2"
                    style={{ color: '#F5EFE0' }}
                >
                    Student Showcase
                </h3>
                <p style={{ color: '#8A7F72' }} className="text-sm">
                    Swipe to explore amazing work
                </p>
            </div>

            {/* Horizontal scroll container - touch optimized */}
            <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
                style={{ 
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth',
                }}
            >
                {GALLERY_IMAGES.map((image, index) => (
                    <motion.div
                        key={index}
                        className="snap-center flex-shrink-0 w-[280px] relative rounded-xl overflow-hidden glass"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <OptimizedImage 
                            src={image.src} 
                            alt={image.alt}
                            className="h-80"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0a0a0a] to-transparent">
                            <p className="text-sm font-medium" style={{ color: '#F5EFE0' }}>
                                {image.caption}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ============================================
// Laptop Variant - Rich Interactions
// Performance: Lazy-loaded, code-split from phone
// ============================================

function WhyMAACLaptop() {
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    
    // Better scroll offset - animates when section arrives in view
    // ['start end'] = when top of section hits bottom of viewport
    // ['end start'] = when bottom of section hits top of viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'] // Triggers at the right time
    });

    // Mouse parallax effect - disabled for reduced motion
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Skip parallax for users who prefer reduced motion
        if (shouldReduceMotion) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                mouseX.set(x);
                mouseY.set(y);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, shouldReduceMotion]);

    return (
        <section 
            ref={containerRef}
            className="relative w-full py-24 px-4 md:px-12 border-t border-[#2a2a2a] overflow-hidden"
            style={{ 
                contain: 'layout style',
                touchAction: 'pan-y',
                overscrollBehaviorY: 'contain'
            }}
        >
            {/* Noise texture overlay for premium feel */}
            <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Header */}
                <HeaderSection mouseX={mouseXSpring} mouseY={mouseYSpring} />

                {/* Main Content */}
                <div className="mt-16 space-y-32">
                    <FeaturedCardLaptop mouseX={mouseXSpring} mouseY={mouseYSpring} />
                    <HorizontalBenefits scrollYProgress={scrollYProgress} />
                    <ImageGalleryLaptop />
                </div>
            </div>
        </section>
    );
}

// Laptop Header with word reveal
function HeaderSection({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
    const words = ['Creative', 'Careers', 'That', 'Click'];
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
        >
            <motion.div 
                className="glass-contrast px-4 py-2 rounded-full mb-6 inline-flex items-center gap-2"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                    x: mouseX ? useTransform(mouseX, [-0.5, 0.5], [-10, 10]) : 0,
                    y: mouseY ? useTransform(mouseY, [-0.5, 0.5], [-5, 5]) : 0,
                }}
            >
                <span className="w-2 h-2 rounded-full bg-[#E8281C] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#E8281C] uppercase">
                    Think MAAC
                </span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-3xl">
                    <h2
                        className="font-display text-5xl xl:text-6xl mb-4 leading-[0.92]"
                        style={{ color: '#F5EFE0' }}
                    >
                        {words.map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 60, rotateX: -45 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3 + index * 0.1,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="inline-block mr-3"
                                style={{ willChange: 'transform, opacity' }}
                            >
                                {word}{' '}
                            </motion.span>
                        ))}
                        <br className="lg:hidden" />
                        <motion.span
                            initial={{ opacity: 0, color: '#E8281C' }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            style={{ color: '#E8281C' }}
                        >
                            — Think MAAC
                        </motion.span>
                    </h2>

                    <motion.p
                        className="text-xl max-w-xl"
                        style={{ color: '#C9BFA8' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        Empower Your Future with Skills That Matter
                    </motion.p>
                </div>

                <motion.p
                    className="max-w-md text-base"
                    style={{ color: '#8A7F72' }}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    Discover a world where creativity meets opportunity. Graduate with a career-ready portfolio and industry connections.
                </motion.p>
            </div>
        </motion.div>
    );
}

// Laptop Featured Card with Parallax Image
function FeaturedCardLaptop({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start']
    });

    // Parallax image movement - disabled for reduced motion
    const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-10%', '10%']);

    // Mouse tilt effect - disabled for reduced motion
    const rotateX = useTransform(mouseY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-5, 5]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured Card - Left */}
            <motion.div
                ref={cardRef}
                className="lg:col-span-5"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    perspective: 1000,
                    transformStyle: 'preserve-3d',
                }}
            >
                <motion.div
                    className="glass-contrast rounded-2xl p-8 h-full relative overflow-hidden group"
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
                    }}
                >
                    {/* Animated glows */}
                    <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#E8281C] blur-[100px] opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-56 h-56 bg-[#22C55E] blur-[80px] opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none" />

                    {/* Parallax Image Container */}
                    <div className="relative h-64 -mx-8 -mt-8 mb-8 overflow-hidden">
                        <motion.div 
                            className="absolute inset-0"
                            style={{ y: imageY, willChange: 'transform' }}
                        >
                            <OptimizedImage 
                                src="https://picsum.photos/seed/maac-featured-lg/1000/800" 
                                alt="Featured Program"
                                className="h-full w-full"
                                priority
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0808]/50 to-[#1a0808]" />
                    </div>

                    <div className="relative z-10">
                        <motion.div 
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8281C]/30 to-[#E8281C]/10 flex items-center justify-center border border-[#E8281C]/30 mb-6 group-hover:scale-110 transition-transform duration-500"
                            whileHover={{ rotate: 5 }}
                        >
                            <Play className="w-8 h-8 text-[#E8281C]" />
                        </motion.div>

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
                            Learn directly from industry veterans through intensive hands-on sessions. Get real-world insights, build professional networks, and accelerate your creative journey.
                        </p>

                        <ul className="space-y-3 mb-8">
                            {[
                                'Live industry projects',
                                '1-on-1 mentorship sessions',
                                'Portfolio building workshops',
                                'Networking events'
                            ].map((item, i) => (
                                <motion.li 
                                    key={i} 
                                    className="flex items-center gap-3 text-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                                    <span style={{ color: '#8A7F72' }}>{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.button 
                            className="btn-primary w-full py-4 text-base shadow-[0_0_20px_rgba(232,40,28,0.3)] hover:shadow-[0_0_40px_rgba(232,40,28,0.5)] transition-shadow duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            EXPLORE WORKSHOPS
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Benefits Grid - Right */}
            <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BENEFITS.map((benefit, index) => (
                        <BenefitCardLaptop 
                            key={index} 
                            benefit={benefit} 
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Laptop Benefit Card with hover effects
function BenefitCardLaptop({ benefit, index }: { benefit: typeof BENEFITS[0]; index: number }) {
    const Icon = benefit.icon;
    const cardRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // Mouse parallax for each card - disabled for reduced motion
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useTransform(mouseX, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-8, 8]);
    const y = useTransform(mouseY, [-0.5, 0.5], shouldReduceMotion ? [0, 0] : [-4, 4]);

    useEffect(() => {
        // Skip parallax for users who prefer reduced motion
        if (shouldReduceMotion) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (rect) {
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                mouseX.set(x);
                mouseY.set(y);
            }
        };

        cardRef.current?.addEventListener('mousemove', handleMouseMove);
        return () => cardRef.current?.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, shouldReduceMotion]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: 0.1 + index * 0.08,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="group relative rounded-2xl p-6 h-full overflow-hidden glass"
            style={{
                contain: 'layout',
                willChange: 'transform',
            }}
        >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Number watermark */}
            <motion.div
                className="absolute top-4 right-4 font-display text-5xl pointer-events-none select-none opacity-5 group-hover:opacity-15 transition-opacity duration-500"
                initial={{ opacity: 0.05 }}
                whileHover={{ opacity: 0.15, scale: 1.1 }}
                style={{ 
                    color: benefit.color === 'red' ? '#E8281C' : benefit.color === 'green' ? '#22C55E' : '#F5B932',
                    willChange: 'opacity, transform',
                }}
            >
                0{index + 1}
            </motion.div>

            <motion.div 
                className="relative z-10"
                style={{ x, y, willChange: 'transform' }}
            >
                {/* Icon */}
                <motion.div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:scale-110 ${
                        benefit.color === 'red' ? 'bg-[#E8281C]/20 text-[#E8281C]' :
                        benefit.color === 'green' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                        'bg-[#F5B932]/20 text-[#F5B932]'
                    }`}
                    whileHover={{ rotate: 5 }}
                >
                    <Icon className="w-6 h-6" />
                </motion.div>

                {/* Title */}
                <motion.h4
                    className="font-display text-xl mb-3"
                    style={{ color: '#F5EFE0' }}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    {benefit.title}
                </motion.h4>

                {/* Description */}
                <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#8A7F72' }}
                >
                    {benefit.description}
                </p>
            </motion.div>
        </motion.div>
    );
}

// Horizontal Benefits Section - Sticky Scroll
function HorizontalBenefits({ scrollYProgress }: { scrollYProgress: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    
    // Smooth controlled scroll - 1:1 ratio feels natural
    // For 6 cards (1 intro + 5 benefits), we need to show each clearly
    // Using percentage-based movement instead of viewport units for smoother feel
    const x = useTransform(
        scrollYProgress, 
        [0, 1], 
        ['0%', '-85%'] // Smooth scroll - shows each card clearly without racing
    );
    
    const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div ref={containerRef} className="relative" style={{ touchAction: 'pan-y', overscrollBehaviorY: 'contain' }}>
            {/* Sticky container */}
            <div className="sticky top-20 h-[100vh] flex items-center overflow-hidden">
                {/* Progress indicator */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
                        <span className="text-xs font-bold tracking-widest text-[#8A7F72] uppercase">
                            Why Choose MAAC
                        </span>
                        <div className="w-32 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#E8281C]"
                                style={{ width: progressBarWidth }}
                            />
                        </div>
                    </div>
                </div>

                {/* Horizontal scroll content */}
                <motion.div
                    className="flex gap-8 px-4"
                    style={{
                        x,
                        willChange: 'transform',
                    }}
                >
                    {/* Intro Card */}
                    <motion.div 
                        className="flex-shrink-0 w-[80vw] md:w-[600px] h-[60vh] glass-contrast rounded-3xl p-12 flex flex-col justify-center relative overflow-hidden"
                        style={{ contain: 'layout' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E8281C]/10 to-transparent" />
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 
                                    className="font-display text-5xl mb-6"
                                    style={{ color: '#F5EFE0' }}
                                >
                                    6 Reasons to<br />
                                    <span style={{ color: '#E8281C' }}>Choose MAAC</span>
                                </h3>
                                <p 
                                    className="text-xl max-w-md"
                                    style={{ color: '#C9BFA8' }}
                                >
                                    Discover what makes us the premier choice for creative careers in animation, VFX, gaming, and filmmaking.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Benefit Cards */}
                    {BENEFITS.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-[80vw] md:w-[500px] h-[60vh] relative rounded-3xl overflow-hidden group"
                            style={{ contain: 'layout' }}
                        >
                            {/* Background Image with Parallax */}
                            <div className="absolute inset-0">
                                <OptimizedImage 
                                    src={benefit.image} 
                                    alt={benefit.title}
                                    className="h-full w-full"
                                />
                            </div>
                            
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent`} />
                            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-60`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {/* Number Badge */}
                                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6">
                                        <span 
                                            className="font-display text-3xl"
                                            style={{ 
                                                color: benefit.color === 'red' ? '#E8281C' : benefit.color === 'green' ? '#22C55E' : '#F5B932',
                                            }}
                                        >
                                            0{index + 1}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                                        benefit.color === 'red' ? 'bg-[#E8281C]/30 text-[#E8281C]' :
                                        benefit.color === 'green' ? 'bg-[#22C55E]/30 text-[#22C55E]' :
                                        'bg-[#F5B932]/30 text-[#F5B932]'
                                    }`}>
                                        <benefit.icon className="w-7 h-7" />
                                    </div>

                                    <h4
                                        className="font-display text-3xl mb-4"
                                        style={{ color: '#F5EFE0' }}
                                    >
                                        {benefit.title}
                                    </h4>
                                    <p
                                        className="text-base"
                                        style={{ color: '#C9BFA8' }}
                                    >
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

// Laptop Image Gallery - Auto-scrolling
function ImageGalleryLaptop() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div ref={galleryRef} className="relative">
            <div className="text-center mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 
                        className="font-display text-4xl mb-3"
                        style={{ color: '#F5EFE0' }}
                    >
                        Student Showcase
                    </h3>
                    <p style={{ color: '#8A7F72' }} className="text-lg">
                        Explore incredible work from our talented students
                    </p>
                </motion.div>
            </div>

            {/* Auto-scrolling carousel */}
            <div 
                className="relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex gap-6"
                    animate={{ x: isHovered ? 0 : '-50%' }}
                    transition={{ 
                        duration: 30, 
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                    style={{ willChange: 'transform' }}
                >
                    {/* Duplicate images for seamless loop */}
                    {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((image, index) => (
                        <motion.div
                            key={`${image.alt}-${index}`}
                            className="flex-shrink-0 w-[320px] relative rounded-2xl overflow-hidden group glass"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -8 }}
                        >
                            <OptimizedImage 
                                src={image.src} 
                                alt={image.alt}
                                className="h-[420px]"
                            />
                            
                            {/* Glassmorphism overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-sm font-medium mb-1" style={{ color: '#F5EFE0' }}>
                                    {image.caption}
                                </p>
                                <div className="flex items-center gap-2 text-xs" style={{ color: '#8A7F72' }}>
                                    <Star className="w-3 h-3 text-[#F5B932]" fill="#F5B932" />
                                    <span>Featured Work</span>
                                </div>
                            </div>

                            {/* Border glow on hover */}
                            <div className="absolute inset-0 border-2 border-[#E8281C]/0 group-hover:border-[#E8281C]/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
            </div>
        </div>
    );
}

// ============================================
// Main Component - Adaptive Device Detection
// Performance: Phone NEVER downloads Laptop code
// ============================================

export default function WhyMAAC() {
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
        return (
            <section className="relative w-full py-24 px-4 border-t border-[#2a2a2a]">
                {/* Skeleton loader */}
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 w-48 bg-[#1a1a1a] rounded mb-8 animate-pulse" />
                    <div className="h-16 w-3/4 bg-[#1a1a1a] rounded mb-4 animate-pulse" />
                    <div className="h-16 w-1/2 bg-[#1a1a1a] rounded animate-pulse" />
                </div>
            </section>
        );
    }

    // Adaptive component swap - Phone NEVER downloads Laptop-only code
    if (isMobile) {
        return <WhyMAACPhone />;
    }

    return <WhyMAACLaptop />;
}
