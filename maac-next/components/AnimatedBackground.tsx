'use client';

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Animated perspective grid that slowly moves down to give depth */}
            <div
                className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,#000_10%,transparent_100%)] animate-pan-grid"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '4rem 4rem'
                }}
            />
        </div>
    );
}
