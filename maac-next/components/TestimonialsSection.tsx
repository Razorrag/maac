'use client';

import FractalGlassGlows from './FractalGlassGlows';
import ScrollReveal from './ScrollReveal';

const TESTIMONIALS = [
    {
        name: 'Chander',
        company: 'MAAC Pitampura (MCL Winner)',
        text: '"It is an honour to have been featured this year at MCL amongst the sea of exceptionally talented professionals. I urge all aspiring students to not be afraid to fail and keep trying new things."'
    },
    {
        name: 'VFX Alumni',
        company: 'Technicolour Bangalore',
        text: '"I am currently working as 3D Digital Matte Painting Artist. When I joined MAAC for an Advanced VFX course, I got to learn lots of things which are required to work in the VFX industry."'
    },
    {
        name: '3D Artist',
        company: 'IPE Global Ltd.',
        text: '"MAAC has really helped me a lot to reach this position. The faculty at MAAC has also helped me a lot during the course to work on projects and build a strong portfolio."'
    },
    {
        name: 'Creative Professional',
        company: 'Alumni',
        text: '"Joining MAAC was a life changing decision. MAAC launched me into this wonderful career that I cherish everyday. The training was the perfect balance between aesthetics & technical knowledge."'
    },
    {
        name: 'Animation Graduate',
        company: 'Alumni',
        text: '"I am proud of my decision of choosing MAAC to pursue my animation studies. Very knowledgeable faculty always assist you... and you get lots of opportunities to showcase your skills."'
    },
    {
        name: 'VFX Aspirant',
        company: 'Alumni',
        text: '"MAAC really gives us wings... let\'s fly! I am learning from the best to deliver the best. I am sure to achieve my goal of becoming the best VFX artist from this institution."'
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            <FractalGlassGlows />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal type="slide" direction="down" delay={0}>
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#F5EFE0' }}>
                            STUDENT <span style={{ color: '#22C55E' }}>SUCCESS</span>
                        </h2>
                        <p className="mt-4 text-lg" style={{ color: '#C9BFA8' }}>
                            Hear from our alumni who are now shaping the global AVGC industry.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <ScrollReveal key={i} type="scale" delay={i * 0.15}>
                            <div 
                                className="glass p-8 rounded-xl relative transition-all duration-700 hover:border-[#22C55E55] hover:-translate-y-2 cursor-pointer h-full flex flex-col justify-between"
                            >
                                <div>
                                    {/* Quote icon */}
                                    <div className="text-6xl absolute top-4 right-6 font-display opacity-20" style={{ color: '#22C55E' }}>"</div>
                                    
                                    <p className="text-sm leading-relaxed mb-8 relative z-10 italic" style={{ color: '#C9BFA8' }}>
                                        {t.text}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center font-display text-xl border border-[#2a2a2a]" style={{ color: '#F5EFE0' }}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-display text-sm tracking-wider uppercase" style={{ color: '#F5EFE0' }}>{t.name}</h4>
                                        <p className="text-xs" style={{ color: '#22C55E' }}>{t.company}</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
