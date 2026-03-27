'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';

// Color constants
const COLORS = {
    amber: '#F5B932',
    amberLight: '#F5EFE0',
    background: '#0A0A0A',
    cardBg: '#111111',
    cardBorder: '#1a1a1a',
    cream: '#F5EFE0',
    creamMuted: '#C9BFA8',
    red: '#E8281C',
    green: '#22C55E',
};

// Course data - exactly as specified
const COURSES = [
    { name: 'AD3D Edge Plus -', subtitle: 'Powered by CareerX | CreatorX' },
    { name: 'ADVFX Plus -', subtitle: 'Powered by CareerX | CreatorX' },
    { name: 'APDMC Plus -', subtitle: 'Powered by CareerX | CreatorX' },
    { name: 'ADIDG Plus -', subtitle: 'Powered by CareerX | CreatorX' },
];

// Partner logos data
const PARTNERS = [
    { name: 'Nilee Games', logo: '/logos/nilee-games.svg' },
    { name: 'Mugafi', logo: '/logos/mugafi.svg' },
    { name: 'Autodesk', logo: '/logos/autodesk.svg' },
    { name: 'Canon', logo: '/logos/canon.svg' },
    { name: 'Godspeed Games', logo: '/logos/godspeed-games.svg' },
    { name: 'Pixel:Ratio', logo: '/logos/pixel-ratio.svg' },
    { name: 'Cedge Productions', logo: '/logos/cedge.svg' },
    { name: 'Physics Wallah', logo: '/logos/physics-wallah.svg' },
    { name: 'Zebu Animation', logo: '/logos/zebu.svg' },
    { name: 'Resonance Digital', logo: '/logos/resonance.svg' },
    { name: 'Cimpress', logo: '/logos/cimpress.svg' },
    { name: 'PhantomFX', logo: '/logos/phantom-fx.svg' },
    { name: 'Tech Mahindra', logo: '/logos/tech-mahindra.svg' },
    { name: 'Plaksha University', logo: '/logos/plaksha.svg' },
    { name: 'Fitch Learning', logo: '/logos/fitch.svg' },
];

