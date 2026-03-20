'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type RevealProps = {
    children: ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    type?: 'fade' | 'slide' | 'scale' | '3d';
    className?: string;
};

export default function ScrollReveal({ 
    children, 
    width = '100%', 
    delay = 0, 
    direction = 'up',
    type = 'slide',
    className = ''
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

    const getVariants = () => {
        const xOffset = direction === 'left' ? 50 : direction === 'right' ? -50 : 0;
        const yOffset = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;

        switch (type) {
            case 'scale':
                return {
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 }
                };
            case '3d':
                return {
                    hidden: { opacity: 0, y: 50, rotateX: 20 },
                    visible: { opacity: 1, y: 0, rotateX: 0 }
                };
            case 'fade':
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                };
            case 'slide':
            default:
                return {
                    hidden: { opacity: 0, x: xOffset, y: yOffset },
                    visible: { opacity: 1, x: 0, y: 0 }
                };
        }
    };

    return (
        <div ref={ref} style={{ width, position: 'relative' }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1], // Custom cinematic bezier curve
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
