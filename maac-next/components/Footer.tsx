'use client';

import Link from 'next/link';

const PARTNERS = [
    'NDTV', 'IBN7', 'NY VFXWAALA', 'COSMOS MAYA', 'UBISOFT', 'PIXAR', 'NETFLIX',
    'DNEG', 'PRIME FOCUS', 'REDCHILLIES VFX', 'MPC', 'FRAMESTORE'
];

export default function Footer() {
    return (
        <footer className="border-t" style={{ borderColor: '#2a2a2a', background: '#0a0a0a' }}>
            {/* Infinite Scrolling Partner Marquee */}
            <div className="w-full relative overflow-hidden bg-[#110505] border-b border-[#2a2a2a] py-6 flex">
                {/* We render two sets to animate infinitely */}
                <div className="flex whitespace-nowrap animate-marquee">
                    {PARTNERS.map((partner, i) => (
                        <div key={`p1-${i}`} className="flex items-center">
                            <span className="font-display font-bold text-xl md:text-2xl tracking-widest text-[#2a2a2a] hover:text-[#E8281C] transition-colors duration-300 px-8">
                                {partner}
                            </span>
                            <span className="text-[#E8281C] text-sm opacity-50 px-4">×</span>
                        </div>
                    ))}
                </div>
                <div className="flex whitespace-nowrap animate-marquee" aria-hidden="true">
                    {PARTNERS.map((partner, i) => (
                        <div key={`p2-${i}`} className="flex items-center">
                            <span className="font-display font-bold text-xl md:text-2xl tracking-widest text-[#2a2a2a] hover:text-[#E8281C] transition-colors duration-300 px-8">
                                {partner}
                            </span>
                            <span className="text-[#E8281C] text-sm opacity-50 px-4">×</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Column 1: About MAAC */}
                    <div>
                        <div className="font-display text-3xl tracking-widest mb-6" style={{ color: '#F5EFE0' }}>
                            MAAC<span style={{ color: '#E8281C' }}>X</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6" style={{ color: '#8A7F72' }}>
                            India&apos;s leading training institute for high-end 3D Animation and Visual Effects. Founded in 2001 &amp; a major brand of Aptech Ltd.
                        </p>
                        <div className="flex gap-4">
                            {['Facebook', 'Instagram', 'YouTube', 'Twitter/X', 'LinkedIn'].map(social => (
                                <a key={social} href="#" className="text-xs uppercase tracking-wider hover:text-accent transition-colors duration-300" style={{ color: '#C9BFA8' }}>
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-display text-lg mb-6 text-contrast-light">QUICK LINKS</h4>
                        <ul className="space-y-3">
                            {['Home', 'About MAAC', 'Courses', 'Events at MAAC', 'Students World', 'Placements', 'Blog', 'Contact Us'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="text-sm hover:text-green transition-colors duration-300" style={{ color: '#8A7F72' }}>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Course Links */}
                    <div>
                        <h4 className="font-display text-lg mb-6 text-contrast-light">COURSES</h4>
                        <ul className="space-y-3">
                            {['3D Animation', 'Visual Effects (VFX)', 'Game Design', 'Multimedia & Design', 'Broadcast', 'Filmmaking', 'AR/VR', 'Short Term Courses'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="text-sm hover:text-green transition-colors duration-300" style={{ color: '#8A7F72' }}>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h4 className="font-display text-lg mb-6 text-contrast-light">CONTACT INFO</h4>
                        <address className="text-sm not-italic space-y-4" style={{ color: '#8A7F72' }}>
                            <p className="leading-relaxed">
                                APTECH HOUSE, A-65, M.I.D.C, Marol Andheri (East), Mumbai, Maharashtra – 400093
                            </p>
                            <p>
                                <strong className="font-medium" style={{ color: '#F5EFE0' }}>Phone:</strong> 73 73 818 818
                            </p>
                            <p>
                                <strong className="font-medium" style={{ color: '#F5EFE0' }}>Website:</strong> <a href="https://www.maacindia.com" className="hover:text-accent transition-colors duration-300">www.maacindia.com</a>
                            </p>
                            <div className="mt-6">
                                <Link href="#" className="inline-block px-6 py-3 border border-accent text-accent text-xs font-bold tracking-widest uppercase hover:bg-accent hover:text-[#F5EFE0] transition-all duration-300">
                                    Find a Centre
                                </Link>
                            </div>
                        </address>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t" style={{ borderColor: '#2a2a2a', color: '#8A7F72' }}>
                    <div className="text-sm text-center md:text-left">
                        Copyright © {new Date().getFullYear()} Aptech Ltd. All rights reserved.
                    </div>
                    <div className="flex gap-4 text-xs">
                        <Link href="#" className="hover:text-[#F5EFE0] transition-colors duration-300">Privacy Policy</Link>
                        <Link href="#" className="hover:text-[#F5EFE0] transition-colors duration-300">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
