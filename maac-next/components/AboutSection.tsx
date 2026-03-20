'use client';

import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
    return (
        <section
            id="about"
            className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]"
        >
            {/* Per-section: horizontal radial sweep — left green, right red */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 0% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(232, 40, 28, 0.12) 0%, transparent 50%)'
                }} />
                {/* Thin horizontal lines for depth */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(245,239,224,0.5) 0px, rgba(245,239,224,0.5) 1px, transparent 1px, transparent 80px)'
                }} />
            </div>
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16 relative z-10">

                <div className="flex-1 w-full">
                    <ScrollReveal type="slide" direction="left" delay={0}>
                        <div className="mb-2 text-xs font-bold tracking-widest uppercase text-contrast-light">
                            EST. 2001 · A MAJOR BRAND OF APTECH LTD.
                        </div>
                        <h2 className="font-display mb-8 leading-[0.9]" style={{ color: '#F5EFE0' }}>
                            INDIA&apos;S #1<br />
                            <span style={{ color: '#E8281C' }}>ANIMATION &amp; VFX</span><br />
                            TRAINING INSTITUTE
                        </h2>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-8 mt-10">
                            <div>
                                <div className="font-display text-5xl md:text-6xl" style={{ color: '#E8281C' }}>130+</div>
                                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#8A7F72' }}>Centres Globally</div>
                            </div>
                            <div className="border-l border-[#2a2a2a] pl-8">
                                <div className="font-display text-5xl md:text-6xl" style={{ color: '#22C55E' }}>Lakhs</div>
                                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#8A7F72' }}>Students Trained</div>
                            </div>
                            <div className="border-l border-[#2a2a2a] pl-8">
                                <div className="font-display text-5xl md:text-6xl" style={{ color: '#F5B932' }}>65+</div>
                                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#8A7F72' }}>Cities in India</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Right — Content Block */}
                <div className="flex-1 w-full lg:pt-8 space-y-6">
                    <ScrollReveal type="slide" direction="up" delay={0.2}>
                        <div className="glass p-6 border-l-4 border-l-[#E8281C] mb-6 backdrop-blur-md">
                            <h4 className="font-display text-xl mb-2" style={{ color: '#F5B932' }}>GEN-AI POWERED INSTITUTE</h4>
                            <p className="text-cream text-lg font-medium">Industry-Relevant Career Courses</p>
                            <p className="text-sm mt-2 text-muted">Select MAAC courses are Gen-AI powered, equipping you with the latest tools for 3D Animation, Gaming, Visual Effects, Multimedia, Filmmaking, and VR & AR.</p>
                        </div>
                        
                        <p className="text-lg font-medium leading-relaxed" style={{ color: '#F5EFE0' }}>
                            Maya Academy of Advanced Creativity (MAAC) is India&apos;s leading training institute for high-end 3D Animation and Visual Effects.
                        </p>
                        <p className="leading-relaxed" style={{ color: '#C9BFA8' }}>
                            Founded in 2001 and a major brand of Aptech Ltd., MAAC courses are thoughtfully designed to provide students thorough insights about the dynamics of the industry. It provides a real-life training environment backed by excellent faculty, world-class infrastructure, and the latest technical tools.
                        </p>

                        <div className="pt-4 flex flex-wrap gap-3">
                            {[
                                'Real-World Projects',
                                'Expert Faculty',
                                'Placement Assistance',
                                'Alumni Network',
                                '360° Virtual Tour',
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-4 py-2 rounded-full tracking-wider uppercase transition-colors hover:bg-contrast/20 hover:text-contrast-light hover:border-contrast/40"
                                    style={{
                                        border: '1px solid #2a2a2a',
                                        color: '#8A7F72',
                                        background: 'rgba(20,20,20,0.5)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>

            </div>
        </section>
    );
}
