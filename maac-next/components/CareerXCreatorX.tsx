'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { ArrowRight, CheckCircle, Play, Monitor, Users, Award } from 'lucide-react';

// Color constants - NO PURPLE
const COLORS = {
    careerX: {
        primary: '#E8281C',
        light: '#FF5E55',
        gradient: 'from-[#E8281C] to-[#FF5E55]',
    },
    creatorX: {
        primary: '#22C55E',
        light: '#4ADE80',
        gradient: 'from-[#22C55E] to-[#4ADE80]',
    },
    background: '#0A0A0A',
    cream: '#F5EFE0',
    creamMuted: '#C9BFA8',
    warmGray: '#8A7F72',
};

// Course data for Affiliated Courses section
const AFFILIATED_COURSES = [
    {
        title: 'Animation & VFX',
        duration: '24 Months',
        icon: Play,
        color: 'red',
    },
    {
        title: 'Game Design & Development',
        duration: '18 Months',
        icon: Monitor,
        color: 'green',
    },
    {
        title: 'Film Production',
        duration: '12 Months',
        icon: Play,
        color: 'amber',
    },
    {
        title: 'Digital Content Creation',
        duration: '10 Months',
        icon: Users,
        color: 'red',
    },
    {
        title: 'XR & Immersive Tech',
        duration: '15 Months',
        icon: Award,
        color: 'green',
    },
];

