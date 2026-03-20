'use client';

/**
 * Gradient Fractal Glass Background (Ribbed Glass Edition)
 * An exacting replica of the vibrant, striated ribbed glass effect with intense green/orange/red light shafts.
 */
export default function FractalGlassGlows() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#050505]">
            
            {/* 1. Underlying Light Shafts (The Aurora / Colored Bars) */}
            <div className="absolute inset-0 opacity-80 mix-blend-screen mix-blend-plus-lighter filter blur-[20px] md:blur-[40px]">
                
                {/* Intense Green Shafts */}
                <div 
                    className="absolute top-[-10%] origin-top-left w-[120%] h-[20%] bg-[#4ade80]"
                    style={{ 
                        transform: 'rotate(75deg) translateY(-20vh) translateX(0vw)',
                        animation: 'shaftSway 15s ease-in-out infinite alternate' 
                    }}
                />
                <div 
                    className="absolute top-0 right-[20%] origin-top-right w-[100%] h-[15%] bg-[#22c55e]"
                    style={{ 
                        transform: 'rotate(-105deg) translateY(10vh)',
                        animation: 'shaftSway2 12s ease-in-out infinite alternate-reverse' 
                    }}
                />
                
                {/* Burning Orange/Red Shafts */}
                <div 
                    className="absolute top-[20%] left-[30%] origin-center w-[150%] h-[30%] bg-[#ea580c]"
                    style={{ 
                        transform: 'rotate(80deg) translateX(-10vw)',
                        animation: 'shaftSway 20s ease-in-out infinite alternate-reverse' 
                    }}
                />
                <div 
                    className="absolute bottom-[-20%] left-[40%] origin-bottom w-[100%] h-[25%] bg-[#ef4444]"
                    style={{ 
                        transform: 'rotate(70deg)',
                        animation: 'shaftSway2 17s ease-in-out infinite alternate' 
                    }}
                />

                {/* Bright Yellow Hit (Core) */}
                <div 
                    className="absolute top-[30%] left-[20%] w-[120%] h-[15%] bg-[#facc15] mix-blend-color-dodge"
                    style={{ 
                        transform: 'rotate(85deg)',
                        animation: 'shaftSway 10s ease-in-out infinite alternate' 
                    }}
                />
            </div>

            {/* 2. Extreme Ribbed Glass Overlay (The dense vertical black lines) */}
            {/* The sharp contrast creates the fractal 'streaks' over the blurred light */}
            <div 
                className="absolute inset-0 z-10 opacity-70 mix-blend-overlay"
                style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, transparent 1px, transparent 4px, rgba(0,0,0,0.95) 4px, rgba(0,0,0,0.95) 6px)'
                }}
            />
            {/* A second glass layer for intersecting frequency (moiré effect) */}
            <div 
                className="absolute inset-0 z-10 opacity-40 mix-blend-multiply"
                style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)'
                }}
            />

            {/* 3. Base Noise overlay to remove banding and add premium film grain */}
            <div className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/noise.png")', backgroundRepeat: 'repeat' }} />
            
            {/* 4. Edge Darkening (Vignette) so text remains readable */}
            <div className="absolute inset-0 z-30 pointer-events-none" style={{
                background: 'linear-gradient(to right, rgba(10,10,10,0.8) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.8) 100%), linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.9) 100%)'
            }} />
        </div>
    );
}

// Ensure these keyframes are added to your CSS if possible, but React will inject them via Tailwind or globals.
/*
@keyframes shaftSway {
  0% { transform: translateY(-5%) scale(1); }
  100% { transform: translateY(5%) scale(1.1); }
}
@keyframes shaftSway2 {
  0% { transform: translateY(5%) scale(1.05); }
  100% { transform: translateY(-5%) scale(0.95); }
}
*/
