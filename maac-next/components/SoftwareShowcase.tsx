'use client';

import FractalGlassGlows from './FractalGlassGlows';
import ScrollReveal from './ScrollReveal';

const SOFTWARE = [
    { name: 'Autodesk Maya', category: '3D Animation' },
    { name: 'Unreal Engine', category: 'Game Design' },
    { name: 'SideFX Houdini', category: 'VFX Dynamics' },
    { name: 'Foundry Nuke', category: 'Compositing' },
    { name: 'Pixologic ZBrush', category: '3D Sculpting' },
    { name: 'Autodesk 3ds Max', category: 'Modeling' },
    { name: 'Unity', category: 'Game Engine' },
    { name: 'Adobe After Effects', category: 'Motion Graphics' },
];

export default function SoftwareShowcase() {
    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            <FractalGlassGlows />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal type="slide" direction="up" delay={0}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E8281C' }}>
                                INDUSTRY STANDARD TOOLS
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#F5EFE0' }}>
                                POWER YOUR <span style={{ color: '#22C55E' }}>IMAGINATION</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-sm md:text-base md:text-right" style={{ color: '#C9BFA8' }}>
                            Train on the exact same software and pipelines used by leading VFX, Animation, and Gaming studios globally.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {SOFTWARE.map((item, i) => (
                        <ScrollReveal key={item.name} type="3d" delay={i * 0.05}>
                            <div 
                                className="glass p-6 rounded-lg text-center h-full relative"
                                style={{ 
                                    transitionProperty: 'background, box-shadow, transform',
                                    transitionDuration: '500ms',
                                    transformStyle: 'preserve-3d',
                                }}
                                onMouseMove={(e) => {
                                    const card = e.currentTarget;
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;
                                    
                                    const rotateX = ((y - centerY) / centerY) * -15;
                                    const rotateY = ((x - centerX) / centerX) * 15;
                                    
                                    card.style.transitionDuration = '100ms';
                                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                                    card.style.background = 'rgba(255, 255, 255, 0.05)';
                                    card.style.boxShadow = '0 20px 40px -10px rgba(34, 197, 94, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    const card = e.currentTarget;
                                    card.style.transitionDuration = '500ms';
                                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                                    card.style.background = '';
                                    card.style.boxShadow = '';
                                }}
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-md flex items-center justify-center border border-[#2a2a2a] transition-colors duration-300 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
                                    <span className="text-xl font-display" style={{ color: '#F5EFE0' }}>{item.name.charAt(0)}</span>
                                </div>
                                <h3 className="font-display text-lg mb-1" style={{ color: '#F5EFE0' }}>{item.name}</h3>
                                <p className="text-xs uppercase tracking-widest" style={{ color: '#8A7F72' }}>{item.category}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
