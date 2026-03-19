import Link from 'next/link';

/**
 * Navigation Component
 * 
 * Minimal navigation with DNEG-style design:
 * - Clean, simple layout
 * - Coral accent on hover
 * - Touch-optimized targets (min 44px)
 * - Server Component by default (no client JS needed)
 * 
 * Performance notes:
 * - No JavaScript required for basic navigation
 * - Minimal CSS footprint
 * - Accessible with proper ARIA labels
 */

interface NavigationProps {
  /** Whether to show transparent background (for hero overlay) */
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        px-4 sm:px-8 py-4
        flex items-center justify-between
        ${transparent ? 'bg-gradient-to-b from-black/50 to-transparent' : 'bg-dneg-white/95 backdrop-blur-sm'}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        href="/"
        className={`
          font-display text-2xl sm:text-3xl font-bold
          ${transparent ? 'text-white hover:text-dneg-coral' : 'text-dneg-black hover:text-dneg-coral'}
          transition-colors duration-200
        `}
        aria-label="MAAC Home"
      >
        MAAC
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          href="#about"
          className={`
            font-body text-sm sm:text-base font-medium
            ${transparent ? 'text-white/90 hover:text-white' : 'text-dneg-black hover:text-dneg-coral'}
            transition-colors duration-200
            min-h-[44px] min-w-[44px]
            flex items-center
          `}
        >
          About
        </Link>
        <Link
          href="#contact"
          className={`
            font-body text-sm sm:text-base font-medium
            ${transparent ? 'text-white/90 hover:text-white' : 'text-dneg-black hover:text-dneg-coral'}
            transition-colors duration-200
            min-h-[44px] min-w-[44px]
            flex items-center
          `}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