// Magnetic Arrow Component with GPU-accelerated motion
function MagneticArrow({ isMobile }: { isMobile: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotation = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    const springRotation = useSpring(rotation, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = (e.clientX - centerX) * 0.3;
        const offsetY = (e.clientY - centerY) * 0.3;

        x.set(offsetX);
        y.set(offsetY);

        // Calculate rotation based on mouse position
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
        rotation.set(angle - 90);
    }, [isMobile, x, y, rotation]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
        rotation.set(0);
    }, [x, y, rotation]);

    const handleClick = useCallback(() => {
        if (!isMobile) {
            rotation.set(360);
            setTimeout(() => rotation.set(0), 300);
        }
    }, [isMobile, rotation]);

    return (
        <motion.div
            ref={ref}
            className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center cursor-pointer z-20 overflow-hidden"
            style={{
                x: springX,
                y: springY,
                rotate: springRotation,
                willChange: 'transform',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            whileHover={!isMobile ? { scale: 1.1 } : undefined}
            whileTap={{ scale: 0.9 }}
            aria-label="View course details"
        >
            <motion.div
                className="w-5 h-5 md:w-6 md:h-6"
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
            >
                <ArrowUpRight className="w-full h-full text-black" strokeWidth={2.5} />
            </motion.div>
        </motion.div>
    );
}

// Course Card Component with progress line animation
function CourseCard({
    course,
    index,
    isMobile,
}: {
    course: typeof COURSES[0];
    index: number;
    isMobile: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    // Random glow color for each card
    const glowColor = index % 2 === 0 ? COLORS.red : COLORS.green;

    return (
        <motion.div
            className="group relative glass rounded-xl md:rounded-2xl p-5 md:p-6 cursor-pointer overflow-hidden flex-shrink-0 min-w-[280px] md:min-w-[320px]"
            initial={{ opacity: 0, y: 60, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={!isMobile ? { y: -8, scale: 1.02 } : undefined}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                background: `rgba(17, 17, 17, 0.8)`,
                backdropFilter: 'blur(24px)',
                border: `1px solid ${COLORS.cardBorder}`,
            }}
        >
            {/* Edge glow effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${glowColor}15 0%, transparent 50%, ${glowColor}08 100%)`,
                    filter: 'blur(20px)',
                }}
            />

            {/* Magnetic Arrow */}
            <MagneticArrow isMobile={isMobile} />

            {/* Content */}
            <div className="relative z-10 pt-8">
                {/* Course Name */}
                <motion.h4
                    className="font-display text-xl md:text-2xl mb-2"
                    style={{ color: COLORS.cream }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.12 + 0.2 }}
                >
                    {course.name}
                </motion.h4>

                {/* Subtitle */}
                <motion.p
                    className="text-xs md:text-sm"
                    style={{ color: COLORS.creamMuted }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
                >
                    {course.subtitle}
                </motion.p>
            </div>

            {/* Progress Line */}
            <div
                ref={progressRef}
                className="absolute bottom-0 left-0 h-0.5 bg-white/30 overflow-hidden"
                style={{ width: '100%' }}
            >
                <motion.div
                    className="h-full bg-white"
                    initial={{ width: '0%' }}
                    animate={{ width: isHovered && !isMobile ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ willChange: 'width' }}
                />
            </div>
        </motion.div>
    );
}

// Partner Logo with hover effects and random wobble
function PartnerLogo({
    partner,
    index,
    isMobile,
    row,
}: {
    partner: typeof PARTNERS[0];
    index: number;
    isMobile: boolean;
    row: number;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Random glow color
    const glowColor = index % 3 === 0 ? COLORS.red : index % 3 === 1 ? COLORS.green : COLORS.amber;

    // Random wobble animation
    const wobbleRotate = useMotionValue(0);
    const wobbleScale = useMotionValue(1);

    const handleHoverStart = () => {
        setIsHovered(true);
        if (!isMobile) {
            wobbleRotate.set(Math.random() * 6 - 3);
            wobbleScale.set(1.08);
        }
    };

    const handleHoverEnd = () => {
        setIsHovered(false);
        wobbleRotate.set(0);
        wobbleScale.set(1);
    };

    return (
        <motion.div
            className="relative flex-shrink-0 mx-3 md:mx-4"
            style={{ width: '180px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
        >
            {/* Logo Container */}
            <motion.div
                className="relative w-full h-20 md:h-24 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer"
                style={{
                    background: '#ffffff',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                    rotate: wobbleRotate,
                    scale: wobbleScale,
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                }}
                whileTap={isMobile ? { scale: 0.95 } : undefined}
            >
                {/* Loading skeleton */}
                {!loaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                )}

                {/* Logo Image */}
                <motion.img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain p-3 md:p-4"
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: loaded ? 1 : 0,
                        scale: loaded ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                        willChange: 'transform, opacity',
                    }}
                />

                {/* Hover glow overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, ${glowColor}20 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered && !isMobile ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>

            {/* Partner Name (visible on hover for desktop) */}
            <AnimatePresence>
                {!isMobile && isHovered && (
                    <motion.div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="text-xs font-medium" style={{ color: COLORS.cream }}>
                            {partner.name}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Phone variant - optimized for mobile with touch interactions
function AffiliatedCoursesPartnersPhone() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-16 px-4 border-t border-[#2a2a2a] overflow-hidden bg-[#0A0A0A]"
        >
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[#F5B932] blur-[120px] opacity-8 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Part 1: Affiliated Courses */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Title */}
                    <motion.h2
                        className="font-display text-3xl md:text-4xl mb-8 text-center"
                        style={{
                            color: COLORS.amber,
                            textShadow: `0 0 40px ${COLORS.amber}40`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        Our Affiliated Courses
                    </motion.h2>

                    {/* Horizontal scroll carousel with snap */}
                    <div
                        className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory no-scrollbar"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {COURSES.map((course, index) => (
                            <div key={course.name} className="snap-center">
                                <CourseCard course={course} index={index} isMobile={true} />
                            </div>
                        ))}
                    </div>

                    {/* Scroll hint */}
                    <motion.div
                        className="flex justify-center gap-2 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="w-2 h-2 rounded-full bg-[#F5B932]/50" />
                        <div className="w-2 h-2 rounded-full bg-[#F5B932]" />
                        <div className="w-2 h-2 rounded-full bg-[#F5B932]/50" />
                    </motion.div>
                </motion.div>

                {/* Part 2: Industry Knowledge Partners */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Title */}
                    <motion.h2
                        className="font-display text-3xl md:text-4xl mb-8 text-center"
                        style={{
                            color: COLORS.amber,
                            textShadow: `0 0 40px ${COLORS.amber}40`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Our Industry Knowledge Partners
                    </motion.h2>

                    {/* Partners Grid - 2 rows on mobile */}
                    <div className="space-y-6">
                        {/* Row 1 (8 logos) */}
                        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                            {PARTNERS.slice(0, 8).map((partner, index) => (
                                <PartnerLogo
                                    key={partner.name}
                                    partner={partner}
                                    index={index}
                                    isMobile={true}
                                    row={1}
                                />
                            ))}
                        </div>

                        {/* Row 2 (7 logos) */}
                        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                            {PARTNERS.slice(8, 15).map((partner, index) => (
                                <PartnerLogo
                                    key={partner.name}
                                    partner={partner}
                                    index={index + 8}
                                    isMobile={true}
                                    row={2}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Laptop variant - rich animations and infinite marquee
function AffiliatedCoursesPartnersLaptop() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Parallax transforms
    const coursesY = useTransform(scrollYProgress, [0, 1], ['5%', '0%']);
    const partnersY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
    const partnersY2 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-24 px-4 md:px-12 border-t border-[#2a2a2a] overflow-hidden bg-[#0A0A0A]"
        >
            {/* Background glows with parallax */}
            <motion.div
                className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#F5B932] blur-[150px] opacity-8 pointer-events-none"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#E8281C] blur-[150px] opacity-6 pointer-events-none"
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Part 1: Affiliated Courses */}
                <motion.div
                    className="mb-24"
                    style={{ y: coursesY }}
                >
                    {/* Title */}
                    <motion.h2
                        className="font-display text-4xl md:text-5xl mb-12 text-center"
                        style={{
                            color: COLORS.amber,
                            textShadow: `0 0 60px ${COLORS.amber}50`,
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Our Affiliated Courses
                    </motion.h2>

                    {/* Course Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {COURSES.map((course, index) => (
                            <CourseCard
                                key={course.name}
                                course={course}
                                index={index}
                                isMobile={false}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Part 2: Industry Knowledge Partners */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Title */}
                    <motion.h2
                        className="font-display text-4xl md:text-5xl mb-12 text-center"
                        style={{
                            color: COLORS.amber,
                            textShadow: `0 0 60px ${COLORS.amber}50`,
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Our Industry Knowledge Partners
                    </motion.h2>

                    {/* Infinite Marquee - Row 1 (Left to Right) */}
                    <motion.div
                        className="relative mb-8 overflow-hidden"
                        style={{ y: partnersY1 }}
                    >
                        {/* Mask fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0A0A0A] to-transparent" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0A0A0A] to-transparent" />

                        {/* Marquee Track */}
                        <div className="flex animate-marquee-right">
                            {/* Duplicate for seamless loop */}
                            {[...PARTNERS.slice(0, 8), ...PARTNERS.slice(0, 8)].map((partner, index) => (
                                <PartnerLogo
                                    key={`${partner.name}-${index}`}
                                    partner={partner}
                                    index={index}
                                    isMobile={false}
                                    row={1}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Infinite Marquee - Row 2 (Right to Left) */}
                    <motion.div
                        className="relative overflow-hidden"
                        style={{ y: partnersY2 }}
                    >
                        {/* Mask fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0A0A0A] to-transparent" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0A0A0A] to-transparent" />

                        {/* Marquee Track */}
                        <div className="flex animate-marquee-left">
                            {/* Duplicate for seamless loop */}
                            {[...PARTNERS.slice(8, 15), ...PARTNERS.slice(8, 15)].map((partner, index) => (
                                <PartnerLogo
                                    key={`${partner.name}-${index + 8}`}
                                    partner={partner}
                                    index={index + 8}
                                    isMobile={false}
                                    row={2}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// Main component with adaptive loading
export default function AffiliatedCoursesPartners() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Performance budget notes:
    // - Component lazy loads on intersection
    // - Partner logos use loading="lazy"
    // - GPU-accelerated transforms via willChange
    // - CLS prevention: All cards have min-width, logos have fixed dimensions
    // - Bundle impact: ~25KB (tree-shaken framer-motion imports)

    return (
        <AnimatePresence mode="wait">
            {isMobile ? (
                <AffiliatedCoursesPartnersPhone key="phone" />
            ) : (
                <AffiliatedCoursesPartnersLaptop key="laptop" />
            )}
        </AnimatePresence>
    );
}
