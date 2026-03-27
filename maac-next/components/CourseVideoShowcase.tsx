'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ============================================================================
// Course Data - 6 MAAC Courses with Videos
// ============================================================================
const COURSES = [
  {
    id: '3d-animation',
    title: '3D Animation',
    subtitle: 'Master the art of storytelling',
    description: 'Master the art of storytelling through high-quality animation and industry-standard techniques',
    video: '/videos/courses/3d-animation.mp4',
    poster: '/images/courses/3d-animation-poster.jpg',
    color: '#E8281C', // Red
    icon: '🎬',
    link: '/courses/3d-animation',
  },
  {
    id: 'digital-content',
    title: 'Digital Content Creation',
    subtitle: 'Build a career in digital media',
    description: 'Build a career in digital media, social media content creation, short filmmaking, and video production',
    video: '/videos/courses/digital-content.mp4',
    poster: '/images/courses/digital-content-poster.jpg',
    color: '#22C55E', // Green
    icon: '📱',
    link: '/courses/digital-content',
  },
  {
    id: 'game-design',
    title: 'Game Design',
    subtitle: 'Gain expertise in game design',
    description: 'Gain expertise in game design, asset creation, and real-time rendering for mobile, online, and console gaming',
    video: '/videos/courses/game-design.mp4',
    poster: '/images/courses/game-design-poster.jpg',
    color: '#F5B932', // Amber
    icon: '🎮',
    link: '/courses/game-design',
  },
  {
    id: 'vfx',
    title: 'VFX Courses',
    subtitle: 'Develop high-end visual effects skills',
    description: 'Develop high-end visual effects skills for film, television, and OTT platforms using industry-standard tools',
    video: '/videos/courses/vfx.mp4',
    poster: '/images/courses/vfx-poster.jpg',
    color: '#E8281C', // Red
    icon: '✨',
    link: '/courses/vfx',
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics & Broadcast Design',
    subtitle: 'Explore motion graphics and advertising',
    description: 'Explore motion graphics, advertising, and digital media production for film and television',
    video: '/videos/courses/motion-graphics.mp4',
    poster: '/images/courses/motion-graphics-poster.jpg',
    color: '#22C55E', // Green
    icon: '📺',
    link: '/courses/motion-graphics',
  },
  {
    id: 'skill-enhancement',
    title: 'Skill Enhancement Courses',
    subtitle: 'Fast-track your career',
    description: 'Fast-track your career with specialized short-term courses in animation, VFX, game design, and more',
    video: '/videos/courses/skill-enhancement.mp4',
    poster: '/images/courses/skill-enhancement-poster.jpg',
    color: '#F5B932', // Amber
    icon: '🚀',
    link: '/courses/skill-enhancement',
  },
];

// ============================================================================
// Types
// ============================================================================
interface CourseVideoShowcaseProps {
  className?: string;
}