// Parallax Image Component with GPU-accelerated transforms
function ParallaxImage({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const ref = useRef<HTMLDivElement>(null);
    
    // Parallax effect: image moves at different scroll speed
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
    
    // Mouse-based parallax on desktop (subtle tilt/shift)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
        damping: 30,
        stiffness: 200,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
        damping: 30,
        stiffness: 200,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth < 1024) return; // Disable on mobile
        
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="relative hidden lg:block w-full h-[600px] rounded-3xl overflow-hidden"
            style={{
                y,
                scale,
                opacity,
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* X-Frame decorative border */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#E8281C]/50 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#22C55E]/50 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#22C55E]/50 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#E8281C]/50 rounded-br-3xl" />
            </div>
            
            {/* Image with skeleton placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0808] via-[#0d1a0e] to-[#0a0a0a]">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/images/careerx-creatorx-studio.svg")',
                        transform: 'translate3d(0, 0, 0)',
                        willChange: 'transform',
                    }}
                />
                {/* Fallback gradient if image doesn't load */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E8281C]/10 via-transparent to-[#22C55E]/10" />
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
        </motion.div>
    );
}

// Floating Badge with smooth animation
function FloatingBadge() {
    return (
        <motion.div
            className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-30"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.8,
            }}
        >
            <div className="relative">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#E8281C] to-[#FF5E55] rounded-full blur-xl opacity-50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative bg-gradient-to-r from-[#E8281C] to-[#FF5E55] px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl">
                    <span className="text-xs md:text-sm font-bold text-[#F5EFE0] uppercase tracking-wider whitespace-nowrap">
                        Newly Launched
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// Feature Card Component with staggered reveals
function FeatureCard({
    title,
    color,
    bullets,
    icon: Icon,
    delay,
    isMobile
}: {
    title: string;
    color: 'red' | 'green';
    bullets: string[];
    icon: React.ComponentType<{ className?: string }>;
    delay: number;
    isMobile: boolean;
}) {
    const colorConfig = color === 'red' ? COLORS.careerX : COLORS.creatorX;
    
    return (
        <motion.div
            className={`relative group p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 ${
                color === 'red' 
                    ? 'bg-gradient-to-br from-[#E8281C]/10 to-transparent border border-[#E8281C]/20' 
                    : 'bg-gradient-to-br from-[#22C55E]/10 to-transparent border border-[#22C55E]/20'
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={!isMobile ? { y: -8, scale: 1.02 } : undefined}
        >
            {/* Hover glow effect */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                    color === 'red' 
                        ? 'bg-gradient-to-br from-[#E8281C]/20 to-transparent' 
                        : 'bg-gradient-to-br from-[#22C55E]/20 to-transparent'
                }`}
                style={{ filter: 'blur(40px)' }}
            />
            
            {/* Icon Badge */}
            <motion.div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    color === 'red' 
                        ? 'bg-[#E8281C]/20 text-[#E8281C]' 
                        : 'bg-[#22C55E]/20 text-[#22C55E]'
                }`}
                whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : undefined}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Icon className="w-7 h-7 md:w-8 md:h-8" />
            </motion.div>
            
            {/* Title */}
            <motion.h3
                className={`font-display text-3xl md:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r ${colorConfig.gradient}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: delay + 0.1 }}
            >
                {title}
            </motion.h3>
            
            {/* Bullet Points with staggered animation */}
            <ul className="space-y-3 md:space-y-4">
                {bullets.map((bullet, index) => (
                    <motion.li
                        key={index}
                        className="flex items-start gap-3 md:gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: delay + 0.2 + index * 0.1 }}
                    >
                        <motion.div
                            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full mt-2 flex-shrink-0 ${
                                color === 'red' ? 'bg-[#E8281C]' : 'bg-[#22C55E]'
                            }`}
                            whileHover={!isMobile ? { scale: 1.5 } : undefined}
                        />
                        <span className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.creamMuted }}>
                            {bullet}
                        </span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

// Affiliated Course Card
function CourseCard({ course, index, isMobile }: { course: typeof AFFILIATED_COURSES[0]; index: number; isMobile: boolean }) {
    const Icon = course.icon;
    const colorClass = course.color === 'red' 
        ? 'text-[#E8281C] bg-[#E8281C]/10 border-[#E8281C]/30' 
        : course.color === 'green'
        ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30'
        : 'text-[#F5B932] bg-[#F5B932]/10 border-[#F5B932]/30';
    
    return (
        <motion.div
            className="group relative glass rounded-xl md:rounded-2xl p-5 md:p-6 cursor-pointer min-w-[200px] md:min-w-[240px] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={!isMobile ? { y: -6, scale: 1.03 } : undefined}
            whileTap={isMobile ? { scale: 0.98 } : undefined}
        >
            {/* Gradient border on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                course.color === 'red' 
                    ? 'bg-gradient-to-br from-[#E8281C]/10 to-transparent' 
                    : course.color === 'green'
                    ? 'bg-gradient-to-br from-[#22C55E]/10 to-transparent'
                    : 'bg-gradient-to-br from-[#F5B932]/10 to-transparent'
            }`} />
            
            <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 ${colorClass} border group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                
                {/* Title */}
                <h4 className="font-display text-lg md:text-xl mb-2" style={{ color: COLORS.cream }}>
                    {course.title}
                </h4>
                
                {/* Duration */}
                <p className="text-xs md:text-sm mb-4" style={{ color: COLORS.warmGray }}>
                    {course.duration}
                </p>
                
                {/* Arrow */}
                <motion.div
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                    style={{ color: course.color === 'red' ? COLORS.careerX.primary : course.color === 'green' ? COLORS.creatorX.primary : '#F5B932' }}
                    initial={{ x: 0 }}
                    whileHover={!isMobile ? { x: 8 } : undefined}
                >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                </motion.div>
            </div>
        </motion.div>
    );
}

// Phone variant - optimized for mobile with touch-friendly interactions
function CareerXCreatorXPhone({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
        <section className="relative w-full py-16 px-4 border-t border-[#2a2a2a] overflow-hidden bg-[#0A0A0A]">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[#E8281C] blur-[120px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] bg-[#22C55E] blur-[100px] opacity-8 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header with Badge */}
                <motion.div
                    className="text-center mb-10 relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <FloatingBadge />
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: COLORS.warmGray }}>
                            Dual Pathways • Industry Co-curated Programs
                        </p>
                    </motion.div>
                    
                    <motion.h2
                        className="font-display text-4xl md:text-5xl mb-4 leading-[0.95]"
                        style={{ color: COLORS.cream }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        INTRODUCING
                    </motion.h2>
                    
                    <motion.div
                        className="flex items-center justify-center gap-2 flex-wrap"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8281C] to-[#FF5E55] text-4xl md:text-5xl font-display">
                            CAREER X
                        </span>
                        <span className="text-[#C9BFA8] text-2xl md:text-3xl">&</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-4xl md:text-5xl font-display">
                            CREATOR X
                        </span>
                    </motion.div>
                </motion.div>
                
                {/* Intro Description */}
                <motion.p
                    className="text-center text-base md:text-lg mb-10 max-w-2xl mx-auto"
                    style={{ color: COLORS.creamMuted }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    India's first AVGC-XR academy bringing holistic industry-integrated academic programs taught by industry experts.
                </motion.p>
                
                {/* Studio Image - Simplified for mobile */}
                <motion.div
                    className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 border border-[#2a2a2a]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* X-Frame corners */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E8281C]/50 rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#22C55E]/50 rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#22C55E]/50 rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E8281C]/50 rounded-br-xl" />
                    </div>
                    
                    {/* Image with skeleton */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0808] via-[#0d1a0e] to-[#0a0a0a]">
                        {!imageLoaded && (
                            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]" />
                        )}
                        <motion.img
                            src="/images/careerx-creatorx-studio.svg"
                            alt="Students in MAAC studio with professional equipment"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            style={{ willChange: 'transform, opacity' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                    </div>
                </motion.div>
                
                {/* Feature Cards - Stacked vertically on mobile */}
                <div className="space-y-6 mb-12">
                    <FeatureCard
                        title="CAREER X"
                        color="red"
                        delay={0.5}
                        isMobile={true}
                        bullets={[
                            'Taught by seasoned industry practitioners',
                            'Deep specialization for Studio and Production roles',
                            'Focus on Global AVGC-XR pipelines',
                            'Industry-recognized certification',
                        ]}
                        icon={Award}
                    />
                    
                    <FeatureCard
                        title="CREATOR X"
                        color="green"
                        delay={0.6}
                        isMobile={true}
                        bullets={[
                            'Real-world content production skills',
                            'AI-driven workflows and storytelling',
                            'Monetize, publish, and scale digital content',
                            'Build your personal brand',
                            'Creator economy mastery',
                        ]}
                        icon={Monitor}
                    />
                </div>
                
                {/* Affiliated Courses - Horizontal scroll carousel */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    <h3 className="font-display text-2xl md:text-3xl mb-6 text-center" style={{ color: COLORS.cream }}>
                        Our Affiliated Courses
                    </h3>
                    
                    {/* Swipe-friendly horizontal scroll */}
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-snap-x no-scrollbar">
                        {AFFILIATED_COURSES.map((course, index) => (
                            <div key={course.title} className="snap-center flex-shrink-0">
                                <CourseCard course={course} index={index} isMobile={true} />
                            </div>
                        ))}
                    </div>
                    
                    {/* Powered by text */}
                    <p className="text-center text-xs mt-6" style={{ color: COLORS.warmGray }}>
                        Powered by <span className="text-[#E8281C] font-bold">CareerX</span> | <span className="text-[#22C55E] font-bold">CreatorX</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// Laptop variant - rich interactions with parallax and multi-column layout
function CareerXCreatorXLaptop({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const sectionRef = useRef<HTMLElement>(null);
    
    // Advanced parallax: section scroll progress
    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    
    // Staggered text reveals
    const headerY = useTransform(sectionProgress, [0, 0.3], [50, 0]);
    const headerOpacity = useTransform(sectionProgress, [0, 0.2], [0, 1]);
    
    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 px-4 md:px-12 border-t border-[#2a2a2a] overflow-hidden bg-[#0A0A0A]"
        >
            {/* Background glows with parallax */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E8281C] blur-[150px] opacity-10 pointer-events-none"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#22C55E] blur-[150px] opacity-8 pointer-events-none"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
            />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Two-column layout: Content left, Image right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
                    {/* Left Column: Header + Content */}
                    <div className="flex flex-col">
                        {/* Header with Badge */}
                        <motion.div
                            className="relative mb-10"
                            style={{ y: headerY, opacity: headerOpacity }}
                        >
                            <FloatingBadge />
                            
                            <motion.p
                                className="text-sm font-bold tracking-widest uppercase mb-6"
                                style={{ color: COLORS.warmGray }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                Dual Pathways • Industry Co-curated Programs
                            </motion.p>
                            
                            <motion.h2
                                className="font-display text-5xl xl:text-6xl mb-6 leading-[0.92]"
                                style={{ color: COLORS.cream }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                INTRODUCING
                            </motion.h2>
                            
                            <motion.div
                                className="flex items-center gap-3 flex-wrap"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8281C] to-[#FF5E55] text-5xl xl:text-6xl font-display">
                                    CAREER X
                                </span>
                                <span className="text-[#C9BFA8] text-4xl xl:text-5xl">&</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#4ADE80] text-5xl xl:text-6xl font-display">
                                    CREATOR X
                                </span>
                            </motion.div>
                        </motion.div>
                        
                        {/* Intro Description */}
                        <motion.p
                            className="text-xl leading-relaxed mb-12 max-w-xl"
                            style={{ color: COLORS.creamMuted }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            India's first AVGC-XR academy bringing holistic industry-integrated academic programs taught by industry experts.
                        </motion.p>
                        
                        {/* Feature Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FeatureCard
                                title="CAREER X"
                                color="red"
                                delay={0.4}
                                isMobile={false}
                                bullets={[
                                    'Taught by seasoned industry practitioners',
                                    'Deep specialization for Studio and Production roles',
                                    'Focus on Global AVGC-XR pipelines',
                                    'Industry-recognized certification',
                                ]}
                                icon={Award}
                            />
                            
                            <FeatureCard
                                title="CREATOR X"
                                color="green"
                                delay={0.5}
                                isMobile={false}
                                bullets={[
                                    'Real-world content production skills',
                                    'AI-driven workflows and storytelling',
                                    'Monetize, publish, and scale digital content',
                                    'Build your personal brand',
                                    'Creator economy mastery',
                                ]}
                                icon={Monitor}
                            />
                        </div>
                    </div>
                    
                    {/* Right Column: Parallax Image */}
                    <div className="relative">
                        <ParallaxImage scrollYProgress={scrollYProgress} />
                    </div>
                </div>
                
                {/* Affiliated Courses Section */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {/* Decorative divider */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#2a2a2a]" />
                        <div className="w-2 h-2 rounded-full bg-[#E8281C]" />
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#2a2a2a]" />
                    </div>
                    
                    <h3 className="font-display text-4xl md:text-5xl mb-10 text-center" style={{ color: COLORS.cream }}>
                        Our Affiliated Courses
                    </h3>
                    
                    {/* Course Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
                        {AFFILIATED_COURSES.map((course, index) => (
                            <CourseCard key={course.title} course={course} index={index} isMobile={false} />
                        ))}
                    </div>
                    
                    {/* Powered by text */}
                    <motion.p
                        className="text-center text-sm"
                        style={{ color: COLORS.warmGray }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        Powered by{' '}
                        <span className="text-[#E8281C] font-bold">CareerX</span>
                        {' | '}
                        <span className="text-[#22C55E] font-bold">CreatorX</span>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

// Main component with device detection for adaptive loading
export default function CareerXCreatorX() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    // ✅ FIX: useMotionValue called at TOP LEVEL, not inside useEffect
    const scrollYProgress = useMotionValue(0);

    useEffect(() => {
        setMounted(true);

        // Device detection for adaptive component loading
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        // ✅ FIX: Update the motion value instead of creating it inside useEffect
        const updateScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / scrollHeight;
            scrollYProgress.set(progress);
        };

        updateScroll();
        window.addEventListener('scroll', updateScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('scroll', updateScroll);
        };
    }, [scrollYProgress]);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <section className="relative w-full py-24 px-4 md:px-12 border-t border-[#2a2a2a] bg-[#0A0A0A]">
                {/* Skeleton loader */}
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-[#1a1a1a] rounded-2xl" />
                        <div className="h-64 bg-[#1a1a1a] rounded-2xl" />
                        <div className="grid grid-cols-2 gap-6">
                            <div className="h-48 bg-[#1a1a1a] rounded-2xl" />
                            <div className="h-48 bg-[#1a1a1a] rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Adaptive component swap - Phone NEVER downloads Laptop-only code
    if (isMobile) {
        return <CareerXCreatorXPhone scrollYProgress={scrollYProgress} />;
    }

    return <CareerXCreatorXLaptop scrollYProgress={scrollYProgress} />;
}
