import Navigation from '@/components/Navigation';
import HeroVideo from '@/components/HeroVideoDynamic';

/**
 * MAAC Home Page
 *
 * Design:
 * - Off-white background (#F5F5F3)
 * - Anton font for headings
 * - Coral accents (#FF6B4A)
 * - Minimal content with video hero
 */

// Local video sources
const VIDEO_SOURCES = {
  mp4: '/videos/intro.mp4',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-dneg-white">
      {/* Navigation - transparent over hero */}
      <Navigation transparent />

      {/* Hero Section with Video Background - Side Layout */}
      <HeroVideo sources={VIDEO_SOURCES}>
        {/* Content - Left & Right, Middle Free for Tiger */}
        <div className="absolute inset-0 z-10 flex items-end justify-between px-8 sm:px-16 pb-12 sm:pb-20">
          
          {/* Left Side - Main Heading */}
          <div className="text-left max-w-2xl">
            <h1 className="text-white text-5xl sm:text-7xl md:text-8xl font-display font-bold drop-shadow-2xl leading-tight">
              MOVING ARTS
              <br />
              ACADEMY
            </h1>
          </div>

          {/* Right Side - Subtitle & Button */}
          <div className="flex flex-col items-end gap-6 sm:gap-8 max-w-md">
            <p className="text-white/90 text-xl sm:text-2xl md:text-3xl font-medium drop-shadow-lg text-right">
              Excellence in
              <br />
              Performing Arts Education
            </p>
            
            {/* Premium Glassmorphism CTA Button */}
            <a
              href="#contact"
              className="
                group relative
                inline-block
                backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5
                border border-white/50
                text-white font-display text-lg sm:text-xl font-semibold
                px-12 py-5 sm:px-14 sm:py-6
                rounded-xl
                shadow-lg shadow-black/20
                transition-all duration-500 ease-out
                hover:shadow-2xl hover:shadow-black/40 hover:scale-105 hover:border-white/70
                active:scale-95
                overflow-hidden
                before:absolute before:inset-0
                before:bg-gradient-to-br before:from-white/10 before:to-transparent
                before:opacity-0 before:transition-opacity before:duration-500
                hover:before:opacity-100
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </HeroVideo>

      {/* Minimal Content Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-5xl text-dneg-black mb-6 sm:mb-8">
            ABOUT MAAC
          </h2>
          <p className="font-body text-dneg-gray text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Moving Arts Academy California is dedicated to nurturing the next generation
            of performers through comprehensive training in dance, theatre, and musical arts.
          </p>

          {/* Coral accent line */}
          <div className="w-16 sm:w-24 h-1 bg-dneg-coral mx-auto mt-8 sm:mt-12" />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 sm:py-24 px-4 sm:px-8 bg-dneg-off-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-5xl text-dneg-black mb-6 sm:mb-8">
            CONTACT US
          </h2>
          <p className="font-body text-dneg-gray text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12">
            Ready to start your performing arts journey? Reach out to us today.
          </p>

          {/* Contact Button */}
          <a
            href="mailto:info@maac.edu"
            className="
              inline-block
              border-2 border-dneg-coral text-dneg-coral
              hover:bg-dneg-coral hover:text-white
              font-display text-lg sm:text-xl
              px-8 py-4 sm:px-10 sm:py-5
              rounded-sm
              transition-all duration-200
              active:scale-95
              min-h-[44px] min-w-[44px]
            "
          >
            Email Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-8 border-t border-dneg-light-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-dneg-light-gray text-sm">
            © {new Date().getFullYear()} Moving Arts Academy California. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
