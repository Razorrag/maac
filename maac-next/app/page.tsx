import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WhyMAAC from '@/components/WhyMAAC';
import CreativeCareers from '@/components/CreativeCareers';
import AboutSection from '@/components/AboutSection';
import ValueProps from '@/components/ValueProps';
import CourseShowcase from '@/components/CourseShowcase';
import CareerXCreatorX from '@/components/CareerXCreatorX';
import AffiliatedCoursesPartners from '@/components/AffiliatedCoursesPartners';
import CourseVideoShowcase from '@/components/CourseVideoShowcase';
import SoftwareShowcase from '@/components/SoftwareShowcase';
import EventsSection from '@/components/EventsSection';
import CreativeShowcase from '@/components/CreativeShowcase';
import MediaGallery from '@/components/MediaGallery';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import FaqSection from '@/components/FaqSection';
import EnquiryForm from '@/components/EnquiryForm';
import LocatorCTA from '@/components/LocatorCTA';
import PlacementMarquee from '@/components/PlacementMarquee';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen text-foreground relative">
      <AnimatedBackground />
      <Navigation transparent />

      {/* High Performance Parallax Hero */}
      <HeroSection />

      {/* NEW: Why MAAC - Creative Careers Section (placed right after hero) */}
      <WhyMAAC />

      {/* Creative Careers - Moved below WhyMAAC */}
      <CreativeCareers />

      {/* NEW: Silver Jubilee Academic Pathways - MOVED HERE (after CreativeCareers) */}
      <div id="careerx-creatorx">
        <CareerXCreatorX />
      </div>

      {/* NEW: Affiliated Courses & Industry Knowledge Partners */}
      <AffiliatedCoursesPartners />

      {/* NEW: Full-Screen Video Showcase - Immersive Course Experience */}
      <div id="course-showcase" className="relative border-t border-b border-[#2a2a2a]">
        <CourseVideoShowcase />
      </div>

      {/* Corporate Overview */}
      <AboutSection />

      {/* DNEG-style Grid Value Propositions */}
      <ValueProps />

      {/* Scroll-triggered Interactive Course Display */}
      <div id="courses">
        <CourseShowcase />
      </div>

      {/* NEW: Software Tools Taught at MAAC */}
      <div id="software">
        <SoftwareShowcase />
      </div>

      {/* NEW: Events at MAAC Bento Grid */}
      <div id="events">
        <EventsSection />
      </div>

      {/* New Creative Showcase for Student Work */}
      <div id="student-world">
        <CreativeShowcase />
      </div>

      {/* Media Gallery for user videos/images */}
      <div id="gallery">
        <MediaGallery />
      </div>

      {/* NEW: Student Success Testimonials */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* NEW: Latest Blog Posts and News */}
      <div id="blogs">
        <BlogSection />
      </div>

      {/* NEW: Frequently Asked Questions */}
      <div id="faqs">
        <FaqSection />
      </div>

      {/* Modern Glassmorphic Enquiry Form */}
      <div id="enquiry">
        <EnquiryForm />
      </div>

      {/* NEW: Find Your Nearest Centre CTA */}
      <div id="locate">
        <LocatorCTA />
      </div>

      {/* Zero JS CSS Infinite Logo Marquee */}
      <PlacementMarquee />

      {/* Comprehensive Footer Area */}
      <Footer />
    </main>
  );
}
