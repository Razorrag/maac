'use client';

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Glowing Contrasting Orbs */}
            <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-contrast-blue/20 blur-[160px] mix-blend-screen opacity-40 animate-pulse-slow" />
            <div className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-contrast/20 blur-[180px] mix-blend-screen opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }} />
            
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
