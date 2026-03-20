'use client';

import { useState } from 'react';
import FractalGlassGlows from './FractalGlassGlows';

const FAQS = [
    {
        q: 'What courses does MAAC offer?',
        a: 'We offer courses in 3D animation, game designing, media and entertainment, multimedia, VFX, graphic design, web design, and more — both short-term (1-8 months) and long-term (16-36 months).'
    },
    {
        q: 'What is the eligibility for MAAC courses?',
        a: 'The eligibility for most career courses is 10+2 (any stream). No prior technical knowledge is required. There is no upper age limit to join.'
    },
    {
        q: 'Do MAAC courses have placement support?',
        a: 'Yes, MAAC provides placement assistance on successful course completion — including portfolio support, mock interviews, and industry connections. (Placement depends on student performance and industry requirements).'
    },
    {
        q: 'What software will I learn?',
        a: 'You will learn industry-standard software including Autodesk Maya, 3ds Max, ZBrush, Nuke, Houdini, After Effects, Silhouette, Mocha, Unreal Engine, Unity, and more depending on your course.'
    },
    {
        q: 'Is there a demo class available?',
        a: 'Yes, a free demo class along with a direct counselling session is available at our centres.'
    }
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            <FractalGlassGlows />
            
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#F5EFE0' }}>
                        FREQUENTLY ASKED <span style={{ color: '#E8281C' }}>QUESTIONS</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div 
                            key={index} 
                            className="glass rounded-lg overflow-hidden transition-all duration-300"
                            style={{ border: `1px solid ${openIndex === index ? '#E8281C55' : '#2a2a2a'}` }}
                        >
                            <button
                                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-display text-xl" style={{ color: openIndex === index ? '#F5EFE0' : '#C9BFA8' }}>
                                    {faq.q}
                                </span>
                                <span className="text-2xl transition-transform duration-300" style={{ color: '#E8281C', transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0)' }}>
                                    +
                                </span>
                            </button>
                            <div 
                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                style={{ maxHeight: openIndex === index ? '200px' : '0' }}
                            >
                                <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#8A7F72' }}>
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
