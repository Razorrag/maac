import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ValueProps from '@/components/ValueProps';
import CourseShowcase from '@/components/CourseShowcase';
import CreativeShowcase from '@/components/CreativeShowcase';
import PlacementMarquee from '@/components/PlacementMarquee';
import AnimatedBackground from '@/components/AnimatedBackground';
import MediaGallery from '@/components/MediaGallery';

export default function Home() {
  return (
    <main className="min-h-screen text-foreground overflow-hidden relative">
      <AnimatedBackground />
      <Navigation transparent />

      {/* High Performance Parallax Hero */}
      <HeroSection />

      {/* Corporate Overview */}
      <AboutSection />

      {/* DNEG-style Grid Value Propositions */}
      <ValueProps />

      {/* Scroll-triggered Interactive Course Display */}
      <div id="courses">
        <CourseShowcase />
      </div>

      {/* New Creative Showcase for Student Work */}
      <div id="student-world">
        <CreativeShowcase />
      </div>

      {/* NEW: Media Gallery for user videos/images */}
      <div id="gallery">
        <MediaGallery />
      </div>

      {/* Zero JS CSS Infinite Logo Marquee */}
      <PlacementMarquee />

      {/* Footer Area */}
      <footer className="py-12 px-4 md:px-12 border-t" style={{ borderColor: '#2a2a2a', background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-2xl tracking-widest" style={{ color: '#F5EFE0' }}>
            MAAC<span style={{ color: '#E8281C' }}>X</span>
          </div>
          <div className="text-sm font-body text-center md:text-right" style={{ color: '#8A7F72' }}>
            © {new Date().getFullYear()} Maya Academy of Advanced Creativity.
            <br className="md:hidden" /> India&apos;s Premier Creative Institute.
          </div>
        </div>
      </footer>
    </main>
  );
}
