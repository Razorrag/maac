'use client';

import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import EnquiryForm from '@/components/EnquiryForm';

interface CourseTemplateProps {
    title: string;
    description: string;
    roles: string[];
    focusAreas: string[];
}

export default function CourseTemplate({ title, description, roles, focusAreas }: CourseTemplateProps) {
    return (
        <main className="min-h-screen text-foreground overflow-hidden relative">
            <AnimatedBackground />
            <Navigation transparent />

            {/* Course Hero */}
            <section className="pt-40 pb-20 px-4 md:px-12 relative border-b border-[#2a2a2a]">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="mb-4 text-xs font-bold tracking-widest uppercase text-contrast-light animate-pulse">
                        MAAC COURSES
                    </div>
                    <h1 className="font-display text-6xl md:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent to-contrast-light drop-shadow-[0_0_20px_rgba(232,40,28,0.3)]">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl text-cream-muted leading-relaxed">
                        {description}
                    </p>
                </div>
            </section>

            {/* Details Section */}
            <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex-1 glass p-8">
                    <h3 className="font-display text-2xl text-green mb-6">FOCUS AREAS</h3>
                    <ul className="space-y-4">
                        {focusAreas.map((area, i) => (
                            <li key={i} className="flex items-start gap-3 text-cream">
                                <span className="text-accent mt-1">▹</span> {area}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="flex-1 glass-contrast p-8">
                    <h3 className="font-display text-2xl text-contrast-light mb-6">CAREER ROLES</h3>
                    <div className="flex flex-wrap gap-3">
                        {roles.map((role, i) => (
                            <span key={i} className="px-4 py-2 border border-border bg-black/50 text-cream-muted text-sm uppercase tracking-wider rounded-full">
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <EnquiryForm />

            {/* Footer */}
            <footer className="py-12 px-4 md:px-12 border-t border-[#2a2a2a] bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-display text-2xl tracking-widest text-cream">
                        MAAC<span className="text-accent">X</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