// ============================================================================
// Custom Hook: useVideoIntersection
// Plays/pauses videos when they enter/exit viewport
// ============================================================================
function useVideoIntersection(
  videoRef: React.RefObject<HTMLVideoElement>,
  isPlaying: boolean
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isPlaying) {
            video.play().catch(() => {
              // Autoplay prevented - video will play on user interaction
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [videoRef, isPlaying]);
}

// ============================================================================
// Sub-Component: VideoLayer (Desktop)
// Individual video layer with opacity control for crossfade
// ============================================================================
interface VideoLayerProps {
  course: (typeof COURSES)[0];
  opacity: any; // Framer Motion MotionValue
  isActive: boolean;
}

function VideoLayer({ course, opacity, isActive }: VideoLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useVideoIntersection(videoRef, isActive);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
    >
      <video
        ref={videoRef}
        src={course.video}
        poster={course.poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            transparent 40%,
            rgba(10, 10, 10, 0.6) 70%,
            rgba(10, 10, 10, 0.95) 100%
          )`,
        }}
      />
    </motion.div>
  );
}

// ============================================================================
// Sub-Component: ProgressIndicator (Desktop)
// Left-side vertical progress bar with 6 segments
// ============================================================================
interface ProgressIndicatorProps {
  activeIndex: number;
  courses: typeof COURSES;
}

function ProgressIndicator({ activeIndex, courses }: ProgressIndicatorProps) {
  return (
    <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3">
      {courses.map((course, i) => (
        <motion.div
          key={course.id}
          className="w-1 h-6 md:h-10 rounded-full bg-[#2a2a2a] overflow-hidden"
          initial={false}
        >
          <motion.div
            className="w-full h-full"
            style={{ backgroundColor: course.color }}
            animate={{
              height: activeIndex === i ? '100%' : '20%',
              opacity: activeIndex === i ? 1 : 0.4,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// Sub-Component: TextOverlay (Desktop & Mobile)
// Glassmorphism card in bottom-left corner
// ============================================================================
interface TextOverlayProps {
  course: (typeof COURSES)[0];
  isActive: boolean;
  variant?: 'desktop' | 'mobile';
}

function TextOverlay({ course, isActive, variant = 'desktop' }: TextOverlayProps) {
  const isMobile = variant === 'mobile';

  return (
    <motion.div
      className={`absolute z-20 ${isMobile ? 'bottom-20 left-4 right-4' : 'bottom-8 left-8 md:left-16 right-auto'}`}
      initial={{ opacity: 0, x: -60 }}
      animate={{
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : -60,
      }}
      transition={{
        delay: 0.2,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="glass max-w-md p-5 md:p-8 rounded-2xl"
        style={{
          background: 'rgba(20, 20, 20, 0.65)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${course.color}33`,
        }}
      >
        {/* Icon Badge */}
        <motion.span
          className="text-3xl md:text-4xl mb-3 block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {course.icon}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-display text-2xl md:text-4xl mb-2 uppercase"
          style={{ color: course.color }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {course.title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          className="text-sm md:text-base mb-3"
          style={{ color: '#C9BFA8' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {course.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base mb-6"
          style={{ color: '#F5EFE0' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {course.description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            href={course.link}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display text-sm tracking-widest uppercase transition-all duration-300 hover:gap-4"
            style={{
              background: course.color,
              color: '#F5EFE0',
            }}
          >
            EXPLORE COURSE
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// Sub-Component: DotNavigation (Mobile)
// Bottom dot indicators for mobile carousel
// ============================================================================
interface DotNavigationProps {
  activeIndex: number;
  courses: typeof COURSES;
  onDotClick: (index: number) => void;
}

function DotNavigation({ activeIndex, courses, onDotClick }: DotNavigationProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:hidden">
      {courses.map((course, i) => (
        <button
          key={course.id}
          onClick={() => onDotClick(i)}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: activeIndex === i ? course.color : '#2a2a2a',
            width: activeIndex === i ? '24px' : '8px',
          }}
          aria-label={`Go to ${course.title}`}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Desktop: Scrollytelling Sticky Section
// Scroll-driven video transitions with progress indicator
// ============================================================================
function DesktopShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollHeight = 600; // Height of scrollable area in px per course

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress to active index (0-5)
  const activeIndex = useTransform(smoothProgress, [0, 1], [0, COURSES.length - 1]);

  // Round to nearest integer for discrete active state
  const [activeIndexRounded, setActiveIndexRounded] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.onChange((latest) => {
      setActiveIndexRounded(Math.round(latest));
    });
    return () => unsubscribe();
  }, [activeIndex]);

  // Calculate opacity for each video based on scroll position
  const getVideoOpacity = (index: number) => {
    return useTransform(
      smoothProgress,
      [
        Math.max(0, (index - 1) / (COURSES.length - 1)),
        index / (COURSES.length - 1),
        Math.min(1, (index + 1) / (COURSES.length - 1)),
      ],
      [0, 1, 0]
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Invisible scroll height container - creates scrollable space */}
      <div style={{ height: `${scrollHeight * COURSES.length}px` }} />

      {/* Sticky viewport container - only sticky within its parent bounds */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ top: 'var(--header-offset, 0px)' }}>
        {/* Video Layers */}
        {COURSES.map((course, index) => (
          <VideoLayer
            key={course.id}
            course={course}
            opacity={getVideoOpacity(index)}
            isActive={activeIndexRounded === index}
          />
        ))}

        {/* Progress Indicator */}
        <ProgressIndicator activeIndex={activeIndexRounded} courses={COURSES} />

        {/* Active Text Overlay */}
        <AnimatePresence>
          <TextOverlay
            course={COURSES[activeIndexRounded]}
            isActive={true}
            variant="desktop"
          />
        </AnimatePresence>

        {/* Scroll Hint (first section only) */}
        <motion.div
          className="absolute bottom-8 right-8 z-20 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: activeIndexRounded === 0 ? 1 : 0, y: activeIndexRounded === 0 ? 0 : 10 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-[#C9BFA8]">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// Mobile: Horizontal Swipe Carousel
// Native horizontal scroll with snap points
// ============================================================================
function MobileShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory h-full w-full no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {COURSES.map((course, index) => (
          <div
            key={course.id}
            className="snap-center w-full h-full flex-shrink-0 relative"
          >
            {/* Video */}
            <video
              src={course.video}
              poster={course.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to bottom,
                  transparent 0%,
                  transparent 40%,
                  rgba(10, 10, 10, 0.6) 70%,
                  rgba(10, 10, 10, 0.95) 100%
                )`,
              }}
            />

            {/* Text Overlay */}
            <TextOverlay
              course={course}
              isActive={activeIndex === index}
              variant="mobile"
            />
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <DotNavigation
        activeIndex={activeIndex}
        courses={COURSES}
        onDotClick={handleDotClick}
      />
    </div>
  );
}

// ============================================================================
// Main Component: CourseVideoShowcase
// Responsive: Desktop (Scrollytelling) + Mobile (Swipe Carousel)
// ============================================================================
export default function CourseVideoShowcase({ className = '' }: CourseVideoShowcaseProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      className={`relative ${className}`}
      id="course-showcase"
      aria-label="MAAC Course Video Showcase"
    >
      {/* Desktop: Scrollytelling Sticky Section (≥1024px) */}
      {!isMobile && <DesktopShowcase />}

      {/* Mobile: Horizontal Swipe Carousel (<1024px) */}
      {isMobile && <MobileShowcase />}

      {/* Placeholder for SEO and initial load */}
      <div className="sr-only">
        <h2>MAAC Courses - Video Showcase</h2>
        <ul>
          {COURSES.map((course) => (
            <li key={course.id}>
              <Link href={course.link}>{course.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
