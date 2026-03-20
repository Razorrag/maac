'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailingRef = useRef<HTMLDivElement>(null);
    
    // Store exact mouse position
    const [{ mouseX, mouseY }, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });
    
    // Smooth trailing position
    const trailingX = useRef(0);
    const trailingY = useRef(0);

    const isHovering = useRef(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ mouseX: e.clientX, mouseY: e.clientY });
            
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }

            // Check if hovering over clickable elements
            const target = e.target as HTMLElement;
            isHovering.current = window.getComputedStyle(target).cursor === 'pointer' || 
                                 target.tagName.toLowerCase() === 'a' || 
                                 target.tagName.toLowerCase() === 'button';
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop for smooth trailing effect
        let animationFrameId: number;
        
        const render = () => {
            // Lerp formula: current = current + (target - current) * factor
            trailingX.current += (mouseX - trailingX.current) * 0.15;
            trailingY.current += (mouseY - trailingY.current) * 0.15;
            
            if (trailingRef.current) {
                const scale = isHovering.current ? 'scale(1.5)' : 'scale(1)';
                const opacity = isHovering.current ? '0.2' : '0.5';
                
                trailingRef.current.style.transform = `translate3d(${trailingX.current}px, ${trailingY.current}px, 0) ${scale}`;
                trailingRef.current.style.opacity = opacity;
                
                // Add a glow when hovering
                if (isHovering.current) {
                    trailingRef.current.style.backgroundColor = '#E8281C';
                    trailingRef.current.style.boxShadow = '0 0 20px 5px rgba(232, 40, 28, 0.5)';
                } else {
                    trailingRef.current.style.backgroundColor = '#22C55E';
                    trailingRef.current.style.boxShadow = 'none';
                }
            }
            
            animationFrameId = requestAnimationFrame(render);
        };
        
        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="hidden md:block pointer-events-none z-[9999] fixed inset-0">
            {/* Main dot */}
            <div 
                ref={cursorRef} 
                className="w-2 h-2 rounded-full bg-white absolute -ml-1 -mt-1 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] mix-blend-difference"
                style={{ willChange: 'transform' }}
            />
            
            {/* Trailing smooth aura */}
            <div 
                ref={trailingRef} 
                className="w-10 h-10 rounded-full border border-white/20 absolute -ml-5 -mt-5 transition-colors duration-300"
                style={{ willChange: 'transform, opacity, background-color' }}
            />
        </div>
    );
}
