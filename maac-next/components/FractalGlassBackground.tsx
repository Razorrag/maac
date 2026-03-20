'use client';

export default function FractalGlassBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Dark base */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {/* Animated vertical gradient bands based on the reference image */}
            {/* We duplicate the bands to allow for a seamless marquee/pan effect. The container is 200% width. */}
            <div className="absolute inset-0 opacity-80 mix-blend-screen overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-[200%] flex animate-pan-slow">
                    {/* First set of bands */}
                    <div className="w-1/2 h-full flex transform -skew-x-12 scale-125 origin-center blur-3xl">
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-green/60 to-transparent" />
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent translate-y-24" />
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent -translate-y-12" />
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                    </div>
                    {/* Second identical set for seamless looping */}
                    <div className="w-1/2 h-full flex transform -skew-x-12 scale-125 origin-center blur-3xl">
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-green/60 to-transparent" />
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent translate-y-24" />
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent -translate-y-12" />
                        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Glass texture overlay (fractal noise) */}
            <div 
                className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            
            {/* Ribbed vertical lines for the glass refraction effect */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.4)_1px,transparent_1px)] bg-[size:4px_100%] opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4px_100%] opacity-50" style={{ backgroundPosition: '2px 0' }} />
            
            {/* Vignette fades to frame it */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60" />
        </div>
    );
}
