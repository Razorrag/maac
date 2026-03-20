'use client';

export default function LocatorCTA() {
    return (
        <section className="py-24 px-4 md:px-12 relative overflow-hidden border-t border-[#2a2a2a]">
            {/* Per-section: concentric arc rings and central bloom */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 70%, rgba(34, 197, 94, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 100% 0%, rgba(232, 40, 28, 0.08) 0%, transparent 40%)'
                }} />
                {/* Concentric rings */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'repeating-radial-gradient(circle at 50% 120%, transparent 60px, rgba(245,239,224,0.3) 61px, rgba(245,239,224,0.3) 62px, transparent 63px, transparent 120px)'
                }} />
            </div>
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="glass p-12 rounded-2xl border border-[#2a2a2a] shadow-2xl">
                    <h2 className="font-display text-4xl md:text-6xl mb-4" style={{ color: '#F5EFE0' }}>
                        FIND YOUR NEAREST <span style={{ color: '#22C55E' }}>CENTRE</span>
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#C9BFA8' }}>
                        With 130+ centres in 65+ cities across India, there&apos;s a MAAC near you. Start your journey today!
                    </p>
                    
                    <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8" onSubmit={(e) => e.preventDefault()}>
                        <select className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-[#22C55E] transition-colors" style={{ color: '#F5EFE0' }}>
                            <option value="">Select State</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="delhi">Delhi NCR</option>
                            <option value="karnataka">Karnataka</option>
                        </select>
                        <select className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-4 text-sm focus:outline-none focus:border-[#22C55E] transition-colors" style={{ color: '#F5EFE0' }}>
                            <option value="">Select City</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">New Delhi</option>
                            <option value="bangalore">Bangalore</option>
                        </select>
                        <button className="bg-[#22C55E] text-black font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-lg hover:bg-white transition-colors duration-300">
                            Search
                        </button>
                    </form>
                    
                    <a href="https://centrelocator.maacindia.com" target="_blank" rel="noopener noreferrer" className="text-sm border-b border-[#C9BFA8] pb-1 hover:text-[#F5EFE0] transition-colors duration-300" style={{ color: '#C9BFA8' }}>
                        Or browse the complete centre directory &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
}
